import { Router } from "express";
import {
  validate,
  validateParams,
} from "../middlewares/global.validate.middleware";
import {
  createEmployeeController,
  updateEmployeeController,
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

export default router;
