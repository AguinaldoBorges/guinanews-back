const { pool } = require('../db');


const listarCategorias = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categorias');
        res.status(200).json({ todos: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
}


const criarCategorias = async (req, res) => {
    const { nome } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO categorias (nome) VALUES ($1) RETURNING *',
            [nome]
        );

        res.status(201).json({ categorias: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar categoria' });
    }
}


const buscarUmCategorias = async (req, res) => {
    const categoriasId = req.params.id; // Suponha que você passe o ID na URL.

    try {
        const result = await pool.query('SELECT * FROM categorias WHERE id = $1', [categoriasId]);

        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Categorias não encontrado' });
        } else {
            res.status(200).json({ categorias: result.rows[0] });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar a categoria' });
    }
}


const alterarCategorias = async (req, res) => {
    const categoriasId = req.params.id; // Suponha que você passe o ID na URL.
    const categorias = await pool.query('SELECT * FROM categorias WHERE id = $1', [categoriasId]);
    const { nome } = req.body;

    try {
        const result = await pool.query(
            'UPDATE categorias SET nome = $1 WHERE id = $2 RETURNING *',
            [nome || categorias.rows[0].nome, categoriasId]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Categoria não encontrada' });
        } else {
            res.status(200).json({ categorias: result.rows[0] });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar a categorias' });
    }
}


const excluirCategorias = async (req, res) => {
    const categoriasId = req.params.id; // Suponha que você passe o ID na URL.

    try {
        const result = await pool.query('DELETE FROM categorias WHERE id = $1 RETURNING *', [categoriasId]);

        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Categorias não encontrado' });
        } else {
            res.status(200).json({ message: 'Categorias excluído com sucesso' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao excluir a categorias' });
    }
}


module.exports = { listarCategorias, criarCategorias, buscarUmCategorias, alterarCategorias, excluirCategorias }