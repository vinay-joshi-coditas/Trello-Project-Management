import { createClient } from "redis";

export const redis = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: 6380,
  },
  password: process.env.REDIS_PASSWORD,
});

redis.on("error", (err) => {
  console.error("Redis Error:", err);
});

export const connectToRedis = async () => {
  try {
    await redis.connect();
    console.log("Connected to Redis successfully");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    throw error;
  }
};
