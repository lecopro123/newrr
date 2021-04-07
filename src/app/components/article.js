import { Link, useHistory } from 'react-router-dom'
import coin from '../assets/coin.png'
import ArticleCategory from './articlecategory'
import ArticleSource from './articlesource'

export default function Article({ article, article_category }) {
    let history = useHistory()

    return (
        <div className="article">
            <Link
                style={{ textDecoration: 'none' }}
                to={'/article/read/' + article.id}
            >
                <div className="cover-container">
                    <img
                        className="article-cover"
                        src={
                            'https://www.readingright.in/' +
                            article.art_image
                        }
                        alt={article.id}
                    />
                    <div className="article-likes">
                        <img src={coin} alt="likes" />
                        {article.art_status}
                    </div>
                    <div className="article-covertext">
                        {article.art_head}
                    </div>
                </div>
            </Link>
            <div className="article-meta">
                <ArticleSource article={article} />
                <div className="article-reduced">
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={'/article/read/' + article.id}
                    >
                        <div
                            onClick={() =>
                                history.push({
                                    pathname:
                                        '/article/read/' + article.id
                                })
                            }
                        >
                            {article.art_data
                                .replace(/(<([^>]+)>)/gi, '')
                                .replace(
                                    /&nbsp;|&rsquo;|&mdash;|❓|💡|🔗/gi,
                                    ''
                                )}
                        </div>
                    </Link>
                </div>
                <ArticleCategory
                    article={article}
                    article_category={article_category}
                />
            </div>
        </div>
    )
}
