import { Router } from "express";
import {
  validate,
  validateQuery,
} from "../middlewares/global.validate.middleware";
import {
  createCompanyController,
  getCompanyController,
  listCompanyEmployeesController,
} from "../controllers/company.controllers";
import {
  createCompanySchema,
  getCompanyQuerySchema,
} from "../schemas/company.schema";

const router = Router();

router.post("/create", validate(createCompanySchema), createCompanyController);
export default router;

//rota para buscar empresa pelo nome ou cmpj por query params
router.get("/info", validateQuery(getCompanyQuerySchema), getCompanyController);

//rota para listar todos os funcionarios de uma empresa
router.get("/:id", listCompanyEmployeesController);
