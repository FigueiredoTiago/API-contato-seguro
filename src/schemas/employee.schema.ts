import { z } from "zod";

import mongoose from "mongoose";

//schema apenas para verificacao de Id Correto
export const objectIdSchema = z
  .string()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId",
  });

//schema para status do employee
export const employeeStatus = z.enum(["active", "inactive"]);

export type EmployeeStatus = z.infer<typeof employeeStatus>;

// schema de saida de um employee
export const employeeSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  status: employeeStatus,
  createdAtDate: z.string(),
  terminationDate: z.string().nullable(),
  companyId: objectIdSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

export type EmployeeDTO = z.infer<typeof employeeSchema>;

//schema de criacao de novo employee
export const createEmployeeSchema = z.object({
  name: z.string("Name is required").nonempty("Name is required"),
  email: z.string("Email is required").nonempty("Email is required"),
  role: z.string("Role is required").nonempty("Role is required"),
  status: z.enum(["active", "inactive"]).default("active"),
  createdAtDate: z.coerce.date(),
  terminationDate: z.coerce.date().optional(),
  password: z.string("Password is required").nonempty("Password is required"),
  companyId: objectIdSchema.nonempty("Company ID is required"),
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
    .nonempty("O ID é obrigatório")
    .refine((value) => /^[a-fA-F0-9]{24}$/.test(value), {
      message: "O ID deve conter 24 caracteres hexadecimais",
    })
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "O ID não é um ObjectId válido",
    }),
});

export type employeeIdDTO = z.infer<typeof employeeIdSchema>;
