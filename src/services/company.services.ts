import { CompanyModel } from "../models/company.model";
import {
  CreateCompanyDTO,
  GetCompanyQueryDTO,
} from "../schemas/company.schema";

//service para criar uma Nova Empresa

export const createCompanyService = async (data: CreateCompanyDTO) => {
  try {
    const company = await CompanyModel.create(data);
    return company;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error("CNPJ already exists");
    }
    throw error;
  }
};

//service para Buscar informacao de Uma empresa pelo CNPJ ou Pelo Nome

export const getCompanyService = async (query: GetCompanyQueryDTO) => {
  const filter: any = {};

  if (query.cnpj) {
    filter.cnpj = query.cnpj;
  }

  if (query.name) {
    filter.name = { $regex: query.name, $options: "i" };
  }

  const companies = await CompanyModel.find(filter).lean();
  return companies;
};
