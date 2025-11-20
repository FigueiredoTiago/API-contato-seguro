import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { companyDocs } from "./company.docs";

export const setupSwagger = (app: Express) => {
  const swaggerSpec = {
    openapi: "3.0.0",
    info: {
      title: "Minha API",
      version: "1.0.0",
      description: "Documentação da API usando Swagger",
    },
    servers: [{ url: "http://localhost:5000" }],
    paths: {
      ...companyDocs,
    },
  };

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
