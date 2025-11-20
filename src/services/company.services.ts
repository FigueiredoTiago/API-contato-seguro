import { CompanyModel, ICompany } from "../models/company.model";

//service para criar uma Nova Empresa

export const createCompanyService = async (data: ICompany) => {
  const company = await CompanyModel.create(data);
  return company;
};
