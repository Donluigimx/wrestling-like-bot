import { Logger } from 'pino';
import Crypto from 'crypto';

import Database from '../lib/db';
import { DMChannel, NewsChannel, TextChannel } from 'discord.js';

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

  const response: string = await new Promise<string>((resolve, reject) => {
    Database.set(hash, JSON.stringify(payload), (err, reply) => {
      if (err) {reject(err);}
      resolve(reply);
    });
  });

  logger.info({ response });

  await channel.send('Song assigned ;)');
  return;
}

export { AssignPayload };
export default assign;
