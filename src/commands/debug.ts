import Crypto from 'crypto';
import { DMChannel, NewsChannel, TextChannel } from 'discord.js';

import Database from '../lib/db';

async function debug(userId: string, serverId: string, textChannel: TextChannel | DMChannel | NewsChannel): Promise<void> {
  const hash: string = Crypto.createHash('md5').update(`${userId}${serverId}`).digest('hex');
  const response: string = await new Promise<string>((resolve, reject) => {
    Database.get(hash, (err, reply) => {
      if (err) {reject(err);}
      resolve(JSON.parse(reply));
    });
  });

  await textChannel.send(`${'```json\n'}${JSON.stringify(response, null, 2)}${'```'}`);

  return;
}

export default debug;
