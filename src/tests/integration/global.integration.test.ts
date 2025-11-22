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

// Limpa todas as coleções entre cada teste
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
    // Criar empresa antes de cada teste PATCH
    const companyData = {
      name: "Empresa Teste Integration",
      sector: "TI",
      cnpj: "12345678901234",
      city: "São Paulo",
      state: "SP",
    };

    const res = await request(app).post("/company/create").send(companyData);

    console.log(res.body);

    // Salva ID retornado corretamente
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


