import bcrypt from "bcrypt";
import * as employeeService from "../../../services/employee.service";
import { EmployeeModel } from "../../../models/employee.model";
import { CompanyModel } from "../../../models/company.model";

jest.mock("../../../models/employee.model");
jest.mock("../../../models/company.model");
jest.mock("bcrypt");

describe("Employee Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createEmployeeService", () => {
    const validData = {
      name: "Tiago",
      email: "tiago@example.com",
      password: "123456",
      role: "Developer",
      status: "active",
      companyId: "companyId123456789012345678",
    };

    it("deve criar um funcionário com sucesso", async () => {
      (CompanyModel.findById as jest.Mock).mockResolvedValue({
        _id: validData.companyId,
      });
      (EmployeeModel.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
      (EmployeeModel.create as jest.Mock).mockResolvedValue({
        ...validData,
        password: "hashedPassword",
      });

      const result = await employeeService.createEmployeeService(
        validData as any
      );

      expect(CompanyModel.findById).toHaveBeenCalledWith(validData.companyId);
      expect(EmployeeModel.findOne).toHaveBeenCalledTimes(2);
      expect(EmployeeModel.create).toHaveBeenCalledWith({
        ...validData,
        password: "hashedPassword",
        companyId: validData.companyId,
      });
      expect(result.password).toBe("hashedPassword");
    });

    it("deve lançar 404 se a empresa não existir", async () => {
      (CompanyModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(
        employeeService.createEmployeeService(validData as any)
      ).rejects.toEqual({
        status: 404,
        message: "Company not Found",
      });
    });

    it("deve lançar 409 se o funcionário já existir na empresa", async () => {
      (CompanyModel.findById as jest.Mock).mockResolvedValue({
        _id: validData.companyId,
      });
      (EmployeeModel.findOne as jest.Mock).mockResolvedValue({
        email: validData.email,
      });

      await expect(
        employeeService.createEmployeeService(validData as any)
      ).rejects.toEqual({
        status: 409,
        message: "Employee already exists in this company",
      });
    });

    it("deve lançar 409 se o funcionário já existir em outra empresa", async () => {
      (CompanyModel.findById as jest.Mock).mockResolvedValue({
        _id: validData.companyId,
      });
      (EmployeeModel.findOne as jest.Mock)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ email: validData.email });

      await expect(
        employeeService.createEmployeeService(validData as any)
      ).rejects.toEqual({
        status: 409,
        message: "Employee already registered in another company",
      });
    });
  });

  describe("updateEmployeeService", () => {
    const updateData = { name: "Tiago Edited" };
    const employeeId = "employeeId123456789012345678";

    it("deve atualizar o funcionário com sucesso", async () => {
      (EmployeeModel.findById as jest.Mock).mockResolvedValue({
        _id: employeeId,
      });
      (EmployeeModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        _id: employeeId,
        ...updateData,
      });

      const result = await employeeService.updateEmployeeService(
        updateData,
        employeeId
      );

      expect(EmployeeModel.findById).toHaveBeenCalledWith(employeeId);
      expect(EmployeeModel.findByIdAndUpdate).toHaveBeenCalledWith(
        employeeId,
        updateData,
        { new: true, runValidators: true }
      );
      expect(result?.name).toBe(updateData.name);
    });

    it("deve lançar 404 se o funcionário não for encontrado", async () => {
      (EmployeeModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(
        employeeService.updateEmployeeService(updateData, employeeId)
      ).rejects.toEqual({
        status: 404,
        message: "Employee not Found",
      });
    });
  });

  describe("deleteEmployeeService", () => {
    const employeeId = "employeeId123456789012345678";

    it("deve deletar o funcionário com sucesso", async () => {
      (EmployeeModel.findById as jest.Mock).mockResolvedValue({
        _id: employeeId,
      });
      (EmployeeModel.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

      await employeeService.deleteEmployeeService(employeeId);

      expect(EmployeeModel.findById).toHaveBeenCalledWith(employeeId);
      expect(EmployeeModel.findByIdAndDelete).toHaveBeenCalledWith(employeeId);
    });

    it("deve lançar 404 se o funcionário não for encontrado", async () => {
      (EmployeeModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(
        employeeService.deleteEmployeeService(employeeId)
      ).rejects.toEqual({
        status: 404,
        message: "Employee not Found",
      });
    });
  });

  describe("getAllEmployeesService", () => {
    it("deve retornar todos os funcionários", async () => {
      const mockEmployees = [{ name: "Tiago" }, { name: "Maria" }];
      (EmployeeModel.find as jest.Mock).mockReturnValue({
        lean: () => mockEmployees,
      });

      const result = await employeeService.getAllEmployeesService();

      expect(EmployeeModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockEmployees);
    });
  });
});
