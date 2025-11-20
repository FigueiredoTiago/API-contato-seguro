import {
  createEmployeeService,
  updateEmployeeService,
  deleteEmployeeService,
  getAllEmployeesService,
} from "../services/employee.service";
import { Request, Response } from "express";
import { CreateEmployeeDTO } from "../schemas/employee.schema";

//controller para criar um funcionario

export const createEmployeeController = async (req: Request, res: Response) => {
  try {
    const data: CreateEmployeeDTO = req.body;
    const employee = await createEmployeeService(data);
    return res
      .status(201)
      .send({ message: "Employee created successfully", employee });
  } catch (error: any) {
    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }
    if (error.status === 409) {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//controller para editar um funcionario

export const updateEmployeeController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updated = await updateEmployeeService(data, id);

    return res
      .status(200)
      .send({ message: "Employee updated Successfully", updated });
  } catch (error: any) {
    if (error.status === 404) {
      console.log(error);
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//controller para deletar um funcionario por ID

export const deleteEmployeeController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteEmployeeService(id);
    return res.status(200).send({ message: "Employee deleted successfully" });
  } catch (error: any) {
    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Controller para listar TODOS os Funcionarios Cadastrados no BD --ROTA BONUS -

export const getAllEmployeesController = async (
  req: Request,
  res: Response
) => {
  try {
    const employees = await getAllEmployeesService();

    if (employees.length === 0) {
      return res
        .status(404)
        .send({ message: "No employees found", employees: [] });
    }

    return res
      .status(200)
      .send({ message: "Employees retrieved successfully", employees });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
