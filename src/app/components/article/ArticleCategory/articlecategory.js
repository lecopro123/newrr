import { Link } from 'react-router-dom'
import label from '../../../assets/label.svg'

export default function ArticleCategory({
    article,
    article_category = ''
}) {
    return (
        <div className="article-tag">
            <img
                className="article-tag-logo"
                src={label}
                alt="paper-icon"
            />
            <span>
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
}
