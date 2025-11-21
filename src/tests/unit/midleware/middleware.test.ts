import {
  validate,
  validateQuery,
  validateParams,
  validateCompanyWithEmployee,
} from "../../../middlewares/global.validate.middleware";

import {
  createCompanySchema,
  getCompanyQuerySchema,
  companyIdSchema,
  updateCompanySchema,
} from "../../../schemas/company.schema";

describe("Middlewares de validação", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = { body: {}, query: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    jest.clearAllMocks();
  });


  describe("validate() - body", () => {
    const middleware = validate(createCompanySchema);

    it("deve chamar next() quando os dados forem válidos", () => {
      req.body = {
        name: "Empresa Teste",
        sector: "Tech",
        cnpj: "12345678000190",
        city: "Natal",
        state: "RN",
      };

      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("deve retornar 400 quando a validação falhar", () => {
      req.body = {};
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });

    it("deve retornar 500 quando ocorrer erro inesperado", () => {
      const fakeSchema = {
        parse: () => {
          throw new Error("Erro inesperado");
        },
      } as any;
      const middleware500 = validate(fakeSchema);

      middleware500(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });
  });

 
  describe("validateQuery()", () => {
    const middleware = validateQuery(getCompanyQuerySchema);

    it("deve chamar next() quando a query for válida", () => {
      req.query = { name: "TfScript" };
      middleware(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it("deve retornar 400 se nem cnpj nem name forem enviados", () => {
      req.query = {};
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });

    it("deve retornar 500 para erros inesperados", () => {
      const fakeSchema = {
        parse: () => {
          throw new Error("Erro inesperado");
        },
      } as any;
      const middleware500 = validateQuery(fakeSchema);

      middleware500(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Erro interno" });
    });
  });

 
  describe("validateParams()", () => {
    const middleware = validateParams(companyIdSchema);

    it("deve chamar next() se os params forem válidos", () => {
      req.params = { id: "123456789012345678901234" };
      middleware(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it("deve retornar 400 se o param id for inválido", () => {
      req.params = { id: "abc" };
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });

    it("deve retornar 500 para erro inesperado", () => {
      const fakeSchema = {
        parse: () => {
          throw new Error("Erro inesperado");
        },
      } as any;
      const middleware500 = validateParams(fakeSchema);

      middleware500(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Erro interno" });
    });
  });

  
  describe("validateCompanyWithEmployee()", () => {
    const middleware = validateCompanyWithEmployee(updateCompanySchema);

    it("deve chamar next() se os dados forem válidos", () => {
      req.body = { name: "Nova Empresa" };
      middleware(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it("deve retornar 400 se nenhum campo for enviado para atualizar", () => {
      req.body = {};
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });

    it("deve retornar 500 para erros inesperados", () => {
      const fakeSchema = {
        parse: () => {
          throw new Error("Erro inesperado");
        },
      } as any;
      const middleware500 = validateCompanyWithEmployee(fakeSchema);

      middleware500(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Erro interno" });
    });
  });
});
