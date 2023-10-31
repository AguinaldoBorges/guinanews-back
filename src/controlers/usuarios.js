const { pool } = require('../db');
const jwt = require('jsonwebtoken');
const SECRET = '1234'


const listarUsuarios = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.status(200).json({ todos: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar usuarios' });
    }
}


const criarUsuario = async (req, res) => {
    const { nome, sobrenome, email, senha, nivel } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nome, sobrenome, email, senha, nivel) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nome, sobrenome, email, senha, nivel]
        );

        res.status(201).json({ Usuario: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar usuario' });
    }
}


const buscarUmUsuario = async (req, res) => {
    const usuarioId = req.params.id; // Supondo que você passará o ID na URL

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [usuarioId]);

        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Usuário não encontrado' });
        } else {
            res.status(200).json({ usuario: result.rows });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar o usuário' });
    }
}


const alterarUsuario = async (req, res) => {
    const usuarioId = req.params.id; // Supondo que você passará o ID na URL
    const usuario = await pool.query('SELECT * FROM usuarios WHERE id = $1', [usuarioId]);
    const { nome, sobrenome, email, senha, nivel } = req.body;

    try {
        const result = await pool.query(
            'UPDATE usuarios SET nome = $1, sobrenome = $2, email = $3, senha = $4, nivel = $5 WHERE id = $6 RETURNING *',
            [nome || usuario.rows[0].nome, sobrenome || usuario.rows[0].sobrenome, email || usuario.rows[0].email, senha || usuario.rows[0].senha, nivel || usuario.rows[0].nivel, usuarioId]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Usuário não encontrado' });
        } else {
            res.status(200).json({ usuario: result.rows[0] });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao alterar o usuário' });
    }
}


const excluirUsuario = async (req, res) => {
    const usuarioId = req.params.id; // Supondo que você passará o ID na URL

    try {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [usuarioId]);

        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Usuário não encontrado' });
        } else {
            res.status(200).json({ message: 'Usuário excluído com sucesso' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao excluir o usuário' });
    }
}


/* Autenticação */

const autenticarUsuario = async (req, res) => {
    // Receba dados de login (por exemplo, nome de usuário e senha)
    const { email, senha } = req.body;
    // Verifique as credenciais do usuário em seu banco de dados ou array
    try {
        const usuario = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, senha]);
        if (usuario.rows.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        // Gere um token JWT
        const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: 6000 });
        res.json({ auth: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Erro ao logar o usuário' });
    }
}

const deslogarUsuario = (req, res) => {
    // Para deslogar um usuário, você pode simplesmente fornecer um token de expiração imediata
    const token = jwt.sign({ exp: 0 }, SECRET);
    res.json({ auth: false, token });
}

const verificarAutenticacao = (req, res, next) => {
    // Verifique o token JWT para acesso a recursos protegidos
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido', logado: false });
    }
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido', logado: false });
        }
        req.userId = decoded.userId
        next();
    });
}




module.exports = { listarUsuarios, criarUsuario, buscarUmUsuario, alterarUsuario, excluirUsuario, autenticarUsuario, verificarAutenticacao, deslogarUsuario }