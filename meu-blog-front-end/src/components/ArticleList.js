import { Link } from "react-router-dom";

const ArticleList = ({ articles }) => { 
    return (
        <>
            {articles.length > 0 ? articles.map(article => (
                <div key={article.name} className="article-list-item">
                    <Link to={`/articlelist/${article.name}`}>
                        <h1>{article.title}</h1>
                        <p>{article.content[0]?.substring(0, 150)}...</p>
                    </Link>
                   
                </div>
            )) : <p>Nenhum artigo encontrado.</p>}
        </>
    );
}

export default ArticleList;
