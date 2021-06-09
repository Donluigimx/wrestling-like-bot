import { Logger } from 'pino';
import Crypto from 'crypto';
import Duration from 'parse-duration';

import Database from '../lib/db';
import { DMChannel, NewsChannel, TextChannel, MessageEmbed } from 'discord.js';

interface AssignPayload {
  url: string,
  starts?: string,
  audio_length?: string,
  user_id: string,
  server_id: string,
}

async function assign(payload: AssignPayload, channel: TextChannel | DMChannel | NewsChannel, logger: Logger): Promise<void> {
  payload.audio_length = payload.audio_length || '5s';

  const hash: string = Crypto.createHash('md5').update(`${payload.user_id}${payload.server_id}`).digest('hex');

  if (Duration(payload.audio_length) > 10000) {
    const embedError: MessageEmbed = new MessageEmbed()
    .setColor('#B22222')
    .setTitle('Error')
    .setDescription('Audio Length can not be higher of 10 seconds');

    await channel.send(embedError);

    return;
  }

  const response: string = await new Promise<string>((resolve, reject) => {
    Database.set(hash, JSON.stringify(payload), (err, reply) => {
      if (err) {reject(err);}
      resolve(reply);
    });
  });

  logger.info({ response });

  const embedResponse: MessageEmbed = new MessageEmbed()
  .setColor('#00FFFF')
  .setDescription('Song assigned');

  await channel.send(embedResponse);
  return;
}

export { AssignPayload };
export default assign;
