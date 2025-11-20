import express, { Request, Response } from "express";
import cors from "cors";
import companyRoutes from "./routes/company.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "API IS RUNNING..." });
});

app.use("/company", companyRoutes);

export default app;
