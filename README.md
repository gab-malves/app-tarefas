Este é um projeto de um sistema de gestão de tarefas (To-Do List) construído com o stack MERN (MongoDB, Express, React, Node.js).

Funcionalidades

Back-end:

Registo de utilizadores com encriptação de senha.

Autenticação de utilizadores com JWT (JSON Web Tokens).

Criação, Leitura, Atualização e Remoção (CRUD) de tarefas.

Rotas protegidas, garantindo que apenas utilizadores autenticados possam gerir as suas tarefas.

Front-end:

Interface construída em React com Vite.

Gestão de estado de autenticação global com Context API.

Páginas de Login e Dashboard.

Consumo da API para manipular as tarefas em tempo real.

Pré-requisitos

Antes de começar, garanta que tem as seguintes ferramentas instaladas na sua máquina:

Node.js (que já inclui o npm)

Git

Um editor de código, como o VS Code

Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto localmente.

1. Clonar o Repositório

Primeiro, clone este repositório para a sua máquina local:

git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
cd app-tarefas-fullstack


2. Configurar o Back-end

O back-end é o servidor que irá ligar-se à base de dados e fornecer os dados para a aplicação.

# Navegue para a pasta do back-end
cd backend

# Instale as dependências
npm install

# Crie um ficheiro .env para as variáveis de ambiente
# (copie o conteúdo do .env.example abaixo e cole no seu ficheiro)
touch .env


Conteúdo para o ficheiro backend/.env:
É necessário criar uma conta gratuita no MongoDB Atlas para obter a sua string de ligação.

# String de ligação da sua base de dados MongoDB
DATABASE_URL=mongodb+srv://<seu-usuario>:<sua-senha>@cluster.mongodb.net/<nome-da-db>?retryWrites=true&w=majority

# Segredo para a geração dos tokens JWT
APP_SECRET=use-uma-frase-secreta-bem-segura-aqui


Inicie o servidor do back-end:

npm run dev


O servidor deverá estar a rodar em http://localhost:3333.

3. Configurar o Front-end

Com o back-end a rodar, abra um novo terminal e configure a interface do utilizador.

# A partir da pasta raiz do projeto, navegue para a pasta do front-end
cd frontend-web

# Instale as dependências
npm install


Inicie a aplicação React:

npm run dev


A aplicação deverá abrir automaticamente no seu navegador, geralmente em http://localhost:5173.

Agora a aplicação está totalmente funcional na sua máquina! Pode registar um novo utilizador e começar a gerir as suas tarefas.