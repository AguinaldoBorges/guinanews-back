const { pool } = require('../db');


const listarPosts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        res.status(200).json({ todos: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar posts' });
    }
}


const criarPost = async (req, res) => {
    const { imagem, slug, titulo, categoria, conteudo, destaque } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO posts (imagem, slug, titulo, categoria, conteudo, destaque) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [imagem, slug || 'noticia-sem-titulo', titulo || 'Notícia sem Título', categoria || 'Todas as Categorias', conteudo || 'Sem conteúdo', destaque || false]
        );

        res.status(201).json({ postagem: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar postagem' });
    }
}


const buscarUmPost = async (req, res) => {
    const postId = req.params.id; // Suponha que você passe o ID na URL.

    try {
        const result = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);

        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Post não encontrado' });
        } else {
            res.status(200).json({ postagem: result.rows[0] });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar a postagem' });
    }
}


const alterarPost = async (req, res) => {
    const postId = req.params.id; // Suponha que você passe o ID na URL.
    const post = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);
    const { imagem, slug, titulo, conteudo } = req.body;

    try {
        const result = await pool.query(
            'UPDATE posts SET imagem = $1, slug = $2, titulo = $3, conteudo = $4 WHERE id = $5 RETURNING *',
            [imagem || post.rows[0].imagem, slug || post.rows[0].slug, titulo || post.rows[0].titulo, conteudo || post.rows[0].conteudo, postId]
        );

        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Post não encontrado' });
        } else {
            res.status(200).json({ postagem: result.rows[0] });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar a postagem' });
    }
}


const excluirPost = async (req, res) => {
    const postId = req.params.id; // Suponha que você passe o ID na URL.

    try {
        const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [postId]);

        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Post não encontrado' });
        } else {
            res.status(200).json({ message: 'Post excluído com sucesso' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao excluir a postagem' });
    }
}


module.exports = { listarPosts, criarPost, buscarUmPost, alterarPost, excluirPost }