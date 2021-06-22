import Crypto from 'crypto';
import Ytdl from 'ytdl-core';
import { VoiceChannel, VoiceConnection } from 'discord.js';
import Duration from 'parse-duration';
import { Logger } from 'pino';

import Database from '../lib/db';
import { AssignPayload } from '../commands/assign';

async function userConnected(userId: string, serverId: string, channel: VoiceChannel, logger: Logger): Promise<void> {
  const hash: string = Crypto.createHash('md5').update(`${userId}${serverId}`).digest('hex');
  let response: AssignPayload;

  try {
    response  = await new Promise<AssignPayload>((resolve, reject) => {
      Database.get(hash, (err, reply) => {
        if (err) {reject(err);}
        logger.info({ reply, error }, 'Response from redis');
        resolve(JSON.parse(reply));
      });
    });
  } catch {
    return;
  }

  logger.info({ response }, 'Parsed response from redis');

  const info = await Ytdl.getInfo(response.url);
  const audioFormats = Ytdl.filterFormats(info.formats, 'audioonly');
  const audioStream = Ytdl(response.url, { format: audioFormats[0] });

  const connection: VoiceConnection = await channel.join();

  connection.play(
    audioStream,
    { seek: Duration(response.starts) / 1000 }
  );

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      connection.disconnect();
      resolve();
    }, Duration(response.audio_length));
  });

}

export default userConnected;
