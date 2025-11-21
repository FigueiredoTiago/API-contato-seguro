---

# **Desafio Técnico de Tiago de Figueiredo – Para a Vaga de Desenvolvedor Web Backend Júnior**

## **Especificações da Nossa API REST**

### **Tecnologias Utilizadas**

* Node
* TypeScript
* Express
* MongoDB
* Mongoose
* Zod
* Bcrypt
* Docker

A documentação está disponível através do Swagger.
Acesse aqui todas as rotas da API em tempo real (pode ter atraso Por Inatividade do servidor):
**[https://api-contato-seguro.onrender.com/api-docs](https://api-contato-seguro.onrender.com/api-docs)**

---

## **Requisitos Técnicos da API**

### **Empresa**

CRUD completo

### **Funcionário**

CRUD completo, incluindo:

1. Criar um funcionário
2. Listar todos os funcionários de uma empresa
3. Atualizar os dados de um funcionário
4. Deletar definitivamente um funcionário

---

## **Modelo do Banco de Dados**

_— Link para imagem das tabelas…_

---

## **Ambiente de Produção**

O deploy da API foi feito na plataforma **Render**.

- Rota principal da API:
  **[https://api-contato-seguro.onrender.com](https://api-contato-seguro.onrender.com)**

- Documentação (Swagger):
  **[https://api-contato-seguro.onrender.com/api-docs](https://api-contato-seguro.onrender.com/api-docs)**

---

## **Como Executar Este Projeto Localmente?**

### **Requisitos**

- Ter o Node.js instalado
- Ter o Docker instalado

**NÃO É NECESSÁRIO CRIAR NENHUMA VARIÁVEL DE AMBIENTE — já deixei tudo pronto para uso. CLONE AND PLAY.**

Faça o clone deste repositório em sua máquina local.

### **Execução Local (Somente via Docker)**

O projeto deve ser executado localmente **apenas** desta maneira:

1. Acesse a pasta raiz do projeto no terminal.
2. Certifique-se de que o Docker está funcionando corretamente.
3. Execute o comando:

```
docker compose --profile dev up --build
```

Esse comando baixará as imagens necessárias do Node e do MongoDB, pois **a aplicação local usa o banco de dados criado pelo Docker**.

Se tentar rodar o script de DEV direto no terminal, a API até sobe, porém o banco **não estará disponível**, já que ele é criado pelo Docker para o ambiente de desenvolvimento local.

Logo em Seguida sera te diponibilizado em seu terminal as seguintes URLs: http://localhost:5000 URL DA API || http://localhost:5000/api-docs URL DO SWAGGER DOCS

---

## **Deseja Rodar a API Fora do Docker?**

### **Passo 1**

No arquivo `.env` disponível na raiz do projeto, **comente** esta URL:

```
#MONGO_URI=mongodb://mongo:27017/contatoseguro
```

### **Passo 2**

Logo abaixo, existe outra variável parecida:

```
#MONGO_URI=mongodb+srv://<username>:<password>@contato-seguro-data-bas...
```

Ela estará comentada.
**Descomente essa.**
Assim, você estará utilizando o banco **REAL**, criado no MongoDB Atlas (produção).

### **Passo 3**

Agora é só rodar o comando:

```
npm run dev
```

A API iniciará localmente, **porém usando o banco REAL de produção**.
Fique tranquilo, foi criado apenas para este teste.

---

## **Particularidades do Projeto**

No arquivo:

```
src/services/company.services.ts
```

Você encontrará **dois services com o mesmo nome**:
`createCompanyWithEmployeeService`

- O service de **DESENVOLVIMENTO** está **descomentado**.
- O de **PRODUÇÃO** está comentado.

Isso porque você, avaliador, muito provavelmente irá testar tudo localmente, então deixei o de DEV habilitado.

### **Mas qual é a diferença entre o service de DEV e o de PROD?**

Simples:

O service de produção usa **transações do MongoDB** (`session`, `startTransaction`), recurso que **só funciona em ambientes replicados**, ou seja:

- Replica Set
- Cluster MongoDB Atlas — _nosso caso_

### **Se você deixar o de produção descomentado e tentar rodar com o banco do Docker local, NÃO VAI FUNCIONAR!**

---

## **Diferenças Explicadas de Forma Simples**

### ✔ **Produção (com transações) – Banco REAL**

Garante **consistência total** entre Empresa e Funcionário.

- Se falhar a criação do funcionário → desfaz a empresa
- Se falhar a criação da empresa → nada é salvo
- Banco sempre íntegro

### ✔ **Desenvolvimento Local (sem transações) – Banco DOCKER**

Se ocorrer um erro no meio do processo, pode gerar dados quebrados:

- Empresa criada ❌
- Funcionário não criado ❌
- Banco inconsistente ❌

---

## **Regras da Nossa API**

- O Funcionário só pode ser criado se existir uma empresa cadastrada previamente.
- A senha do Funcionário é salva no banco através de um **hash** para garantir segurança.
- Sempre que um Funcionário é criado, editado ou visualizado, **a senha nunca é retornada** — mas pode ser alterada se necessário.

---
