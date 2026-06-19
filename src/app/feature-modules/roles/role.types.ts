import z from "zod";

export const ZRole = z.object({
    id: z.string(),
    name: z.string().min(1),
    company_id: z.string()
})

export type role = z.infer<typeof ZRole>;