import request from "supertest";
import mongoose from "mongoose";
import app from "../../index";

describe("POST /company/create - Integration Test", () => {
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
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe(companyData.name);
    expect(res.body.cnpj).toBe(companyData.cnpj);
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
    expect(res.body).toHaveProperty("error");
  });
});
