import { SendMessageCommand } from "@aws-sdk/client-sqs";

import { sqsClient } from "./queue.service.js";
import { env } from "../../validate-env.js";

export const sendOtpMessage = async (email: string, otp: string) => {
  await sqsClient.send(
    new SendMessageCommand({
      QueueUrl: env.EMAIL_QUEUE_URL,

      MessageBody: JSON.stringify({
        type: "OTP",
        email,
        otp,
      }),
    }),
  );
};
