import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { companyDocs } from "./company.docs";
import { employeeDocs } from "./employee.docs";

export const setupSwagger = (app: Express) => {
  const swaggerSpec = {
    openapi: "3.0.0",
    info: {
      title: "Contato-Seguro-API",
      version: "1.0.0",
      description: "Documentação da API do teste Backend Junior",
    },
    servers: [{ url: "http://localhost:5000" }],
    paths: {
      ...companyDocs,
      ...employeeDocs,
    },
  };

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
