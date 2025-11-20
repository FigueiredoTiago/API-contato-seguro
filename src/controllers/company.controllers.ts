import {
  createCompanyService,
  getCompanyService,
  deleteCompanyService,
  listCompanyEmployeesService,
  updateCompanyService,
  getAllCompanyService,
  createCompanyWithEmployeeService,
} from "../services/company.services";
import { Request, Response } from "express";
import { GetCompanyQueryDTO } from "../schemas/company.schema";
import { CreateEmployeeDTO } from "../schemas/employee.schema";
import { CreateCompanyDTO } from "../schemas/company.schema";

interface CreateCompanyWithEmployeeDTO {
  company: CreateCompanyDTO;
  employee: Omit<CreateEmployeeDTO, "companyId">;
}

//Controller para Criar Empresa e Funcionario ao mesmo tempo
export const createCompanyWithEmployeeController = async (
  req: Request,
  res: Response
) => {
  try {
    const data: CreateCompanyWithEmployeeDTO = req.body;

    const result = await createCompanyWithEmployeeService(data);

    return res.status(201).json({
      message: "Company and first employee created successfully",
      company: result.company,
      employee: result.employee,
    });
  } catch (error: any) {
    if (error.message === "CNPJ already exists") {
      return res.status(409).json({ message: error.message });
    }
    const status = error.status || 500;
    return res.status(status).json({
      message: error.message || "Internal Server Error",
    });
  }
};

//controller para criar uma empresa
export const createCompanyController = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const company = await createCompanyService(data);
    return res
      .status(201)
      .send({ message: "Company created Successfully", company });
  } catch (error: any) {
    if (error.message === "CNPJ already exists") {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//controller para buscar informacoes de uma Empresa pelo Cnpj ou Pelo nome

export const getCompanyController = async (req: Request, res: Response) => {
  const query = req.query;

  try {
    const companies = await getCompanyService(query as GetCompanyQueryDTO);
    if (companies.length === 0) {
      return res.status(404).json({
        message: "No companies found matching the provided criteria",
      });
    }

    return res.status(200).send({ companies });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//controller par listar todos os funcionarios vinculados a uma emopresa

export const listCompanyEmployeesController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const result = await listCompanyEmployeesService(id);

    if (result.employees.length === 0)
      return res
        .status(404)
        .send({ message: "No employees found for this company" });

    return res.status(200).send(result);
  } catch (error: any) {
    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//contrler para deletar uma empresa e seus funcionarios
export const deleteCompanyController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteCompanyService(id);
    return res
      .status(200)
      .send({ message: "Company and employees deleted successfully" });
  } catch (error: any) {
    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//controller para atualzar uma empresa

export const updateCompanyController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updated = await updateCompanyService(data, id);

    return res
      .status(200)
      .send({ message: "Company updated Successfully", updated });
  } catch (error: any) {
    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//controller Bonus pra pegar todas as empresas cadastradas no BD

export const getAllCompanyController = async (req: Request, res: Response) => {
  try {
    const result = await getAllCompanyService();
    if (result.length === 0) {
      return res
        .status(404)
        .send({ message: "No company found", companies: [] });
    }
    return res
      .status(200)
      .send({ message: "Companies retrieved successfully", result });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
