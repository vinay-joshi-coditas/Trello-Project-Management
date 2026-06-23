import { createClient } from "redis";

export const redis = createClient({
  socket: {
    host: process.env.REDIS_HOST ? parseInt(process.env.REDIS_HOST) : undefined,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined,
    tls: true
  },
  password: process.env.REDIS_PASSWORD ? parseInt(process.env.REDIS_PASSWORD) : undefined,
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
