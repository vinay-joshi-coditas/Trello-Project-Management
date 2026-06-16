import z, { string } from "zod";

export const ZCompany = z.object({
  id: string().optional(),
  name: z.string().min(1),
  subscription_type: z.string(),
  logo: z.string(),
});

export type company = z.infer<typeof ZCompany>;
