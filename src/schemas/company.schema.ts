import { z } from "zod";
import { employeeSchema } from "./employee.schema";

// schema de resposta de uma company
export const companySchema = z.object({
  _id: z.string(),
  name: z.string(),
  sector: z.string(),
  cnpj: z.string(),
  city: z.string(),
  state: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

export type CompanyDTO = z.infer<typeof companySchema>;

export const createCompanySchema = z.object({
  name: z.string("Name is required").nonempty("Name is required"),

  sector: z.string("Sector is required").nonempty("Sector is required"),

  cnpj: z.string("CNPJ is required").min(14, "CNPJ is invalid"),

  city: z.string("City is required").nonempty("City is required"),

  state: z.string("State is required").nonempty("State is required"),
});

export type CreateCompanyDTO = z.infer<typeof createCompanySchema>;

//schema para validar a busca das informacoes de uma empresa pelo CNPJ ou Nome

export const getCompanyQuerySchema = z
  .object({
    cnpj: z.string().min(1, "CNPJ is Required").optional(),
    name: z.string().min(1, "Name is Required").optional(),
  })
  .refine((data) => data.cnpj !== undefined || data.name !== undefined, {
    message: "At least CNPJ or name must be provided.",
    path: ["cnpj", "name"],
  });

export type GetCompanyQueryDTO = z.infer<typeof getCompanyQuerySchema>;

//schema para validar os IDS

export const companyIdSchema = z.object({
  id: z
    .string()
    .length(24, "O ID must be 24 characters long")
    .nonempty("O ID is required"),
});

export type CompanyIdDTO = z.infer<typeof companyIdSchema>;

//schema para validar atualizacao de uma empresa

export const updateCompanySchema = z
  .object({
    name: z.string("Name is required").optional(),
    sector: z.string("Sector is required").optional(),

    cnpj: z.string("CNPJ is required").min(14, "CNPJ is invalid").optional(),

    city: z.string("City is required").optional(),

    state: z.string("State is required").optional(),
  })
  .refine(
    (data) =>
      data.name !== undefined ||
      data.sector !== undefined ||
      data.cnpj !== undefined ||
      data.city !== undefined ||
      data.state !== undefined,
    {
      message: "At least one field must be filled in to edit.",
      path: ["name", "sector", "cnpj", "city", "state"],
    }
  );

export type CompanyUpdateDTO = z.infer<typeof updateCompanySchema>;

//schema para retorno de Company com Lista de Employees:
export const companyWithEmployeesSchema = z.object({
  company: companySchema,
  employees: z.array(employeeSchema),
});

export type CompanyWithEmployeesDTO = z.infer<
  typeof companyWithEmployeesSchema
>;
