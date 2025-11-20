import { Router } from "express";
import {
  validate,
  validateQuery,
} from "../middlewares/global.validate.middleware";
import { createEmployeeController } from "../controllers/employee.controller";
import { createEmployeeSchema } from "../schemas/employee.schema";

const router = Router();

router.post(
  "/create",
  validate(createEmployeeSchema),
  createEmployeeController
);

export default router;
