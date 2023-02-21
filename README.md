# Boas vindas ao repositório do Trybe Futebol Clube!

  Este foi um projeto realizado durante o meu curso na Trybe.

  O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  Foi desenvolvida uma API (utilizando o método `TDD`) e também a integração *- através do docker-compose -* das aplicações para que elas funcionem consumindo um banco de dados.

  O front-end foi desenvolvido pela equipe da Trybe e eu pude construir **um back-end dockerizado utilizando modelagem de dados através do Sequelize**,  respeitando as **regras de negócio** providas no projeto, com uma **API** capaz de ser consumida pelo front-end já provido nesse projeto.

  Nesse projeto, eu aprimorei minhas habilidades de:
  * Utilizar docker;
  * Utilizar os conceito de POO
  * Fazer uso de uma ORM (Sequelize);
  
    ### 👀 Comandos úteis

  - Para **instalar as aplicações (front e back)** é necessário o comando `npm run install:apps` na pasta raiz do projeto;
  - Você pode rodar o avaliador **mostrando as operações que o navegador vai fazer no front-end** durante os testes E2E utilizando o comando `npm run test:browser`;
  - Para **debugar alguns erros do avaliador** (como por exemplo a validação do banco de dados, ou da compilação do TS), onde são *printadas* na tela algumas infos adicionais, é só utilizar o comando `npm run test:debug`;
  - Para **subir ou descer uma aplicação do compose**, deve utilizar `npm run` com os scripts `compose:up`, `compose:down`, ou `compose:up:dev`, `compose:down:dev`;
