import { CompanyModel } from "../models/company.model";
import { CreateCompanyDTO } from "../schemas/company.schema";

//service para criar uma Nova Empresa

export const createCompanyService = async (data: CreateCompanyDTO) => {
  try {
    const company = await CompanyModel.create(data);
    return company;
  } catch (err: any) {
    if (err.code === 11000) {
      throw new Error("CNPJ already exists");
    }
    throw err;
  }
};
