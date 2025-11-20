import { CreateEmployeeDTO } from "../schemas/employee.schema";
import { EmployeeModel } from "../models/employee.model";

//servico para criar um funcionario

export const createEmployeeService = async (data: CreateEmployeeDTO) => {
  const existingEmail = await EmployeeModel.findOne({ email: data.email });
  if (existingEmail) {
    throw { status: 409, message: "Email already in use" };
  }
  const employee = await EmployeeModel.create(data);
  return employee;
};
