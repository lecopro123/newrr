import { Link } from 'react-router-dom'
import paper from '../../../assets/paper.png'

export default function ArticleSource({ article }) {
    return (
        <div className="article-tag">
            <img
                className="article-tag-logo"
                src={paper}
                alt="paper-icon"
            />
            <span>
                <Link
                    style={{
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                    to={
                        '/articles/source/' +
                        article.source.name +
                        '/' +
                        article.art_source +
                        '/'
                    }
                >
                    {article.source.name}
                </Link>
            </span>
            <p>
                &nbsp; | &nbsp;
                {Math.round(
                    (new Date() - new Date(article.art_pub_dt)) /
                        (1000 * 60 * 60 * 24 * 7)
                )}
                &nbsp;Weeks Ago
            </p>
        </div>
    )
}
