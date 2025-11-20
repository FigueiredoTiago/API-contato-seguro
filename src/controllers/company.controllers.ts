import { createCompanyService } from "../services/company.services";
import { Request, Response } from "express";

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
