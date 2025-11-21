import { Router } from "express";
import {
  validate,
  validateQuery,
  validateParams,
  validateCompanyWithEmployee,
} from "../middlewares/global.validate.middleware";
import {
  createCompanyController,
  getCompanyController,
  listCompanyEmployeesController,
  deleteCompanyController,
  updateCompanyController,
  getAllCompanyController,
  createCompanyWithEmployeeController,
} from "../controllers/company.controllers";
import {
  createCompanySchema,
  getCompanyQuerySchema,
  companyIdSchema,
  updateCompanySchema,
} from "../schemas/company.schema";
import { createCompanyWithEmployeeSchema } from "../schemas/companyAndEmployee.schema";

const router = Router();

//rota para buscar empresa pelo nome ou cmpj por query params
router.get("/info", validateQuery(getCompanyQuerySchema), getCompanyController);

//Rota Bonus para pegar todas as empresas cadastradas
router.get("/all", getAllCompanyController);

//Rota para criar empresa e Funcionario

router.post(
  "/create-with-employee",
  validateCompanyWithEmployee(createCompanyWithEmployeeSchema),
  createCompanyWithEmployeeController
);

router.post("/create", validate(createCompanySchema), createCompanyController);

//rota para listar todos os funcionarios de uma empresa
router.get(
  "/info/:id",
  validateParams(companyIdSchema),
  listCompanyEmployeesController
);

//rota para deletar uma empresa e seus funcionarios
router.delete("/delete/:id", validateParams(companyIdSchema), deleteCompanyController);

//rota para atualizar uma empresa

router.patch(
  "/:id",
  validateParams(companyIdSchema),
  validate(updateCompanySchema),
  updateCompanyController
);

export default router;
