import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { CompanyModel } from "../models/company.model";
import { EmployeeModel } from "../models/employee.model";
import {
  CreateCompanyDTO,
  GetCompanyQueryDTO,
  CompanyUpdateDTO,
} from "../schemas/company.schema";
import { CreateEmployeeDTO } from "../schemas/employee.schema";

//Service para Criar uma Empresa e Paralelamente criar um Funcionario Junto:
interface CreateCompanyWithEmployeeDTO {
  company: CreateCompanyDTO;
  employee: Omit<CreateEmployeeDTO, "companyId">;
}

//Modo Dev - nao usa Transaction - Explicado no readme - usei apenas em DEV
export const createCompanyWithEmployeeService = async (
  data: CreateCompanyWithEmployeeDTO
) => {
  const existingCompany = await CompanyModel.findOne({
    cnpj: data.company.cnpj,
  });

  if (existingCompany) {
    throw {
      status: 400,
      message: "CNPJ already exists.",
    };
  }

  const existingEmployee = await EmployeeModel.findOne({
    email: data.employee.email,
  });

  if (existingEmployee) {
    throw {
      status: 400,
      message: "Employee Email already exists.",
    };
  }

  try {
    const company = await CompanyModel.create(data.company);

    const hashedPassword = await bcrypt.hash(data.employee.password, 10);

    const employee = await EmployeeModel.create({
      ...data.employee,
      password: hashedPassword,
      companyId: company._id,
    });

    return { company, employee };
  } catch (error: any) {
    throw {
      status: 500,
      message: "Error creating company and employee",
      error,
    };
  }
};

/* Esse servico deve ser usado apenas na Producao, caso contrario o BD criado pelo Docker nao vai conseguir execultar.
usamos esse servico para manter a consistencia dos dados na prod */
/*export const createCompanyWithEmployeeService = async (
  data: CreateCompanyWithEmployeeDTO
) => {
  const existingCompany = await CompanyModel.findOne({
    cnpj: data.company.cnpj,
  });

  if (existingCompany) {
    throw {
      status: 400,
      message: "CNPJ already exists.",
    };
  }

  const existingEmployee = await EmployeeModel.findOne({
    email: data.employee.email,
  });

  if (existingEmployee) {
    throw {
      status: 400,
      message: "Employee Email already exists.",
    };
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const company = await CompanyModel.create([data.company], { session });

    const companyId = company[0]._id;

    const hashedPassword = await bcrypt.hash(data.employee.password, 10);

    const employee = await EmployeeModel.create(
      [
        {
          ...data.employee,
          password: hashedPassword,
          companyId,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return {
      company: company[0],
      employee: employee[0],
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw {
      status: 500,
      message: "Error creating company and employee",
      error,
    };
  }
}; */

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
