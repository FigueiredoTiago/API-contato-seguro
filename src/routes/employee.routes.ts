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

router.post(
  "/create",
  validate(createEmployeeSchema),
  createEmployeeController
);

router.patch(
  "/:id",
  validateParams(employeeIdSchema),
  validate(updateEmployeeSchema),
  updateEmployeeController
);

router.delete(
  "/:id",
  validateParams(employeeIdSchema),
  deleteEmployeeController
);

router.get("/all", getAllEmployeesController);

export default router;
