export const companyDocs = {
  "/company/create": {
    post: {
      summary: "Cria uma nova empresa",
      tags: ["Companies"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "TF-Script" },
                sector: { type: "string", example: "Development" },
                cnpj: { type: "string", example: "1234567890/0001" },
                city: { type: "string", example: "Natal" },
                state: { type: "string", example: "Rio Grande do Norte" },
              },
              required: ["name", "sector", "cnpj", "city", "state"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Empresa criada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Company created Successfully",
                  },
                  company: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "691f399e1d97b2bc402ede34",
                      },
                      name: { type: "string", example: "TF-Script" },
                      sector: { type: "string", example: "Development" },
                      cnpj: { type: "string", example: "1234567890/0001" },
                      city: { type: "string", example: "Natal" },
                      state: { type: "string", example: "Rio Grande do Norte" },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2025-11-20T15:54:06.106Z",
                      },
                      updatedAt: {
                        type: "string",
                        format: "date-time",
                        example: "2025-11-20T15:54:06.106Z",
                      },
                      __v: { type: "number", example: 0 },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Dados inválidos",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Dados inválidos" },
                  errors: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        path: { type: "string", example: "cnpj..." },
                        message: {
                          type: "string",
                          example: "Invalid CNPJ format",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        409: {
          description: "Erro ao criar empresa (dados já existentes)",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "CNPJ already exists" },
                },
              },
            },
          },
        },
        500: {
          description: "Erro interno",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Internal Server Error" },
                },
              },
            },
          },
        },
      },
    },
  },

  "/company/all": {
    get: {
      summary: "Retorna todas as empresas",
      tags: ["Companies"],
      responses: {
        200: {
          description: "Empresas retornadas com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Companies retrieved successfully",
                  },
                  result: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "691f39831d97b2bc402ede32",
                        },
                        name: { type: "string", example: "TfScript" },
                        sector: {
                          type: "string",
                          example: "Tecnologia da informacao",
                        },
                        cnpj: { type: "string", example: "65675788756/0001" },
                        city: { type: "string", example: "Natal" },
                        state: {
                          type: "string",
                          example: "Rio Grande do Norte",
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time",
                          example: "2025-11-20T15:53:39.980Z",
                        },
                        updatedAt: {
                          type: "string",
                          format: "date-time",
                          example: "2025-11-20T15:53:39.980Z",
                        },
                        __v: { type: "number", example: 0 },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/company/info": {
    get: {
      summary: "Busca empresas por CNPJ ou nome",
      tags: ["Companies"],
      parameters: [
        {
          name: "cnpj",
          in: "query",
          description: "CNPJ da empresa para busca",
          required: false,
          schema: { type: "string", example: "65675788756/0001" },
        },
        {
          name: "name",
          in: "query",
          description: "Nome da empresa para busca",
          required: false,
          schema: { type: "string", example: "TfScript" },
        },
      ],
      responses: {
        200: {
          description: "Empresas encontradas com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  companies: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "691f39831d97b2bc402ede32",
                        },
                        name: { type: "string", example: "TfScript" },
                        sector: {
                          type: "string",
                          example: "Tecnologia da informacao",
                        },
                        cnpj: { type: "string", example: "65675788756/0001" },
                        city: { type: "string", example: "Natal" },
                        state: {
                          type: "string",
                          example: "Rio Grande do Norte",
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time",
                          example: "2025-11-20T15:53:39.980Z",
                        },
                        updatedAt: {
                          type: "string",
                          format: "date-time",
                          example: "2025-11-20T15:53:39.980Z",
                        },
                        __v: { type: "number", example: 0 },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Nenhuma empresa encontrada",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "No companies found" },
                },
              },
            },
          },
        },
      },
    },
  },
};
