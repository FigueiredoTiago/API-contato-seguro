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
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};
