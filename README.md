# [ Trybesmith - Lucas Job Viana ] 

Olá, este repósitorio é para armazenar o projeto trybesmith, projeto de avaliação do módulo Back-End da <a href="https://www.betrybe.com/formacao" target="_blank"><img src="https://theme.zdassets.com/theme_assets/9633455/ecf228e8c15da1a8bd07f574e675a0ac59330968.png" align="center" width="100px"></a>

## Oque é e como funciona ?

O projeto consiste em uma api-rest em typescript, com seus respectivos testes unitários e de integração, para gerenciamento de aquisições de produtos.

Foi desenvolvido para rodar em containers docker. Ao buildar/executar o docker-compose.yml na raiz do projeto, será criado dois containers sem nome, utilizando as imagens transactions-api:8.3 e mysql:8.0.32. O banco mysql será criado com o nome transactions_api, com usuário root, porta 3306 e senha: password atraves do sequelize do backend.
Ao executar os containers o banco será criado sem nenhum dado, para popular as tabelas do banco para teste basta rodar o comando npm run db:reset (na raiz do projeto) com os containers rodando. 
As rotas da api estarão acessiveis atraves de http://localhost/3001.

## Quais tecnologias foram utilizadas ? 

### Back-End
  - Node: [Typescript](https://www.typescriptlang.org/), [Express](https://expressjs.com/pt-br/), [Sequelize](https://sequelize.org/), [JSON Web Token](https://jwt.io/), [Bcrypt](https://www.npmjs.com/package/bcrypt).
  - Testes: [Chai](https://www.chaijs.com/), [Sinon](https://sinonjs.org/) e [Mocha](https://mochajs.org/).
  - Banco de dados: [Mysql](https://www.mysql.com/).
  - [Docker](https://www.docker.com/)

## Tem algum pré-requisito para acessar o projeto ?

- Navegador de internet.
- Docker e docker-compose intalados na máquina.

## Como posso rodar esse projeto na minha máquina ?

    1. Clone ou fork este repositório.
    2. Navegue até o diretório do projeto: `cd nome-do-projeto`.
    3. Na raiz do projeto execute o comando: docker-compose up --build.
    4. Na raiz do projeto execute o comando: npm run db:reset para popular o banco de dados.
    5. Acesse os endpoints da aplicação atraves do endereço `http://localhost:3001/`.


