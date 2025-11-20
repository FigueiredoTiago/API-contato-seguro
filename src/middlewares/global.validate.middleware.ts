import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors: err.issues.map((issue) => ({
            path: issue.path.join(", "),
            message: issue.message,
          })),
        });
      }
      return res.status(500).json({
        message: "Erro interno",
      });
    }
  };

export const validateQuery =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query ?? {});
      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Dados inválidos",
          errors: err.issues.map((issue) => ({
            path: issue.path.join(", "),
            message: issue.message,
          })),
        });
      }
      return res.status(500).json({
        message: "Erro interno",
      });
    }
  };

export const validateParams =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (err: any) {
      if (err?.issues) {
        return res.status(400).json({
          message: "Parâmetros inválidos",
          errors: err.issues.map((issue: any) => ({
            path: issue.path.join(" , "),
            message: issue.message,
          })),
        });
      }
      return res.status(500).json({ message: "Erro interno" });
    }
  };
