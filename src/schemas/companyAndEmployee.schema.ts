import { z } from "zod";
import { objectIdSchema } from "./employee.schema";

export const createCompanySchema = z.object({
  name: z.string("Name is required").nonempty("Name is required"),

  sector: z.string("Sector is required").nonempty("Sector is required"),

  cnpj: z.string("CNPJ is required").min(14, "CNPJ is invalid"),

  city: z.string("City is required").nonempty("City is required"),

  state: z.string("State is required").nonempty("State is required"),
});

export const createEmployeeSchema = z.object({
  name: z.string("Name is required").nonempty("Name is required"),
  email: z.string("Email is required").nonempty("Email is required"),
  role: z.string("Role is required").nonempty("Role is required"),
  status: z.enum(["active", "inactive"]).default("active"),
  createdAtDate: z.coerce.date(),
  terminationDate: z.coerce.date().optional(),
  password: z.string("Password is required").nonempty("Password is required"),
  companyId: objectIdSchema.optional(),
});

// criacao paralela com ambas entidades
export const createCompanyWithEmployeeSchema = z.object({
  company: createCompanySchema,
  employee: createEmployeeSchema,
});

export type CreateCompanyWithEmployeeDTO = z.infer<
  typeof createCompanyWithEmployeeSchema
>;
