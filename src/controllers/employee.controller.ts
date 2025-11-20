import { createEmployeeService } from "../services/employee.service";
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
