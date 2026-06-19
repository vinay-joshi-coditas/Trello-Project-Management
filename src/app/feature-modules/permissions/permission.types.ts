import z from "zod";

export const ZPermission = z.object({
    id: z.string(),
    name: z.string().min(1),
})

export type permission = z.infer<typeof ZPermission>;