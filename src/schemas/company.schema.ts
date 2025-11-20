import { z } from "zod";

export const createCompanySchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    sector: z.string().min(1, "Sector is required"),
    cnpj: z.string().min(14, "CNPJ is invalid"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
  }),
});