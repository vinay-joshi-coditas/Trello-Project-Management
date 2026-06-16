import { Router } from "express";
import { ResponseHandler } from "../../utilities/response-handler.js";
import authService from "./auth.service.js";
import { Route } from "../../routes/routes.types.js";

const router = Router();

router.post("/generateOTP/:email", async (req, res, next) => {
  try {
    console.log("Hiii");

    const userEmail = req.params.email;
    const result = await authService.generateOtp(userEmail);
    res.send(new ResponseHandler(result));
    console.log("Otp generated successfully");
  } catch (error) {
    console.log(error);

    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const result = await authService.verifyOTP(email, otp);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    //    res.send(new ResponseHandler(result))

    res.send(
      new ResponseHandler({
        user: result.user,
      }),
    );
  } catch (error) {
    next(error);
  }
});

export default new Route("/auth", router);
