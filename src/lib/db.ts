import Assert from 'assert';
import Redis from 'redis';

const redisOptions: Redis.ClientOpts = { };

if (!process.env.REDIS_URL) {
  Assert.ok(process.env.REDIS_PORT, 'REDIS_PORT is a required environment variable');
  Assert.ok(process.env.REDIS_HOST, 'REDIS_HOST is a required environment variable');
  Assert.ok(Number.isInteger(Number.parseInt(process.env.REDIS_PORT)), 'REDIS_PORT value is not an integer');

  redisOptions.port = Number.parseInt(process.env.REDIS_PORT);
  redisOptions.host = process.env.REDIS_HOST;
} else {
  redisOptions.url = process.env.REDIS_URL;
}

const client = Redis.createClient(redisOptions);

export default client;
