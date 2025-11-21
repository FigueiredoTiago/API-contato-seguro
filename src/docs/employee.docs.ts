export const employeeDocs = {
  "/employee/create": {
    post: {
      summary: "Cria um novo funcionário vinculado a uma empresa já existente",
      tags: ["Employee"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Tiago Figueiredo" },
                email: {
                  type: "string",
                  example: "tiagodeveloper@example.com",
                },
                role: { type: "string", example: "Web Developer" },
                status: { type: "string", example: "active" },
                createdAtDate: {
                  type: "string",
                  format: "date-time",
                  example: "2025-11-20T08:00:00.000Z",
                },
                password: { type: "string", example: "SenhaSegura1236@!" },
                companyId: {
                  type: "string",
                  example: "691f399e1d97b2bc402ede34",
                },
              },
              required: [
                "name",
                "email",
                "role",
                "status",
                "createdAtDate",
                "password",
                "companyId",
              ],
            },
          },
        },
      },
      responses: {
        201: {
          description: "Funcionário criado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Employee created successfully",
                  },
                  employee: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "69205d8e1df6a777d8b6b8d7",
                      },
                      name: {
                        type: "string",
                        example: "Tiago Figueiredo",
                      },
                      email: {
                        type: "string",
                        example: "tiagodeveloper@example.com",
                      },
                      role: {
                        type: "string",
                        example: "Web Developer",
                      },
                      status: {
                        type: "string",
                        example: "active",
                      },
                      createdAtDate: {
                        type: "string",
                        format: "date-time",
                        example: "2025-11-20T08:00:00.000Z",
                      },
                      terminationDate: {
                        type: ["string", "null"],
                        example: null,
                      },
                      password: {
                        type: "string",
                        example: "$2b$10$pvWR8... (hash)",
                      },
                      companyId: {
                        type: "string",
                        example: "691f399e1d97b2bc402ede34",
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2025-11-21T12:39:42.626Z",
                      },
                      updatedAt: {
                        type: "string",
                        format: "date-time",
                        example: "2025-11-21T12:39:42.626Z",
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
                        path: { type: "string", example: "email" },
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

        404: {
          description: "Empresa informada não encontrada",
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

        409: {
          description: "Email já cadastrado para outro funcionário",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example:
                      "Employee already exists in this company OU Employee already registered in another company",
                  },
                },
              },
            },
          },
        },

        500: {
          description: "Erro interno ao criar funcionário",
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
  "/employee/{id}": {
    patch: {
      summary: "Edita um funcionário já existente",
      tags: ["Employee"],
      description:
        "Atualiza os dados de um Funcionario. Nenhum campo é obrigatório, mas ao menos um deve ser enviado.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID do funcionário a ser atualizado",
          schema: {
            type: "string",
            example: "691f5e557bf04c819157da88",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              description:
                "Ao menos um campo deve ser enviado para atualização",
              properties: {
                name: { type: "string", example: "Tiago Figueiredo Editado" },
                email: {
                  type: "string",
                  example: "tiagodeveloper@example.com",
                },
                role: { type: "string", example: "Web Developer" },
                status: { type: "string", example: "active" },
                createdAtDate: {
                  type: "string",
                  format: "date-time",
                  example: "2025-11-20T08:00:00.000Z",
                },
                password: { type: "string", example: "NovaSenhaSegura123@!" },
                companyId: {
                  type: "string",
                  example: "691f399e1d97b2bc402ede34",
                },
              },
            },
          },
        },
      },

      responses: {
        200: {
          description: "Funcionário atualizado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Employee updated Successfully",
                  },
                  updated: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "691f5e557bf04c819157da88",
                      },
                      name: {
                        type: "string",
                        example: "Mascarenho Filho Editado",
                      },
                      email: {
                        type: "string",
                        example: "jotajota@example.com",
                      },
                      role: {
                        type: "string",
                        example: "Programador",
                      },
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
                      password: {
                        type: "string",
                        example:
                          "$2b$10$VPKqToriorHLsvvo0idlcO7N4qs0y... (hash)",
                      },
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
                        example: "2025-11-21T12:52:02.221Z",
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
                  message: {
                    type: "string",
                    example:
                      "Pelo menos um campo deve ser preenchido para editar",
                  },
                },
              },
            },
          },
        },

        404: {
          description: "Funcionário ou empresa não encontrada",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Employee not Found",
                  },
                },
              },
            },
          },
        },

        500: {
          description: "Erro interno ao atualizar funcionário",
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
  "/employee/all": {
    get: {
      summary: "Lista todos os funcionários cadastrados no sistema.",
      description:
        "Esta rota retorna todos os funcionários registrados. É uma rota bônus apenas para visualização geral. Para buscar funcionários específicos por empresa, utilize as rotas relacionadas à Company.",
      tags: ["Employee"],

      responses: {
        200: {
          description: "Funcionários listados com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Employees found",
                  },
                  employees: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "69205d8e1df6a777d8b6b8d7",
                        },
                        name: {
                          type: "string",
                          example: "Tiago Figueiredo",
                        },
                        email: {
                          type: "string",
                          example: "tiago@example.com",
                        },
                        role: {
                          type: "string",
                          example: "web developer",
                        },
                        status: {
                          type: "string",
                          example: "active",
                        },
                        createdAtDate: {
                          type: "string",
                          example: "2025-11-20T08:00:00.000Z",
                        },
                        terminationDate: {
                          type: "string",
                          nullable: true,
                          example: null,
                        },
                        password: {
                          type: "string",
                          example: "***********",
                        },
                        companyId: {
                          type: "string",
                          example: "691f399e1d97b2bc402ede34",
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time",
                          example: "2025-11-21T12:39:42.626Z",
                        },
                        updatedAt: {
                          type: "string",
                          format: "date-time",
                          example: "2025-11-21T12:39:42.626Z",
                        },
                        __v: {
                          type: "number",
                          example: 0,
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
          description: "Nenhum funcionário encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "No employees found",
                  },
                  employees: {
                    type: "array",
                    example: [],
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Erro interno ao Buscar funcionários",
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
  "/employee/delete/{id}": {
    delete: {
      summary: "Deleta um funcionário pelo ID.",
      description:
        "Remove permanentemente um funcionário do sistema. É necessário fornecer um ID válido.",
      tags: ["Employee"],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
            minLength: 24,
            maxLength: 24,
            example: "691f5233ef8ffb11e3bd5353",
          },
          description: "ID do funcionário a ser deletado",
        },
      ],

      responses: {
        200: {
          description: "Funcionário deletado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Employee deleted successfully",
                  },
                },
              },
            },
          },
        },

        400: {
          description: "ID inválido — deve ter 24 caracteres",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Parâmetros inválidos",
                  },
                  errors: {
                    type: "array",
                    example: [
                      {
                        path: ["id"],
                        message: "O ID must be 24 characters long",
                      },
                    ],
                  },
                },
              },
            },
          },
        },

        404: {
          description: "Funcionário não encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Employee not Found",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Erro interno Apagar funcionário",
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
};
