import { Router } from "express";
import { validate } from "../middlewares/global.validate.middleware";
import { createCompanyController } from "../controllers/company.controllers";
import { createCompanySchema } from "../schemas/company.schema";

const router = Router();

router.post("/create", validate(createCompanySchema), createCompanyController);
export default router;
