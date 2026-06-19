import z, { string } from "zod";

export const ZCompany = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  subscription_type: z.string(),
  logo: z.string(),
  is_Archived: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  createdBy: z.string()
});
export const ZCompanyCreate = z.object({
  name: z.string().min(1),
  subscription_type: z.string(),
  email: z.email(),
});

export type company = z.infer<typeof ZCompany>;
export type companyCreate = z.infer<typeof ZCompanyCreate>;
