import { CompanyModel } from "../models/company.model";
import { EmployeeModel } from "../models/employee.model";
import {
  CreateCompanyDTO,
  GetCompanyQueryDTO,
  CompanyUpdateDTO,
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

//service para listar todos os funcionarios vinculados a uma empresa

export const listCompanyEmployeesService = async (id: string) => {
  const company = await CompanyModel.findById(id).lean();
  if (!company) {
    throw { status: 404, message: "Company not Found" };
  }

  const employees = await EmployeeModel.find({ companyId: id }).lean();

  return {
    company,
    employees,
  };
};

//servico para apagar uma empresa e seus funcionarios vinculados

export const deleteCompanyService = async (id: string) => {
  const company = await CompanyModel.findById(id).lean();

  if (!company) {
    throw { status: 404, message: "Company not Found" };
  }

  await EmployeeModel.deleteMany({ companyId: id });
  await CompanyModel.findByIdAndDelete(id);

  return;
};

export const updateCompanyService = async (
  data: CompanyUpdateDTO,
  id: string
) => {
  const company = await CompanyModel.findById(id);

  if (!company) {
    throw { status: 404, message: "Company not Found" };
  }

  const updated = await CompanyModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return updated;
};

//Service bonus para Listar todas as empresas cadastradas no banco de dados

export const getAllCompanyService = async () => {
  const result = await CompanyModel.find().lean();
  return result;
};
