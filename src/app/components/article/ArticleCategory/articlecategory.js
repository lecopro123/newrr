import { Link } from 'react-router-dom'
import label from '../../../assets/label.svg'

// styles same as ArticleSource

const ArticleCategory = ({
    style = {},
    article,
    article_category = '',
    ...rest
}) => (
    <div style={{ ...style }} className="article-tag" {...rest}>
        <img
            className="article-tag-logo"
            src={label}
            alt="paper-icon"
        />
        <span className="article-tag-title">
            <Link
                style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}
                to={`/articles/category/${
                    article_category || article.category
                }/${article.art_sub_cat}`}
            >
                {article.category || article_category}
            </Link>
        </span>
    </div>
)

export default ArticleCategory
