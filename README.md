📝 App de Gestão de Tarefas

Um ecossistema completo de gestão de tarefas, integrando Back-end, Front-end Web e Aplicação Mobile Nativa. O projeto permite que o utilizador crie uma conta, faça login e gerencie suas tarefas sincronizadas em tempo real entre dispositivos.

🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando a arquitetura Monorepo, dividida em três partes principais:

1. Back-end (API)

Node.js & Express: Servidor e rotas da API.

MongoDB: Banco de dados NoSQL (pode ser usado local ou Atlas).

Mongoose: Modelagem de dados (Schemas).

JWT (JSON Web Token): Autenticação segura de utilizadores.

BcryptJS: Criptografia de senhas.

2. Front-end (Web)

ReactJS (Vite): Biblioteca para construção da interface.

Axios: Cliente HTTP para comunicação com a API.

Context API: Gerenciamento de estado global (Autenticação).

React Router Dom: Navegação e rotas privadas.

3. Mobile (Android)

React Native CLI: Framework para desenvolvimento nativo.

TypeScript: Tipagem estática para maior segurança.

AsyncStorage: Persistência de dados local (Token).

React Navigation: Navegação entre telas (Stack).

📦 Estrutura do Projeto

app-tarefas/
├── backend/ # API e Servidor
├── frontend-web/ # Site React
└── mobile/ # App React Native

🔧 Como Executar o Projeto

Para rodar o projeto completo, você precisará de três terminais abertos simultaneamente.

Pré-requisitos

Node.js instalado.

MongoDB rodando localmente ou uma URI do Atlas.

Configuração de ambiente Android (JDK, Android SDK) para a parte mobile.

Passo 1: Back-end (API)

O servidor deve ser o primeiro a ser iniciado.

cd backend
npm install

# Crie um arquivo .env na raiz do backend com:

# DATABASE_URL=mongodb://127.0.0.1:27017/app-tarefas

# APP_SECRET=sua_chave_secreta_aqui

npm run dev

# O servidor rodará na porta 3333

Passo 2: Front-end (Web)

cd frontend-web
npm install
npm run dev

# O site rodará geralmente em http://localhost:5173

Passo 3: Mobile (App)

⚠️ Aviso para utilizadores Windows: Devido ao limite de caracteres de caminho do Windows, recomenda-se clonar este repositório em uma pasta raiz curta (Ex: C:\Dev\app-tarefas) para evitar erros no build do Android.

cd mobile
npm install

# Inicie o Metro Bundler

npx react-native start

# Em outro terminal, instale o app no emulador ou dispositivo físico

npx react-native run-android

📱 Funcionalidades

[x] Cadastro de Utilizadores

[x] Autenticação (Login)

[x] Listagem de Tarefas

[x] Adicionar Nova Tarefa

[x] Marcar como Concluída

[x] Excluir Tarefa

[x] Logout
