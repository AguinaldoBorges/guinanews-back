# Backend do Guina News - Portal de Notícias Fullstack

## Descrição

O backend do "Guina News - Portal de Notícias Fullstack" é a parte essencial que alimenta e gerencia todas as operações nos bastidores deste projeto. É a infraestrutura robusta que fornece autenticação, gerenciamento de dados e lógica de negócios para a aplicação, garantindo sua funcionalidade e segurança.

## Tecnologias Utilizadas

- **Node.js:** O backend é construído em Node.js, aproveitando a velocidade e escalabilidade dessa plataforma de execução.
- **PostgresSQL:** O banco de dados relacional PostgresSQL é usado para armazenar e gerenciar informações críticas, como notícias, categorias e dados de usuário.
- **Express:** É o framework que facilita a criação de rotas RESTful, gerenciando as requisições e respostas da aplicação de forma eficiente.
- **Swagger:** Documentação da API é fornecida com o Swagger, tornando a integração e o entendimento da API mais acessíveis para terceiros.
- **JWT (JSON Web Tokens):** Para autenticação, utilizamos JWT para garantir que os usuários tenham acesso seguro às funcionalidades do sistema.
- **Rotas Seguras:** Implementamos rotas seguras para proteger dados sensíveis e operações, permitindo que apenas usuários autorizados acessem determinados recursos.

## Funcionalidades do Backend

- **Autenticação de Usuário:** O backend oferece autenticação segura, permitindo que os usuários façam login e cadastrem-se na aplicação.
- **Armazenamento de Dados:** Gerencia o armazenamento e recuperação de notícias, categorias e informações do usuário no banco de dados PostgresSQL.
- **Lógica de Negócios:** Implementa a lógica de negócios que permite a adição, edição e exclusão de notícias, categorias e contas de usuário, de acordo com os privilégios e níveis de acesso.
- **Segurança:** Utiliza JWT para garantir que apenas usuários autenticados tenham acesso às rotas e funcionalidades relevantes, garantindo a segurança dos dados e operações.
- **Documentação da API:** A documentação da API é fornecida com o Swagger, tornando a integração e a compreensão do backend mais acessíveis.

## Como Usar

1. Clone o repositório para o seu ambiente local:

         git clone https://github.com/seuusuario/seurepositorio.git


2. Instale as dependências do Node.js:

         npm install

3. Configure as variáveis de ambiente, incluindo a conexão com o banco de dados e as chaves JWT.

4. Inicie o servidor:

         npm start

O backend estará acessível em `http://localhost:4000`.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e enviar solicitações de pull (pull requests).
