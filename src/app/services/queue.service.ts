import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { env } from "../../validate-env.js";

export const sqsClient = new SQSClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,

    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});


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
