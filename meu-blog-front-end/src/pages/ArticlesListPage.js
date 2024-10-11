import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleList from '../components/ArticleList';

const ArticlesListPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/articles'); // Ajuste se necessário pra evitar erro de requisição
                console.log('Dados recebidos da API:', response.data);
                setArticles(response.data);
            } catch (error) {
                console.error('Erro ao buscar artigos:', error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <>
            <h1>Lista de Artigos</h1>
            <ArticleList articles={articles} />
        </>
    );
};

export default ArticlesListPage;
