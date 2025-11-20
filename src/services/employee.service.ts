import { CreateEmployeeDTO } from "../schemas/employee.schema";
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

  const employee = await EmployeeModel.create({
    ...data,
    companyId: data.companyId,
  });

  return employee;
};
