import { Client, Message } from 'discord.js';
import Assert from 'assert';

import { Logger, getUniqueLogger } from './lib/logger';

import AssignCommand from './commands/assign';
import DebugCommand from './commands/debug';

Assert.ok(process.env.DISCORD_TOKEN, 'DISCORD_TOKEN is a required environment variable');
Assert.ok(process.env.DISCORD_BOT_ID, 'DISCORD_BOT_ID is a required environment variable');

const client = new Client();

client.login(process.env.DISCORD_TOKEN);
Logger.info('Bot running');

client.on('message', async function(message: Message){
  const logger = getUniqueLogger();
  logger.info({ message });

  if (process.env.DISCORD_BOT_ID === message.author.id) {return;}

  const result: RegExpExecArray = /^!wlb\s(assign|remove|debug)(?:\s([^\s]+))?(?:\s([^\s]+))?(?:\s([^\s]+))?$/g.exec(message.content);

  if (!result) {return;}

  const [ , command, ...args ] = result;

  switch (command) {
  case 'assign':
    await AssignCommand(
      {
        url: args[0],
        starts: args[1],
        audio_length: args[2],
        user_id: message.author.id,
        server_id: message.guild.id,
      },
      message.channel,
      logger.child({ command })
    );
    break;

  case 'debug':
    await DebugCommand(message.author.id, message.guild.id, message.channel);
    break;
  default:
    break;
  }
});
