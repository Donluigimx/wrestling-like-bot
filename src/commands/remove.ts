import Crypto from 'crypto';
import { DMChannel, NewsChannel, TextChannel, MessageEmbed } from 'discord.js';

import Database from '../lib/db';

async function remove(userId: string, serverId: string, textChannel: TextChannel | DMChannel | NewsChannel): Promise<void> {
  const hash: string = Crypto.createHash('md5').update(`${userId}${serverId}`).digest('hex');
  try {
    await new Promise<string>((_, reject) => {
      Database.del(hash, (err) => {
        if (err) {
          reject(err);
        }
      });
    });
  } catch (error) {
    const embedError: MessageEmbed = new MessageEmbed()
    .setColor('#B22222')
    .setTitle('Error')
    .setDescription('No audio found for user');

    await textChannel.send(embedError);

    return;
  }

  const embedResponse: MessageEmbed = new MessageEmbed()
  .setColor('#00FFFF')
  .setDescription('Song removed');

  await textChannel.send(embedResponse);

  return;
}

export default remove;
