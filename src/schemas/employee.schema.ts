import { z } from "zod";

export const createEmployeeSchema = z.object({
  name: z.string().min(3),
  email: z.string(),
  role: z.string().min(2),
  status: z.enum(["active", "inactive"]).default("active"),
  ccreatedAtDate: z.coerce.date(),
  terminationDate: z.coerce.date().optional(),
  password: z.string().min(6, "Password must have at least 6 characters"), //vou utilizar um Regex mais tarde aqui para ter seguranca
  company: z.string().min(1, "Company ID is required"),
});
