import mongoose from "mongoose";
import bcrypt from "bcrypt";
import * as companyService from "../../../services/company.services";
import { CompanyModel } from "../../../models/company.model";
import { EmployeeModel } from "../../../models/employee.model";

jest.mock("bcrypt");
jest.mock("../../../models/company.model");
jest.mock("../../../models/employee.model");

describe("Company Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createCompanyWithEmployeeService", () => {
    const data = {
      company: {
        name: "Empresa Teste",
        sector: "Tech",
        cnpj: "12345678000190",
        city: "Natal",
        state: "RN",
      },
      employee: {
        name: "Funcionario Teste",
        email: "test@example.com",
        password: "123456",
        role: "Dev",
        status: "active",
      },
    };

    it("deve criar empresa e funcionário com sucesso", async () => {
      (CompanyModel.findOne as jest.Mock).mockResolvedValue(null);
      (EmployeeModel.findOne as jest.Mock).mockResolvedValue(null);
      (CompanyModel.create as jest.Mock).mockResolvedValue({
        ...data.company,
        _id: "1",
      });
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashed_password");
      (EmployeeModel.create as jest.Mock).mockResolvedValue({
        ...data.employee,
        password: "hashed_password",
        companyId: "1",
      });

      const result = await companyService.createCompanyWithEmployeeService(
        data as any
      );

      expect(CompanyModel.create).toHaveBeenCalledWith(data.company);
      expect(EmployeeModel.create).toHaveBeenCalledWith({
        ...data.employee,
        password: "hashed_password",
        companyId: "1",
      });
      expect(result.company).toBeDefined();
      expect(result.employee).toBeDefined();
    });

    it("deve lançar erro se a empresa já existir", async () => {
      (CompanyModel.findOne as jest.Mock).mockResolvedValue(data.company);

      await expect(
        companyService.createCompanyWithEmployeeService(data as any)
      ).rejects.toMatchObject({
        status: 400,
        message: "CNPJ already exists.",
      });
    });

    it("deve lançar erro se o email do funcionário já existir", async () => {
      (CompanyModel.findOne as jest.Mock).mockResolvedValue(null);
      (EmployeeModel.findOne as jest.Mock).mockResolvedValue(data.employee);

      await expect(
        companyService.createCompanyWithEmployeeService(data as any)
      ).rejects.toMatchObject({
        status: 400,
        message: "Employee Email already exists.",
      });
    });
  });

  describe("createCompanyService", () => {
    const companyData = {
      name: "Empresa Teste",
      sector: "Tech",
      cnpj: "12345678000190",
      city: "Natal",
      state: "RN",
    };

    it("deve criar uma empresa com sucesso", async () => {
      (CompanyModel.create as jest.Mock).mockResolvedValue(companyData);
      const result = await companyService.createCompanyService(companyData);
      expect(result).toEqual(companyData);
    });

    it("deve lançar erro se CNPJ duplicado", async () => {
      const err: any = new Error();
      err.code = 11000;
      (CompanyModel.create as jest.Mock).mockRejectedValue(err);

      await expect(
        companyService.createCompanyService(companyData)
      ).rejects.toThrow("CNPJ already exists");
    });
  });

  describe("getCompanyService", () => {
    it("deve retornar empresas filtradas por name ou cnpj", async () => {
      const mockCompanies = [{ name: "Empresa Teste", cnpj: "12345678000190" }];
      (CompanyModel.find as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockCompanies),
      });

      const result = await companyService.getCompanyService({
        name: "Empresa",
      });
      expect(result).toEqual(mockCompanies);
    });
  });

  describe("listCompanyEmployeesService", () => {
    const companyId = "1";

    it("deve retornar empresa e funcionários", async () => {
      (CompanyModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({ _id: companyId, name: "Empresa" }),
      });
      (EmployeeModel.find as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue([{ name: "Funcionario", companyId }]),
      });

      const result = await companyService.listCompanyEmployeesService(
        companyId
      );

      expect(result.company._id).toBe(companyId);
      expect(result.employees.length).toBe(1);
    });

    it("deve lançar 404 se empresa não existir", async () => {
      (CompanyModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });

      await expect(
        companyService.listCompanyEmployeesService(companyId)
      ).rejects.toMatchObject({
        status: 404,
        message: "Company not Found",
      });
    });
  });

  describe("deleteCompanyService", () => {
    const companyId = "1";

    it("deve deletar empresa e funcionários", async () => {
      (CompanyModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({ _id: companyId }),
      });
      (EmployeeModel.deleteMany as jest.Mock).mockResolvedValue({});
      (CompanyModel.findByIdAndDelete as jest.Mock).mockResolvedValue({});

      await expect(
        companyService.deleteCompanyService(companyId)
      ).resolves.toBeUndefined();
    });

    it("deve lançar 404 se empresa não existir", async () => {
      (CompanyModel.findById as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });

      await expect(
        companyService.deleteCompanyService(companyId)
      ).rejects.toMatchObject({
        status: 404,
        message: "Company not Found",
      });
    });
  });

  describe("updateCompanyService", () => {
    const companyId = "1";
    const updateData = { name: "Nova Empresa" };

    it("deve atualizar empresa com sucesso", async () => {
      (CompanyModel.findById as jest.Mock).mockResolvedValue({
        _id: companyId,
      });
      (CompanyModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        _id: companyId,
        ...updateData,
      });

      const result = await companyService.updateCompanyService(
        companyId,
        updateData
      );
      expect(result?.name).toBe("Nova Empresa");
    });

    it("deve lançar 404 se empresa não existir", async () => {
      (CompanyModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(
        companyService.updateCompanyService(companyId, updateData)
      ).rejects.toMatchObject({
        status: 404,
        message: "Company not Found",
      });
    });
  });

  describe("getAllCompanyService", () => {
    it("deve retornar todas as empresas", async () => {
      const mockCompanies = [{ name: "Empresa1" }, { name: "Empresa2" }];
      (CompanyModel.find as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockCompanies),
      });

      const result = await companyService.getAllCompanyService();
      expect(result).toEqual(mockCompanies);
    });
  });
});
