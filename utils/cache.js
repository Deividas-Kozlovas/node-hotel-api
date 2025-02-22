const redis = require("redis");

const client = redis.createClient();
client.connect();

const getCache = async (key) => {
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
};

const setCache = async (key, value, ttl = 3600) => {
  await client.setEx(key, ttl, JSON.stringify(value));
};

const clearCache = async (key) => {
  await client.del(key);
};

module.exports = { getCache, setCache, clearCache };
