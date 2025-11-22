import bcrypt from "bcrypt";
import {
  CreateEmployeeDTO,
  UpdateEmployeeDTO,
} from "../schemas/employee.schema";
import { EmployeeModel } from "../models/employee.model";
import { CompanyModel } from "../models/company.model";

//servico para criar um funcionario

export const createEmployeeService = async (data: CreateEmployeeDTO) => {
  const company = await CompanyModel.findById(data.companyId);
  if (!company) {
    throw { status: 404, message: "Company not Found" };  
  }

  const existingEmployee = await EmployeeModel.findOne({
    email: data.email,
    companyId: data.companyId,
  });

  if (existingEmployee) {
    throw { status: 409, message: "Employee already exists in this company" };
  }

  const existingInOtherCompany = await EmployeeModel.findOne({
    email: data.email,
  });

  if (existingInOtherCompany) {
    throw {
      status: 409,
      message: "Employee already registered in another company",
    };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const employee = await EmployeeModel.create({
    ...data,
    password: hashedPassword,
    companyId: data.companyId,
  });

  return employee;
};

//servico para atualizar um funcionario:

export const updateEmployeeService = async (
  data: UpdateEmployeeDTO,
  id: string
) => {
  const employee = await EmployeeModel.findById(id);

  if (!employee) {
    throw { status: 404, message: "Employee not Found" };
  }

  const updated = await EmployeeModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return updated;
};

//service para deletar um funcionario:

export const deleteEmployeeService = async (id: string) => {
  const employee = await EmployeeModel.findById(id);

  if (!employee) {
    throw { status: 404, message: "Employee not Found" };
  }

  await EmployeeModel.findByIdAndDelete(id);

  return;
};

//Service para listar TODOS os Funcionarios Cadastrados no BD --ROTA BONUS -
export const getAllEmployeesService = async () => {
  const result = await EmployeeModel.find().lean();
  return result;
};
