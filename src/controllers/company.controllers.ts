import {
  createCompanyService,
  getCompanyService,
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
        message: "Nenhuma empresa encontrada com os critérios informados",
      });
    }

    return res.status(200).send({ companies });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
