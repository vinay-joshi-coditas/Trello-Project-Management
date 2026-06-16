import z from "zod";

const envSchema = z.object({
    PORT: z.coerce.number({message: 'PORT must be a number'}),
    DB_NAME: z.coerce.string(),  
    DB_USERNAME: z.coerce.string(),  
    DB_PASSWORD: z.coerce.string(),  
    AWS_REGION: z.coerce.string(),
    AWS_ACCESS_KEY_ID: z.coerce.string(),
    AWS_SECRET_ACCESS_KEY: z.coerce.string(),
    SES_SENDER_EMAIL: z.coerce.string(),
    EMAIL_QUEUE_URL: z.coerce.string()
});

export const env = envSchema.parse(process.env);