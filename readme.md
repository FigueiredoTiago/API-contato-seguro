
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
* Swagger-Docs
* Jest
* SuperTest

A documentação está disponível através do Swagger.
Acesse aqui todas as rotas da API em tempo real (pode ter atraso Por Inatividade do servidor):
**[https://api-contato-seguro.onrender.com/api-docs](https://api-contato-seguro.onrender.com/api-docs)**

![docs da api com swagger](./docsimg.png)

---

## **Requisitos Técnicos da API**

### **Empresa**

CRUD completo:

1. Criar uma Empresa
2. Listar todas empresas Cadastradas (Opcional)
3. Listar uma empresa Cadastradas pelo CNPJ ou Varias Por Nome
4. Atualizar os dados de uma Empresa.
5. Deletar definitivamente uma Empresa.

### **Funcionário**

CRUD completo:

1. Criar um funcionário - Precisa ser Vinculado a uma empresa.
2. Listar todos os funcionários de uma empresa
3. Atualizar os dados de um funcionário
4. Deletar definitivamente um funcionário

---

## **Modelo do Banco de Dados Company 1 -------- N Employee**

![Diagrama do dataBase](./tabeladobd.png)

---

## **Ambiente de Produção**

O deploy da API foi feito na plataforma **Render** Bem como seu Banco de Dados no **MongoDB Atlas**.

- Rota principal da API:
  **[https://api-contato-seguro.onrender.com](https://api-contato-seguro.onrender.com)**

- Documentação (Swagger):
  **[https://api-contato-seguro.onrender.com/api-docs](https://api-contato-seguro.onrender.com/api-docs)**

---

## **Como Executar Este Projeto Localmente?**

### **Requisitos**

- Ter o Node.js e TS instalado
- Ter o Docker instalado

**NÃO É NECESSÁRIO CRIAR NENHUMA VARIÁVEL DE AMBIENTE — já deixei tudo pronto para uso. CLONE AND PLAY.**

Faça o clone deste repositório em sua máquina local.

### **Execução Local (via Docker-Compose)**

O projeto deve ser executado localmente com Docker **apenas** desta maneira:

1. Acesse a pasta raiz do projeto no terminal.
2. Certifique-se de que o Docker está funcionando corretamente.
3. Execute o comando:

```bash
npm install

```

logo depois:

```bash
docker compose --profile dev up --build

```

Esse comando baixará as imagens necessárias do Node e do MongoDB, pois **a aplicação local usa o banco de dados criado pelo Docker**.

Se tentar rodar o script de DEV direto no terminal, a API até sobe, porém o banco **não estará disponível**, já que ele é criado pelo Docker para o ambiente de desenvolvimento local.

Logo em Seguida sera diponibilizado em seu terminal as seguintes URLs: http://localhost:5000 URL DA API && http://localhost:5000/api-docs URL DO SWAGGER DOCS

A mensagem **MongoDB conectado com sucesso!** Indica que a API se conectou ao BD com sucesso!

---

## **Deseja Rodar a API Fora do Docker? Temos duas maneiras:**

### **Passo 1**

No arquivo `.env` disponível na raiz do projeto, **comente** esta URL:

```
#MONGO_URI=mongodb://mongo:27017/contatoseguro

```

### **Passo 2**

Logo abaixo, existe outra variável parecida ESCRITA (PROD):

```
#MONGO_URI=mongodb+srv://<username>:<password>@contato-seguro-data-bas...

```

Ela estará comentada.
**Descomente ela.**
Assim, você estará utilizando o banco **REAL**, criado no MongoDB Atlas (produção).

### **Passo 3**

Agora é só rodar o comando:

```bash
npm run dev

```

A API iniciará localmente, **porém usando o banco REAL de produção**.
Fique tranquilo, foi criado apenas para este teste, use a vontade, Lembre-se que pode ter atraso, pois usa um BD FREE.

---

---

Mas ainda sim quer **usar um BD Local**, **deseja usar apenas o Docker para Gerar o BD**? Simples rode esse comando que vai apenas Rodar o Banco de Dados no Docker, mas antes va na raiz do projeto ate o arquivo **.ENV**, e Descomente a URI que la esta indicando para rodar a api fora do Docker!!
depois execulte:

```bash

docker compose --profile dev up -d mongo

```

Depois que o container com o mongo estiver funcionando, **Inicie o servidor com**:

```bash

npm run dev

```

API Pronta pra usar!

---

---

## **TESTANDO NOSSA API LOCALMENTE - UNITARIOS**

Nossa API foi configurada usando **Jest** para executar alguns testes que estão disponíveis no caminho `src/tests/unit/...`.

Os testes unitários são responsáveis por testar **todos os Middlewares, Controllers e Services** presentes na nossa aplicação.
Ao executar o seguinte comando:

```bash
npm run test:unit
```

você verá em seu terminal as informações dos testes Unitarios aplicados.
Todos os testes serão executados juntos, de uma só vez, e **não é necessário** estar com o servidor rodando para isso.

Os testes unitários **não fazem nenhum tipo de alteração real no banco de dados**, apenas simulam os dados necessários.

![Saída de Exemplo dos Testes Unitários](./casetest.png)

---

## **TESTES DE INTEGRATION**

Temos também **testes de integração** que estão configurados aqui e no GitHub Actions(Desativei por enquanto).
Para rodá-los localmente, pare o docker caso esteja em uso, utilize o comando para subir apenas o BD pelo docker esse comando abaixo:

```bash

docker compose --profile dev up -d mongo

```

Logo em seguida execulte os testes com o comando abaixo, **não é necessário** estar com o servidor rodando!!! **APENAS O BD PELO DOCKER** deve estar sendo usado
caso contrario vai falhar!

```bash

npm run test:int

```

Isso vai executar todos os testes de integração, e você verá uma saída parecida com a dos testes unitários no console.

Esses testes usam um **banco de dados específico para testes**, então certifique-se de que o banco está rodando e de que a variável **MONGO_URI** está configurada corretamente no arquivo **.env.test**, localizado na raiz do nosso projeto.

Ao finalizar os testes a resposta esperada no terminal semelhante a essa abaixo:

![Saída de Exemplo dos Testes de Integration](./integrationtst.png)

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

### **Produção (com transações) – Banco REAL**

Garante **consistência total** entre Empresa e Funcionário.

- Se falhar a criação do funcionário → desfaz a empresa
- Se falhar a criação da empresa → nada é salvo
- Banco sempre íntegro

### **Desenvolvimento Local (sem transações) – Banco DOCKER**

Se ocorrer um erro no meio do processo, pode gerar dados quebrados:

- Empresa criada X
- Funcionário não criado X
- Banco inconsistente X

---

## **Regras da Nossa API**

- O Funcionário só pode ser criado se existir uma empresa cadastrada previamente.
- A senha do Funcionário é salva no banco através de um **hash** para garantir segurança.
- Sempre que um Funcionário é criado, editado ou visualizado, **a senha nunca é retornada** — mas pode ser alterada se necessário.

---

### Como a API lida com os dados

A API usa **Zod** para validar tudo que entra: body, params e query.
Antes de qualquer requisição chegar nos controllers ou services, ela passa por middlewares que:

- checam se os dados estão no formato certo
- validam IDs e tipos
- convertem valores (como datas)
- bloqueiam qualquer coisa fora do padrão

Com isso, quando os dados chegam no controller/service, eles **já estão limpos, validados e tipados**, então não precisa ficar repetindo validação em todo lugar.

Essa arquitetura deixa o código mais organizado, seguro e previsível — e o Zod ainda gera os tipos automaticamente, então tudo flui bem com TypeScript.

## **Fluxo Geral**

![Diagrama do Fluxo](./fluxoapi.png)


## "A felicidade de se trabalhar com o que gosta, é o principal ponto de partida para o sucesso na vida!" Criado com Muito ♡ por Tiago Figueiredo.

---
