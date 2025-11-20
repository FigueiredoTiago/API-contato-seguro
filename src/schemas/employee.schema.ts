import { z } from "zod";

export const createEmployeeSchema = z.object({
  name: z.string("Name is required").nonempty("Name is required"),
  email: z.string("Email is required").nonempty("Email is required"),
  role: z.string("Role is required").nonempty("Role is required"),
  status: z.enum(["active", "inactive"]).default("active"),
  createdAtDate: z.coerce.date(),
  terminationDate: z.coerce.date().optional(),
  password: z.string("Password is required").nonempty("Password is required"), //vou utilizar um Regex mais tarde aqui para ter seguranca
  companyId: z.string("Company is required").nonempty("Company ID is required"),
});

export type CreateEmployeeDTO = z.infer<typeof createEmployeeSchema>;
