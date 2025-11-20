import { z } from "zod";

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
    message: "Pelo menos cnpj ou name deve ser informado",
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
