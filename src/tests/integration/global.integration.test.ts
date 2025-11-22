// TODOS OS TESTES DE INTEGRACAO SERA EXECULTADOS AQUI APENAS PARA AGILIZAR

import request from "supertest";
import mongoose from "mongoose";
import app from "../../index";

// Conecta ao banco antes dos testes
beforeAll(async () => {
  try {
    console.log("Conectando ao Mongo:", process.env.MONGO_URI);
    console.log("MONGO_URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 5000, // força erro rápido
    });
    console.log("MongoDB conectado 👍");
  } catch (err) {
    console.error("Erro ao conectar no Mongo:", err);
  }
});

// Limpa todas as coleções entre cada teste evita duplicidade
afterEach(async () => {
  const db = mongoose.connection.db;
  const collections = db ? await db.collections() : [];
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

// Fecha a conexão depois de tudo
afterAll(async () => {
  await mongoose.connection.close();
});

//Criacao da empresa

describe("POST /company/create - Integration Test", () => {
  it("Deve criar uma empresa com sucesso e retornar 201", async () => {
    const companyData = {
      name: "Empresa Teste Integration",
      sector: "TI",
      cnpj: "12345678901234",
      city: "São Paulo",
      state: "SP",
    };

    const res = await request(app).post("/company/create").send(companyData);

    expect(res.status).toBe(201);
    expect(res.body.company).toHaveProperty("_id");
    expect(res.body.company.name).toBe(companyData.name);
    expect(res.body.company.cnpj).toBe(companyData.cnpj);
  });

  it("Deve retornar 400 ao enviar dados inválidos", async () => {
    const invalidData = {
      name: "",
      sector: "",
      cnpj: "123",
      city: "",
      state: "",
    };

    const res = await request(app).post("/company/create").send(invalidData);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(Array.isArray(res.body.errors)).toBe(true);
  });
});

//editar empresa
describe("PATCH /company/:id - Integration Test", () => {
  let companyId: string;

  beforeEach(async () => {
    const companyData = {
      name: "Empresa Teste Integration",
      sector: "TI",
      cnpj: "12345678901234",
      city: "São Paulo",
      state: "SP",
    };

    const res = await request(app).post("/company/create").send(companyData);

    console.log(res.body);

    companyId = res.body.company?._id;
  });

  it("Deve atualizar a empresa com sucesso e retornar 200", async () => {
    const updatedData = {
      name: "Empresa Atualizada",
      sector: "Tecnologia",
    };

    const res = await request(app)
      .patch(`/company/${companyId}`)
      .send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("updated");
    expect(res.body.updated).toBeDefined();
    expect(res.body.updated._id).toBe(companyId);
    expect(res.body.updated.name).toBe(updatedData.name);
  });

  it("Deve retornar 400 ao enviar body vazio", async () => {
    const res = await request(app).patch(`/company/${companyId}`).send({});

    expect(res.status).toBe(400);
  });

  it("Deve retornar 404 ao enviar ID que não existe", async () => {
    const fakeId = "123456789012345678901234"; // formato válido, mas inexistente

    const res = await request(app).patch(`/company/${fakeId}`).send({
      name: "Teste Falho",
    });

    expect(res.status).toBe(404);
  });
});

//buscar empresa
describe("GET /company/info - Integration Test", () => {
  let companyData: any;

  beforeEach(async () => {
    companyData = {
      name: "Empresa Info Teste",
      sector: "TI",
      cnpj: "12345678000199",
      city: "Rio de Janeiro",
      state: "RJ",
    };

    const res = await request(app).post("/company/create").send(companyData);

    expect(res.status).toBe(201);
    expect(res.body.company).toBeDefined();

    companyData._id = res.body.company._id;
  });

  it("Deve retornar 200 ao buscar empresa por name", async () => {
    const res = await request(app).get(
      `/company/info?name=${encodeURIComponent(companyData.name)}`
    );

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("companies");
    expect(Array.isArray(res.body.companies)).toBe(true);
    expect(res.body.companies.length).toBeGreaterThan(0);

    const found = res.body.companies[0];
    expect(found._id).toBe(companyData._id);
    expect(found.name).toBe(companyData.name);
  });

  it("Deve retornar 200 ao buscar empresa por cnpj", async () => {
    const res = await request(app).get(
      `/company/info?cnpj=${companyData.cnpj}`
    );

    expect(res.status).toBe(200);
    expect(res.body.companies).toBeDefined();
    expect(res.body.companies.length).toBe(1);

    expect(res.body.companies[0].cnpj).toBe(companyData.cnpj);
  });

  it("Deve retornar 400 quando nenhuma query for enviada", async () => {
    const res = await request(app).get(`/company/info`);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("Deve retornar 404 quando empresa não for encontrada", async () => {
    const res = await request(app).get(
      `/company/info?name=EmpresaQueNaoExiste`
    );

    expect(res.status).toBe(404);
  });
});

//Apagar uma empresa
describe("DELETE /company/delete/:id - Integration Test", () => {
  let companyId: string;

  beforeEach(async () => {
    const companyData = {
      name: "Empresa Teste Delete",
      sector: "TI",
      cnpj: "98765432109876",
      city: "São Paulo",
      state: "SP",
    };

    const res = await request(app).post("/company/create").send(companyData);

    companyId = res.body.company?._id;
  });

  it("Deve deletar a empresa com sucesso e retornar 200", async () => {
    const res = await request(app).delete(`/company/delete/${companyId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(
      "message",
      "Company and employees deleted successfully"
    );
  });

  it("Deve retornar 404 ao tentar deletar ID que não existe", async () => {
    const fakeId = "123456789012345678901234";

    const res = await request(app).delete(`/company/delete/${fakeId}`);

    expect(res.status).toBe(404);
    expect(res.body?.message).toBe("Company not Found");
  });

  it("Deve retornar 400 ao enviar ID inválido", async () => {
    const invalidId = "123";

    const res = await request(app).delete(`/company/delete/${invalidId}`);

    expect(res.status).toBe(400);
  });
});

//criar um funcionario
describe("POST /employee/create - Integration Test", () => {
  let companyId: string;

  beforeEach(async () => {
    const companyData = {
      name: "TF-SCRIPT",
      sector: "TI",
      cnpj: "123456789/0001",
      city: "São Paulo",
      state: "SP",
    };

    const res = await request(app).post("/company/create").send(companyData);
    companyId = res.body.company?._id;
  });

  it("Deve criar um funcionário com sucesso e retornar 200", async () => {
    const employeeData = {
      name: "Tiago Figueiredo",
      email: "testeteste@example.com",
      role: "web developer",
      status: "active",
      createdAtDate: "2025-11-20T08:00:00.000Z",
      terminationDate: null,
      password: "SenhaSegura1236@!",
      companyId,
    };

    const res = await request(app).post("/employee/create").send(employeeData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Employee created successfully");
    expect(res.body).toHaveProperty("employee");
    expect(res.body.employee).toHaveProperty("_id");
    expect(res.body.employee.name).toBe(employeeData.name);
    expect(res.body.employee.email).toBe(employeeData.email);
    expect(res.body.employee.companyId).toBe(companyId);
  });

  it("Deve retornar 400 ao enviar dados inválidos", async () => {
    const res = await request(app).post("/employee/create").send({
      name: "", // inválido
      email: "emailinvalido",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});

//editar um funcionario
describe("PATCH /employee/:id - Integration Test", () => {
  let companyId: string;
  let employeeId: string;

  beforeEach(async () => {
    const companyData = {
      name: "TF-SCRIPT",
      sector: "TI",
      cnpj: "123456789/0001",
      city: "São Paulo",
      state: "SP",
    };

    const companyRes = await request(app)
      .post("/company/create")
      .send(companyData);

    companyId = companyRes.body.company?._id;

    const employeeData = {
      name: "Joao Figueiredo",
      email: "testeteste@example.com",
      role: "web developer",
      status: "active",
      createdAtDate: "2025-11-20T08:00:00.000Z",
      terminationDate: null,
      password: "SenhaSegura1236@!",
      companyId,
    };

    const employeeRes = await request(app)
      .post("/employee/create")
      .send(employeeData);

    employeeId = employeeRes.body.employee?._id;
  });

  it("Deve atualizar o funcionário com sucesso e retornar 200", async () => {
    const updatedData = {
      name: "Romario filho junior",
      role: "Desenvolvedor",
    };

    const res = await request(app)
      .patch(`/employee/${employeeId}`)
      .send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Employee updated Successfully");
    expect(res.body).toHaveProperty("updated");
    expect(res.body.updated._id).toBe(employeeId);
    expect(res.body.updated.name).toBe(updatedData.name);
    expect(res.body.updated.role).toBe(updatedData.role);
  });

  it("Deve retornar 404 ao tentar atualizar ID que não existe", async () => {
    const fakeId = "123456789012345678901234";
    const res = await request(app).patch(`/employee/${fakeId}`).send({
      name: "Teste Falho",
    });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Employee not Found");
  });

  it("Deve retornar 400 ao enviar body vazio", async () => {
    const res = await request(app).patch(`/employee/${employeeId}`).send({});
    expect(res.status).toBe(400);
  });
});

//Pegar os funcionarios de uma empresa
describe("GET /company/info/:id - Integration Test", () => {
  let companyId: string;
  let employeeId: string;

  beforeEach(async () => {
    const companyData = {
      name: "Tech Solutions",
      sector: "TI",
      cnpj: "994993494399/0001",
      city: "São Paulo",
      state: "SP",
    };

    const companyRes = await request(app)
      .post("/company/create")
      .send(companyData);
    companyId = companyRes.body.company?._id;

    const employeeData = {
      name: "Romario filho junior",
      email: "tiagocomgh@email.com",
      role: "Desenvolvedor",
      status: "active",
      createdAtDate: "2025-11-20T08:00:00.000Z",
      terminationDate: null,
      password: "SenhaSegura1236@!",
      companyId,
    };

    const employeeRes = await request(app)
      .post("/employee/create")
      .send(employeeData);

    employeeId = employeeRes.body.employee?._id;
  });

  it("Deve retornar a empresa e seus funcionários corretamente", async () => {
    const res = await request(app).get(`/company/info/${companyId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("company");
    expect(res.body).toHaveProperty("employees");
    expect(res.body.company._id).toBe(companyId);
    expect(res.body.employees).toHaveLength(1);
    expect(res.body.employees[0]._id).toBe(employeeId);
  });

  it("Deve retornar 404 quando a empresa não existir", async () => {
    const fakeId = "123456789012345678901234";
    const res = await request(app).get(`/company/info/${fakeId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Company not Found");
  });
});

//deletar UM funcionario por ID dele
describe("DELETE /employee/delete/:id - Integration Test", () => {
  let companyId: string;
  let employeeId: string;

  beforeEach(async () => {
    const companyData = {
      name: "Tech Solutions",
      sector: "TI",
      cnpj: "994993494399/0001",
      city: "São Paulo",
      state: "SP",
    };

    const companyRes = await request(app)
      .post("/company/create")
      .send(companyData);
    companyId = companyRes.body.company?._id;

    const employeeData = {
      name: "Romario filho junior",
      email: "tiagocomgh@email.com",
      role: "Desenvolvedor",
      status: "active",
      createdAtDate: "2025-11-20T08:00:00.000Z",
      terminationDate: null,
      password: "SenhaSegura1236@!",
      companyId,
    };

    const employeeRes = await request(app)
      .post("/employee/create")
      .send(employeeData);
    employeeId = employeeRes.body.employee?._id;
  });

  it("Deve deletar o funcionário com sucesso e retornar 200", async () => {
    const res = await request(app).delete(`/employee/delete/${employeeId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Employee deleted successfully");
  });

  it("Deve retornar 404 ao tentar deletar um funcionário que não existe", async () => {
    const fakeId = "123456789012345678901234";
    const res = await request(app).delete(`/employee/delete/${fakeId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Employee not Found");
  });
});
