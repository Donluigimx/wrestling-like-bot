import Assert from 'assert';
import Redis from 'redis';

Assert.ok(process.env.REDIS_PORT, 'REDIS_PORT is a required environment variable');
Assert.ok(process.env.REDIS_URL, 'REDIS_URL is a required environment variable');
Assert.ok(Number.isInteger(Number.parseInt(process.env.REDIS_PORT)), 'REDIS_PORT value is not an integer');

const client = Redis.createClient({ port: Number.parseInt(process.env.REDIS_PORT), host: process.env.REDIS_URL });

export default client;
