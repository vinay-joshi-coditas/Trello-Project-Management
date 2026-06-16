import z, { string } from "zod";

export const ZUser = z.object({
  id: string().optional(),
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(5),
  role: z.string(),
  company_id: z.string().min(1),
  password_version: z.number(),
});

export type User = z.infer<typeof ZUser>;
