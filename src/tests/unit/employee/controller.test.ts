import {
  createEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
  getAllEmployeesController,
} from "../../../controllers/employee.controller";
import * as employeeService from "../../../services/employee.service";
import { Request, Response } from "express";

describe("Employee Controllers", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {};
    statusMock = jest.fn().mockReturnThis();
    sendMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn().mockReturnThis();

    res = {
      status: statusMock,
      send: sendMock,
      json: jsonMock,
    };
  });

  describe("createEmployeeController", () => {
    it("Deve criar um funcionário com sucesso e retornar 201", async () => {
      const employeeData = {
        name: "John Doe",
        email: "john@test.com",
        companyId: "641f5233ef8ffb11e3bd5353",
      };
      req.body = employeeData;

      jest
        .spyOn(employeeService, "createEmployeeService")
        .mockResolvedValue(employeeData as any);

      await createEmployeeController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Employee created successfully",
        employee: employeeData,
      });
    });

    it("Deve retornar 404 caso a empresa não exista", async () => {
      const employeeData = {
        name: "Jane Doe",
        email: "jane@test.com",
        companyId: "invalidCompanyId",
      };
      req.body = employeeData;

      jest
        .spyOn(employeeService, "createEmployeeService")
        .mockRejectedValue({ status: 404, message: "Company not found" });

      await createEmployeeController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Company not found" });
    });

    it("Deve retornar 409 caso haja conflito (ex: email já cadastrado)", async () => {
      req.body = {
        name: "John Doe",
        email: "john@test.com",
        companyId: "641f5233ef8ffb11e3bd5353",
      };

      jest.spyOn(employeeService, "createEmployeeService").mockRejectedValue({
        status: 409,
        message: "Employee already exists in this company",
      });

      await createEmployeeController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(409);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Employee already exists in this company",
      });
    });

    it("Deve retornar 500 para outros erros inesperados", async () => {
      req.body = {
        name: "John Doe",
        email: "john@test.com",
        companyId: "641f5233ef8ffb11e3bd5353",
      };

      jest
        .spyOn(employeeService, "createEmployeeService")
        .mockRejectedValue(new Error("Unexpected"));

      await createEmployeeController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });
  });

  describe("updateEmployeeController", () => {
    it("Deve atualizar um Funcionario", async () => {
      const updatedData = { name: "Jane Doe" };
      req.body = updatedData;
      req.params = { id: "123" };

      jest
        .spyOn(employeeService, "updateEmployeeService")
        .mockResolvedValue(updatedData as any);

      await updateEmployeeController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Employee updated Successfully",
        updated: updatedData,
      });
    });

    it("Deve retornar 404 se nao encontrar o funcionario", async () => {
      req.body = {};
      req.params = { id: "123" };
      jest
        .spyOn(employeeService, "updateEmployeeService")
        .mockRejectedValue({ status: 404, message: "Employee not Found" });

      await updateEmployeeController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Employee not Found" });
    });

    it("Deve retornar 500 para outros erros inesperados", async () => {
      req.body = {};
      req.params = { id: "123" };
      jest
        .spyOn(employeeService, "updateEmployeeService")
        .mockRejectedValue(new Error("Unexpected"));

      await updateEmployeeController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });
  });

  describe("deleteEmployeeController", () => {
    it("Deve apagar um funcionario completamente", async () => {
      req.params = { id: "123" };
      jest
        .spyOn(employeeService, "deleteEmployeeService")
        .mockResolvedValue(undefined);

      await deleteEmployeeController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Employee deleted successfully",
      });
    });

    it("Deve retornar 404 se nao encontrar o funcionario ao tentar apagar", async () => {
      req.params = { id: "123" };
      jest
        .spyOn(employeeService, "deleteEmployeeService")
        .mockRejectedValue({ status: 404, message: "Not found" });

      await deleteEmployeeController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Not found" });
    });

    it("Deve retornar 500 para outros erros inesperados", async () => {
      req.params = { id: "123" };
      jest
        .spyOn(employeeService, "deleteEmployeeService")
        .mockRejectedValue(new Error("Unexpected"));

      await deleteEmployeeController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });
  });

  describe("getAllEmployeesController", () => {
    it("Deve retornar Todos os funcionarios cadastrados", async () => {
      const employees = [{ name: "John" }];
      jest
        .spyOn(employeeService, "getAllEmployeesService")
        .mockResolvedValue(employees as any);

      await getAllEmployeesController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({
        message: "Employees retrieved successfully",
        employees,
      });
    });

    it("Deve retornar 404 com uma Message caso nao exista funcionarios e um array vazio", async () => {
      jest
        .spyOn(employeeService, "getAllEmployeesService")
        .mockResolvedValue([]);

      await getAllEmployeesController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(sendMock).toHaveBeenCalledWith({
        message: "No employees found",
        employees: [],
      });
    });

    it("Deve retornar 500 para outros erros inesperados", async () => {
      jest
        .spyOn(employeeService, "getAllEmployeesService")
        .mockRejectedValue(new Error("Unexpected"));

      await getAllEmployeesController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });
  });
});
