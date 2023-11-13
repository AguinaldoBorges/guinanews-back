const express = require('express')
const route = express.Router(); // Usar express.Router() em vez de express()
const { listarUsuarios, criarUsuario, buscarUmUsuario, alterarUsuario, excluirUsuario, autenticarUsuario, verificarAutenticacao, deslogarUsuario } = require('../controlers/usuarios');
const { listarCategorias, criarCategorias, buscarUmCategorias, alterarCategorias, excluirCategorias } = require('../controlers/categorias');
const { listarPosts, criarPost, buscarUmPost, alterarPost, excluirPost } = require('../controlers/posts');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swaggerDef.js');
const jwt = require('jsonwebtoken');
const { enviarArquivo } = require('../controlers/arquivos.js');
const multer = require('multer');
const path = require('path');

/* Multer */
// Configuração do Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/'); // O diretório onde os arquivos serão armazenados
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo no formato timestamp + extensão original
    }
});

const uploadFile = multer({ storage: storage });


route.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* Autenticação */

/**
 * @swagger
 * tags:
 *   - name: Autenticação
 *     description: Operações de registro e login de usuários
 */

/**
 * @swagger
 * /logar:
 *   post:
 *     summary: Autenticação de usuário
 *     description: Autentica um usuário e retorna um token JWT válido.
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 description: O endereço de e-mail do usuário.
 *               senha:
 *                 type: string
 *                 description: A senha do usuário.
 *     responses:
 *       200:
 *         description: Sucesso na autenticação. Retorna um token JWT válido.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   description: Indica se a autenticação foi bem-sucedida.
 *                 token:
 *                   type: string
 *                   description: O token JWT válido.
 *       401:
 *         description: Falha na autenticação. Credenciais inválidas.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 err:
 *                   type: string
 *                   description: Mensagem de erro.
 */

route.post('/logar', autenticarUsuario);
route.post('/deslogar', deslogarUsuario);
route.post('/verificar-autenticacao', verificarAutenticacao);


/* Usuarios */

/**
 * @swagger
 * tags:
 *   - name: Usuários
 *     description: Operações relacionadas a usuários
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retorna todos os usuários.
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Lista de todos os usuários.
 *       500:
 *         description: Erro ao buscar usuários.
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               sobrenome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               nivel:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       500:
 *         description: Erro ao criar usuário.
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do usuário.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao buscar o usuário.
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               sobrenome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               nivel:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao atualizar o usuário.
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Exclui um usuário pelo ID.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao excluir o usuário.
 */

route.get('/usuarios', verificarAutenticacao, listarUsuarios);
route.get('/usuarios/:id', verificarAutenticacao, buscarUmUsuario);
route.post('/usuarios', verificarAutenticacao, criarUsuario);
route.put('/usuarios/:id', verificarAutenticacao, alterarUsuario);
route.delete('/usuarios/:id', verificarAutenticacao, excluirUsuario);


/* Posts */

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Operações relacionadas a postagens
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retorna todos os posts.
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: Lista de todos os posts.
 *       500:
 *         description: Erro ao buscar posts.
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post.
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               imagem:
 *                 type: string
 *               slug:
 *                 type: string
 *               titulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Postagem criada com sucesso.
 *       500:
 *         description: Erro ao criar postagem.
 */

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Retorna um post pelo ID.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da postagem.
 *       404:
 *         description: Post não encontrado.
 *       500:
 *         description: Erro ao buscar a postagem.
 */

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post pelo ID.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imagem:
 *                 type: string
 *               slug:
 *                 type: string
 *               titulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Postagem atualizada com sucesso.
 *       404:
 *         description: Post não encontrado.
 *       500:
 *         description: Erro ao atualizar a postagem.
 */

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Exclui um post pelo ID.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post excluído com sucesso.
 *       404:
 *         description: Post não encontrado.
 *       500:
 *         description: Erro ao excluir a postagem.
 */

route.get('/posts', listarPosts);
route.get('/posts/:id', buscarUmPost);
route.post('/posts', verificarAutenticacao, criarPost);
route.put('/posts/:id', verificarAutenticacao, alterarPost);
route.delete('/posts/:id', verificarAutenticacao, excluirPost);
/* route.delete('/posts/:id', verificarAutenticacao, excluirPost); */



/* Categorias */

/**
 * @swagger
 * tags:
 *   - name: Categorias
 *     description: Operações relacionadas a categorias
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Retorna todas as categorias.
 *     tags:
 *       - Categorias
 *     responses:
 *       200:
 *         description: Lista de todas as categorias.
 *       500:
 *         description: Erro ao buscar categorias.
 */

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Cria uma nova categoria.
 *     tags:
 *       - Categorias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 *       500:
 *         description: Erro ao criar categoria.
 */

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Retorna uma categoria pelo ID.
 *     tags:
 *       - Categorias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da categoria.
 *       404:
 *         description: Categoria não encontrada.
 *       500:
 *         description: Erro ao buscar a categoria.
 */

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Atualiza uma categoria pelo ID.
 *     tags:
 *       - Categorias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso.
 *       404:
 *         description: Categoria não encontrada.
 *       500:
 *         description: Erro ao atualizar a categoria.
 */

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Exclui uma categoria pelo ID.
 *     tags:
 *       - Categorias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria excluída com sucesso.
 *       404:
 *         description: Categoria não encontrada.
 *       500:
 *         description: Erro ao excluir a categoria.
 */

route.get('/categorias', listarCategorias);
route.get('/categorias/:id', buscarUmCategorias);
route.post('/categorias', verificarAutenticacao, criarCategorias);
route.put('/categorias/:id', verificarAutenticacao, alterarCategorias);
route.delete('/categorias/:id', verificarAutenticacao, excluirCategorias);


/* Arquivos */
route.post('/upload', uploadFile.single('arquivo'), enviarArquivo);



module.exports = { route }
