import {
  createCompanyService,
  getCompanyService,
  deleteCompanyService,
  listCompanyEmployeesService,
  updateCompanyService,
} from "../services/company.services";
import { Request, Response } from "express";
import { GetCompanyQueryDTO } from "../schemas/company.schema";

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
