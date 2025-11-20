import express, { Request, Response } from "express";
import cors from "cors";
import companyRoutes from "./routes/company.routes";
import employeeRoutes from "./routes/employee.routes";
import { setupSwagger } from './docs/swagger';

const app = express();
app.use(cors());
app.use(express.json());
setupSwagger(app);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "API IS RUNNING..." });
});

app.use("/company", companyRoutes);
app.use("/employee", employeeRoutes);


export default app;
