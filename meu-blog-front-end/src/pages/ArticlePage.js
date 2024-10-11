import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import NotFoundPage from "./NotFoundPage";
import AddCommentForm from "../components/AddCommentForm";
import CommentList from "../components/CommentList";

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const { articleId } = useParams();

    useEffect(() => {
        const loadArticleInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/articles/${articleId}`);
                const newArticleInfo = response.data;
                setArticleInfo(newArticleInfo);
            } catch (error) {
                console.error("Erro ao carregar o artigo:", error);
            }
        };

        loadArticleInfo();
    }, [articleId]);

    // Definindo a variável article corretamente
    const article = articleInfo; 

    const addUpvote = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/articles/${articleId}/upvote`);
            const updatedArticle = response.data;

            if (updatedArticle && typeof updatedArticle.upvotes === 'number') {
                setArticleInfo(prevInfo => ({
                    ...prevInfo,
                    upvotes: updatedArticle.upvotes
                }));
            } else {
                console.error("API não está retornando corretamente os votos");
            }
        } catch (error) {
            console.error("Erro ao adicionar voto:", error);
        }
    };

    if (!article) {
        return <NotFoundPage />
    }

    return (
        <>
            <h1>{article.title}</h1>
            <div className="upvotes-section">
                <button onClick={addUpvote}>Votar</button>
                <p>Este artigo possui {articleInfo.upvotes} votos</p>
            </div>
            {Array.isArray(article.content) ? (
                article.content.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                ))
            ) : (
                <p>{article.content}</p>
            )}
            <AddCommentForm 
                articleName={articleId}
                onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
            <CommentList comments={articleInfo.comments} />
        </>
    );
};

export default ArticlePage;
