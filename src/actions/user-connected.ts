import Crypto from 'crypto';
import Ytdl from 'ytdl-core';
import { VoiceChannel, VoiceConnection } from 'discord.js';
import Duration from 'parse-duration';

import Database from '../lib/db';
import { AssignPayload } from '../commands/assign';

async function userConnected(userId: string, serverId: string, channel: VoiceChannel): Promise<void> {
  const connection: VoiceConnection = await channel.join();
  const hash: string = Crypto.createHash('md5').update(`${userId}${serverId}`).digest('hex');
  const response: AssignPayload  = await new Promise<AssignPayload>((resolve, reject) => {
    Database.get(hash, (err, reply) => {
      if (err) {reject(err);}
      resolve(JSON.parse(reply));
    });
  });

  const info = await Ytdl.getInfo(response.url);
  const audioFormats = Ytdl.filterFormats(info.formats, 'audioonly');

  connection.play(
    Ytdl(response.url, { begin: response.starts, format: audioFormats[0] }),
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
