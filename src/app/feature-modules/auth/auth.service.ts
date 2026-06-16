import crypto from "crypto";
import type { User } from "../users/user.types.js";
import { redis } from "../../connections/redis.connection.js";
import { authResponses } from "./auth.response.js";
import userRepo from "../users/user.repo.js";
import { sendEmail } from "../../services/email.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utilities/jwt.js";


const generateOtp = async (email: string) => {
  try {
    const userexists = await userRepo.findOne(email);
    if (!userexists) throw authResponses.USER_NOT_FOUND;
    const otp = crypto.randomInt(100000, 999999).toString();
    const redisKey = `OTP:${userexists.email}`;

    await redis.setEx(redisKey, 600, otp);

    console.log(otp);

    await sendEmail(
      userexists.email,
      "OTP verification",
      `<h1>Your OTP for login is ${otp}</h1>
        <br><br>
      <p>Valid for 10 minutes.</p> `,
    );

    // await sendOtpMessage(
    //   userexists.email,
    //   otp
    // );
    // return otp;
    return authResponses.OTP_SENT;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const verifyOTP = async (email: string, otp: string) => {
  try {
    const originalOTP = await redis.get(`OTP:${email}`);

    if (!originalOTP) {
      throw new Error("OTP expired");
    }

    if (otp !== originalOTP) {
      throw authResponses.INVALID_OTP;
    }

    const user = await userRepo.findOne(email);

    if (!user) {
      throw authResponses.USER_NOT_FOUND;
    }

    await redis.del(`OTP:${email}`);

    if (user.password_version === 0) {
      return {
        requiresPasswordSetup: true,
        userId: user.id,
      };
    }

    if (!user.id) {
      throw new Error("UserId missing");
    }

    const userId = user.id;
    const companyId = user.company_id;

    const accessToken = await generateAccessToken(
      userId,
      companyId,
      user.role,
      user.password_version,
    );

    const refreshToken = await generateRefreshToken(userId);

    // await refreshTokenRepo.create({
    //   userId: user.id,
    //   token: refreshToken,
    // });

    return {
      requiresPasswordSetup: false,
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        companyId: user.company_id,
        role: user.role,
        passwordVersion: user.password_version,
      },
    };

  } catch (e) {
    throw e;
  }
};

export default {
  generateOtp,
  verifyOTP,
};