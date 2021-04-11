import { Link } from 'react-router-dom'
import paper from '../../../assets/paper.png'
import './articlesource.scss'

const ArticleSource = ({ style = {}, article, ...rest }) => (
    <div style={{ ...style }} className="article-tag" {...rest}>
        <img
            className="article-tag-logo"
            src={paper}
            alt="paper-icon"
        />
        <small className="article-tag-title">
            <Link
                style={{
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
        </small>
        <small className="article-tag-date">
            &nbsp; | &nbsp;
            {Math.round(
                (new Date() - new Date(article.art_pub_dt)) /
                    (1000 * 60 * 60 * 24 * 7)
            )}
            &nbsp;Weeks Ago
        </small>
    </div>
)

export default ArticleSource
