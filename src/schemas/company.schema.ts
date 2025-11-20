import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string("Name is required").nonempty("Name is required"),

  sector: z.string("Sector is required").nonempty("Sector is required"),

  cnpj: z.string("CNPJ is required").min(14, "CNPJ is invalid"),

  city: z.string("City is required").nonempty("City is required"),

  state: z.string("State is required").nonempty("State is required"),
});

export type CreateCompanyDTO = z.infer<typeof createCompanySchema>;
