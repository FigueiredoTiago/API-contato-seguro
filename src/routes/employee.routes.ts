import { Router } from "express";
import {
  validate,
  validateParams,
} from "../middlewares/global.validate.middleware";
import {
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
  getAllEmployeesController,
} from "../controllers/employee.controller";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  employeeIdSchema,
} from "../schemas/employee.schema";

const router = Router();

//rota bonus
router.get("/all", getAllEmployeesController);

//cria um funcionario
router.post(
  "/create",
  validate(createEmployeeSchema),
  createEmployeeController
);

//edita um funcionario
router.patch(
  "/:id",
  validateParams(employeeIdSchema),
  validate(updateEmployeeSchema),
  updateEmployeeController
);

//apaga um funcionario
router.delete(
  "/delete/:id",
  validateParams(employeeIdSchema),
  deleteEmployeeController
);

export default router;
