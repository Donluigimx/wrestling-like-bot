import Pino from 'pino';
import Crypto from 'crypto';

const destination = Pino.destination(process.env.LOGGER_DESTINATION || 1);
const options: Pino.LoggerOptions = {
  name: 'wrestling-like-bot'
};
const Logger = Pino(options, destination);

function getUniqueLogger(): Pino.Logger {
  const loggerId: string = Crypto.randomBytes(8).toString('hex');

  return Logger.child({ id: loggerId });
}
export { Logger, getUniqueLogger };
