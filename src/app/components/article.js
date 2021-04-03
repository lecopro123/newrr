import { Link, useHistory } from 'react-router-dom'
import coin from '../assets/coin.png'
import label from '../assets/label.svg'
import paper from '../assets/paper.png'

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
                        <img
                            height="24px"
                            style={{ margin: '0 6px' }}
                            src={coin}
                            alt=""
                        />
                        {article.art_status}
                    </div>
                    <div className="article-covertext">
                        {article.art_head}
                    </div>
                </div>
            </Link>
            <div className="article-meta">
                <div className="article-source">
                    <img
                        height="24px"
                        style={{ margin: '0 6px' }}
                        src={paper}
                        alt=""
                    />
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
                    &nbsp; | &nbsp;
                    {Math.round(
                        (new Date() - new Date(article.art_pub_dt)) /
                            (1000 * 60 * 60 * 24 * 7)
                    )}
                    Weeks
                </div>
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
                <div className="article-tag">
                    <img src={label} alt="" />
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
            </div>
        </div>
    )
}
