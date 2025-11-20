import { Router } from "express";
import {
  validate,
  validateQuery,
  validateParams,
} from "../middlewares/global.validate.middleware";
import {
  createCompanyController,
  getCompanyController,
  listCompanyEmployeesController,
  deleteCompanyController,
  updateCompanyController,
  getAllCompanyController,
} from "../controllers/company.controllers";
import {
  createCompanySchema,
  getCompanyQuerySchema,
  companyIdSchema,
  updateCompanySchema,
} from "../schemas/company.schema";

const router = Router();

//rota para buscar empresa pelo nome ou cmpj por query params
router.get("/info", validateQuery(getCompanyQuerySchema), getCompanyController);

//Rota Bonus para pegar todas as empresas cadastradas
router.get("/all", getAllCompanyController);

router.post("/create", validate(createCompanySchema), createCompanyController);

//rota para listar todos os funcionarios de uma empresa
router.get(
  "/:id",
  validateParams(companyIdSchema),
  listCompanyEmployeesController
);

//rota para deletar uma empresa e seus funcionarios
router.delete("/:id", validateParams(companyIdSchema), deleteCompanyController);

//rota para atualizar uma empresa

router.patch(
  "/:id",
  validateParams(companyIdSchema),
  validate(updateCompanySchema),
  updateCompanyController
);

export default router;
