const redis = require("redis");

const redisClient = redis.createClient();

redisClient.connect()
  .then(() => console.log("Redis Connected"))
  .catch(err => console.error("Erorr in connecting to Redis", err));

module.exports = redisClient;
