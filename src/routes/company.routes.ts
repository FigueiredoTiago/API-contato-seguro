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
} from "../controllers/company.controllers";
import {
  createCompanySchema,
  getCompanyQuerySchema,
  companyIdSchema,
  updateCompanySchema,
} from "../schemas/company.schema";

const router = Router();

router.post("/create", validate(createCompanySchema), createCompanyController);
export default router;

//rota para buscar empresa pelo nome ou cmpj por query params
router.get("/info", validateQuery(getCompanyQuerySchema), getCompanyController);

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
