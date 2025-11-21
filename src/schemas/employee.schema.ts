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

export const updateEmployeeSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().optional(),
    role: z.string().optional(),
    status: z.enum(["active", "inactive"]).optional(),
    createdAtDate: z.coerce.date().optional(),
    terminationDate: z.coerce.date().optional(),
    password: z.string().optional(),
    companyId: z.string().optional(),
  })
  .refine(
    (data) =>
      data.name !== undefined ||
      data.email !== undefined ||
      data.role !== undefined ||
      data.status !== undefined ||
      data.createdAtDate !== undefined ||
      data.terminationDate !== undefined ||
      data.password !== undefined ||
      data.companyId !== undefined,
    {
      message: "At least one field must be filled in to edit.",
      path: [
        "name",
        "email",
        "role",
        "status",
        "createdAtDate",
        "terminationDate",
        "password",
        "companyId",
      ],
    }
  );

export type UpdateEmployeeDTO = z.infer<typeof updateEmployeeSchema>;

//schema para validar os IDS

export const employeeIdSchema = z.object({
  id: z
    .string()
    .length(24, "O ID must be 24 characters long")
    .nonempty("O ID is required"),
});

export type employeeIdDTO = z.infer<typeof employeeIdSchema>;
