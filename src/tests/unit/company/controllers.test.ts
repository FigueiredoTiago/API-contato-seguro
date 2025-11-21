import {
  createCompanyController,
  updateCompanyController,
  getCompanyController,
  listCompanyEmployeesController,
  deleteCompanyController,
} from "../../../controllers/company.controllers";
import * as companyService from "../../../services/company.services";

describe("Company Controller - createCompanyController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      body: {
        name: "Empresa Teste",
        sector: "Tecnologia",
        cnpj: "12345678000199",
        city: "São Paulo",
        state: "SP",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("deve criar uma empresa e retornar status 201", async () => {
    const fakeCompany = {
      _id: "1",
      name: "Empresa Teste",
      sector: "Tecnologia",
      cnpj: "12345678000199",
      city: "São Paulo",
      state: "SP",
    };

    jest
      .spyOn(companyService, "createCompanyService")
      .mockResolvedValue(fakeCompany as any);

    await createCompanyController(req, res);

    expect(companyService.createCompanyService).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      message: "Company created Successfully",
      company: fakeCompany,
    });
  });

  it("deve retornar 409 se o CNPJ já existir", async () => {
    jest
      .spyOn(companyService, "createCompanyService")
      .mockRejectedValue(new Error("CNPJ already exists"));

    await createCompanyController(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: "CNPJ already exists" });
  });

  it("deve retornar 500 para erros inesperados", async () => {
    jest
      .spyOn(companyService, "createCompanyService")
      .mockRejectedValue(new Error("Database crashed"));

    await createCompanyController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
  });
});

describe("Company Controller - updateCompanyController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      params: { id: "1" },
      body: {
        name: "Empresa Editada",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("deve editar uma empresa com um campo e retornar status 200", async () => {
    const fakeCompany = {
      _id: "1",
      name: "Empresa Editada",
    };

    jest
      .spyOn(companyService, "updateCompanyService")
      .mockResolvedValue(fakeCompany as any);

    await updateCompanyController(req, res);

    expect(companyService.updateCompanyService).toHaveBeenCalledWith(
      "1",
      req.body
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Company updated Successfully",
      updated: fakeCompany,
    });
  });

  it("deve retornar 404 se a empresa não for encontrada", async () => {
    jest
      .spyOn(companyService, "updateCompanyService")
      .mockRejectedValue({ status: 404, message: "Company not Found" });

    await updateCompanyController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Company not Found" });
  });

  it("deve retornar 500 para erros inesperados", async () => {
    jest
      .spyOn(companyService, "updateCompanyService")
      .mockRejectedValue(new Error("Database crashed"));

    await updateCompanyController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
  });
});

describe("Company Controller - getCompanyController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      query: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("deve retornar 200 e uma lista de empresas usando name ou cnpj", async () => {
    req.query = { name: "TfScript" };

    const mockCompanies = [
      {
        _id: "691f39831d97b2bc402ede32",
        name: "TfScript",
        sector: "Tecnologia da informação",
        cnpj: "12345678000190",
        city: "Natal",
        state: "RN",
      },
    ];

    jest
      .spyOn(companyService, "getCompanyService")
      .mockResolvedValue(mockCompanies as any);

    await getCompanyController(req, res);

    expect(companyService.getCompanyService).toHaveBeenCalledWith(req.query);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ companies: mockCompanies });
  });

  it("deve retornar 404 se nenhuma empresa for encontrada", async () => {
    req.query = { cnpj: "00000000000000" };

    jest.spyOn(companyService, "getCompanyService").mockResolvedValue([]);

    await getCompanyController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "No companies found matching the provided criteria",
    });
  });

  it("deve retornar 500 em caso de erro inesperado", async () => {
    req.query = { name: "Teste" };

    jest
      .spyOn(companyService, "getCompanyService")
      .mockRejectedValue(new Error("Database error"));

    await getCompanyController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
  });
});

describe("Company Controller - getCompanyWithEmployeesController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      params: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("deve retornar 200 com empresa e funcionários vinculados", async () => {
    req.params = { id: "691f399e1d97b2bc402ede34" };

    const mockCompany = {
      _id: "691f399e1d97b2bc402ede34",
      name: "TF-Script",
      sector: "Development",
      cnpj: "1234567890/0001",
      city: "Natal",
      state: "Rio Grande do Norte",
    };

    const mockEmployees = [
      {
        _id: "691f5e557bf04c819157da88",
        name: "Tiago Figueiredo",
        email: "tiagoComT@example.com",
        role: "Programador",
        status: "active",
        createdAtDate: "2025-11-20T08:00:00.000Z",
        terminationDate: null,
        password: "********",
        companyId: "691f399e1d97b2bc402ede34",
      },
    ];

    jest
      .spyOn(companyService, "listCompanyEmployeesService")
      .mockResolvedValue({
        company: mockCompany as any,
        employees: mockEmployees as any,
      });

    await listCompanyEmployeesController(req, res);

    expect(companyService.listCompanyEmployeesService).toHaveBeenCalledWith(
      req.params.id
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      company: mockCompany,
      employees: mockEmployees,
    });
  });

  it("deve retornar 404 se a empresa não for encontrada", async () => {
    req.params = { id: "691f399e1d97b2bc402ede34" };

    jest
      .spyOn(companyService, "listCompanyEmployeesService")
      .mockResolvedValue({ company: null, employees: [] } as any);

    await listCompanyEmployeesController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "No employees found for this company",
    });
  });

  it("deve retornar 404 se não houver funcionários vinculados", async () => {
    req.params = { id: "691f399e1d97b2bc402ede34" };

    const mockCompany = {
      _id: "691f399e1d97b2bc402ede34",
      name: "TF-Script",
      sector: "Development",
      cnpj: "1234567890/0001",
      city: "Natal",
      state: "Rio Grande do Norte",
    };

    jest
      .spyOn(companyService, "listCompanyEmployeesService")
      .mockResolvedValue({ company: mockCompany as any, employees: [] });

    await listCompanyEmployeesController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "No employees found for this company",
    });
  });

  it("deve retornar 500 se ocorrer um erro inesperado", async () => {
    req.params = { id: "691f399e1d97b2bc402ede34" };

    jest
      .spyOn(companyService, "listCompanyEmployeesService")
      .mockRejectedValue(new Error("Unexpected error"));

    await listCompanyEmployeesController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
  });
});

describe("Company Controller - deleteCompanyController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      params: {
        id: "691f399e1d97b2bc402ede34",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("deve deletar a empresa e funcionários vinculados e retornar 200", async () => {
    jest
      .spyOn(companyService, "deleteCompanyService")
      .mockResolvedValue(undefined);

    await deleteCompanyController(req, res);

    expect(companyService.deleteCompanyService).toHaveBeenCalledWith(
      req.params.id
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Company and employees deleted successfully",
    });
  });

  it("deve retornar 404 quando a empresa não existir", async () => {
    jest.spyOn(companyService, "deleteCompanyService").mockRejectedValue({
      status: 404,
      message: "Company not Found",
    });

    await deleteCompanyController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Company not Found",
    });
  });

  it("deve retornar 500 para erros inesperados", async () => {
    jest
      .spyOn(companyService, "deleteCompanyService")
      .mockRejectedValue(new Error("DB crashed"));

    await deleteCompanyController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
  });
});
