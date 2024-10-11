import React, { useState } from 'react';
import axios from 'axios';

const ArticleForm = () => { //formulario bem basico que pede nome, tittulo e composição (css ta diferente do resto)
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !title || !content) {
            setMessage("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/articles', {
                name,
                title,
                content,
            });
            setMessage("Artigo cadastrado com sucesso!");
            // Limpar os campos
            setName('');
            setTitle('');
            setContent('');
        } catch (error) {
            console.error(error);
            setMessage("Erro ao cadastrar artigo: " + error.response?.data.message || "Erro desconhecido");
        }
    };

    return (
        <div className="form-container">
            <h2>Cadastrar Artigo</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nome do Artigo</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nome do Artigo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Título do Artigo</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Título do Artigo"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Conteúdo do Artigo</label>
                    <textarea
                        id="content"
                        placeholder="Conteúdo do Artigo"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Cadastrar Artigo</button>
                </div>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default ArticleForm;
