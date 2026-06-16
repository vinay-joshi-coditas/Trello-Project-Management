import fs from "fs";
import jwt from "jsonwebtoken";

const privateKey = fs.readFileSync("private.key", "utf-8");
const publicKey = fs.readFileSync("public.key", "utf-8");

export type JwtPayloadType = {
  id: string;
  companyId: string;
  role: string;
};

export const generateAccessToken =  (userId: string, companyId: string, role: string, passwordVersion: number) => {
  const payload = { userId, companyId, role, passwordVersion };
  const token =  jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "15m",
  });
  return token;
};

export const generateRefreshToken = (userId: string) => {
  const token =  jwt.sign({ userId }, privateKey, {
    algorithm: "RS256",
    expiresIn: "7d",
  });
  return token;
};

export const verifyToken =  (token: string) => {
  return  jwt.verify(token, publicKey) as JwtPayloadType;
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};
