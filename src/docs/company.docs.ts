export const companyDocs = {
  "/company/create": {
    post: {
      summary: "Cria uma nova empresa",
      tags: ["Company"],
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
          description: "Dados inválidos (erro de validação com Zod)",
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

  "/company/create-with-employee": {
    post: {
      summary: "Cria uma nova empresa e o primeiro funcionário",
      tags: ["Company"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                company: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Tech Solutions" },
                    sector: { type: "string", example: "TI" },
                    cnpj: { type: "string", example: "1234551890123dasd4" },
                    city: { type: "string", example: "São Paulo" },
                    state: { type: "string", example: "SP" },
                  },
                  required: ["name", "sector", "cnpj", "city", "state"],
                },
                employee: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Tiago Silva" },
                    email: { type: "string", example: "tiagoComT@email.com" },
                    role: { type: "string", example: "admin" },
                    status: { type: "string", example: "active" },
                    password: { type: "string", example: "SenhaSegura123!" },
                  },
                  required: ["name", "email", "role", "status", "password"],
                },
              },
              required: ["company", "employee"],
            },
          },
        },
      },

      responses: {
        201: {
          description: "Empresa e funcionário criados com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Company and first employee created successfully",
                  },
                  company: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "691f399e1d97b2bc402ede34",
                      },
                      name: { type: "string", example: "Tech Solutions" },
                      sector: { type: "string", example: "TI" },
                      cnpj: { type: "string", example: "1234551890123dasd4" },
                      city: { type: "string", example: "São Paulo" },
                      state: { type: "string", example: "SP" },
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
                  employee: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "781f399e1d97b2bc402ede12",
                      },
                      name: { type: "string", example: "Tiago Silva" },
                      email: { type: "string", example: "tiagoComT@email.com" },
                      role: { type: "string", example: "admin" },
                      status: { type: "string", example: "active" },
                      createdAtDate: {
                        type: "string",
                        format: "date-time",
                        example: "2025-11-20T08:00:00.000Z",
                      },
                      companyId: {
                        type: "string",
                        example: "691f399e1d97b2bc402ede34",
                      },
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
          description: "Dados inválidos (erro de validação com Zod)",
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
                        path: { type: "string", example: "employee.email" },
                        message: {
                          type: "string",
                          example: "Invalid email format",
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
          description: "CNPJ já existente",
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

  "/company/{id}": {
    patch: {
      summary: "Edita uma empresa existente",
      tags: ["Company"],
      description:
        "Atualiza os dados de uma empresa. Nenhum campo é obrigatório, mas ao menos um deve ser enviado.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", example: "691f399e1d97b2bc402ede34" },
          description:
            "ID da empresa a ser atualizada (deve ter 24 caracteres).",
        },
      ],
      requestBody: {
        required: false,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Nome a ser Editado" },
                sector: { type: "string", example: "Tecnologia da Educação" },
                cnpj: { type: "string", example: "99999999999/0001" },
                city: { type: "string", example: "Natal" },
                state: { type: "string", example: "Rio Grande do Norte" },
              },
              description: "Pelo menos um campo deve ser enviado.",
            },
          },
        },
      },

      responses: {
        200: {
          description: "Empresa atualizada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Company updated Successfully",
                  },
                  updated: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "691f399e1d97b2bc402ede34",
                      },
                      name: {
                        type: "string",
                        example: "Editada empresa agorinha",
                      },
                      sector: {
                        type: "string",
                        example: "Tecnologia da Educação",
                      },
                      cnpj: { type: "string", example: "99999999999/0001" },
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
                        example: "2025-11-21T11:46:01.815Z",
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
          description:
            "Parâmetros inválidos (ID incorreto ou body vazio, erro de validação com Zod)",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Parâmetros inválidos" },
                  errors: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        path: { type: "string", example: "id" },
                        message: {
                          type: "string",
                          example:
                            "O ID must be 24 characters long OR At least one field must be filled in to edit.",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        404: {
          description: "Empresa não encontrada",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Company not Found" },
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
      tags: ["Company"],
      description:
        "Retorna Todas as empresas cadastradas sem filtro, caso queira ver uma unica empresa apena, usar a rota de busca com query.",
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
                        name: { type: "string", example: "TF-Script" },
                        sector: {
                          type: "string",
                          example: "Development",
                        },
                        cnpj: { type: "string", example: "1234567890/0001" },
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
      summary: "Busca empresa por CNPJ ou mais de uma Por Nome",
      tags: ["Company"],
      parameters: [
        {
          name: "cnpj",
          in: "query",
          description: "CNPJ da empresa para buscar",
          required: false,
          schema: { type: "string", example: "1234567890/0001" },
        },
        {
          name: "name",
          in: "query",
          description: "Nome da empresa para buscar",
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

        400: {
          description: "Erro de validação nos parâmetros da consulta",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "At least CNPJ or name must be provided",
                  },
                  errors: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        path: {
                          type: "string",
                          example: "cnpj,name",
                        },
                        message: {
                          type: "string",
                          example: "At least CNPJ or name must be provided",
                        },
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
                  message: {
                    type: "string",
                    example:
                      "No companies found matching the provided criteria",
                  },
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
                  message: {
                    type: "string",
                    example: "Internal Server Error",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/company/info/{id}": {
    get: {
      summary: "Lista empresa e todos os funcionários vinculados",
      tags: ["Company"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID da empresa",
          schema: { type: "string", example: "691f399e1d97b2bc402ede34" },
        },
      ],
      responses: {
        "200": {
          description: "Empresa e funcionários encontrados com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  company: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "691f399e1d97b2bc402ede34",
                      },
                      name: {
                        type: "string",
                        example: "TF-Script",
                      },
                      sector: {
                        type: "string",
                        example: "Development",
                      },
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
                        example: "2025-11-21T11:46:01.815Z",
                      },
                      __v: { type: "number", example: 0 },
                    },
                  },
                  employees: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "691f5e557bf04c819157da88",
                        },
                        name: { type: "string", example: "Tiago Figueiredo" },
                        email: {
                          type: "string",
                          example: "tiagoComT@example.com",
                        },
                        role: { type: "string", example: "Programador" },
                        status: { type: "string", example: "active" },
                        createdAtDate: {
                          type: "string",
                          format: "date-time",
                          example: "2025-11-20T08:00:00.000Z",
                        },
                        terminationDate: {
                          type: ["string", "null"],
                          example: null,
                        },
                        password: { type: "string", example: "********" },
                        companyId: {
                          type: "string",
                          example: "691f399e1d97b2bc402ede34",
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time",
                          example: "2025-11-20T18:30:45.691Z",
                        },
                        updatedAt: {
                          type: "string",
                          format: "date-time",
                          example: "2025-11-20T18:30:45.691Z",
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

        400: {
          description: "Parâmetros inválidos (ID incorreto ou body vazio)",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Parâmetros inválidos" },
                  errors: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        path: { type: "string", example: "id" },
                        message: {
                          type: "string",
                          example: "O ID must be 24 characters long",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        "404": {
          description: "Empresa não encontrada",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Company not Found",
                  },
                },
              },
            },
          },
        },

        "404-employees": {
          description: "Empresa encontrada, porém sem funcionários vinculados",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "No employees found for this company",
                  },
                },
              },
            },
          },
        },

        "500": {
          description: "Erro interno inesperado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Internal server error",
                  },
                  details: {
                    type: "string",
                    example:
                      "Unexpected error occurred while retrieving company data",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/company/delete/{id}": {
    delete: {
      summary: "Deleta uma empresa pelo ID",
      tags: ["Company"],
      description:
        "Empresa e funcionários nessa Rota vai ser Excluidos Simultaneamente!",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID da empresa a ser deletada",
          schema: { type: "string", example: "691f399e1d97b2bc402ede34" },
        },
      ],
      responses: {
        "200": {
          description: "Empresa deletada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Company deleted successfully",
                  },
                },
              },
            },
          },
        },

        400: {
          description: "Parâmetros inválidos (ID incorreto ou body vazio)",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Parâmetros inválidos" },
                  errors: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        path: { type: "string", example: "id" },
                        message: {
                          type: "string",
                          example: "O ID must be 24 characters long",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        "404": {
          description: "Empresa não encontrada",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Company not Found",
                  },
                },
              },
            },
          },
        },

        "500": {
          description: "Erro interno inesperado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Internal server error",
                  },
                  details: {
                    type: "string",
                    example:
                      "Unexpected error occurred while deleting the company",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
