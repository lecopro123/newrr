import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getArticleById } from '../../../redux/actions/articleActions'
import bookmark from '../../assets/bookmark-fill.svg'
import coin from '../../assets/coin.png'
import label from '../../assets/label.svg'
import paper from '../../assets/paper.png'
import Author from '../../components/author'
import Layout from '../../components/layout'
import './ReadArticle.scss'

export default function ReadArticle() {
    let { id } = useParams()
    let dispatch = useDispatch()
    const article = useSelector(
        (state) => state.articles.read.data[0]
    )

    const [loading, setLoading] = useState(true)

    function callback() {
        console.log('ARTICLE_LOADED')
        setLoading(false)
    }

    useEffect(() => {
        dispatch(getArticleById(callback, { id }))
    }, [id, dispatch])

    return (
        <Layout navbar={true} categories={true}>
            <div className="App-main">
                {loading ? (
                    <div className="loader"></div>
                ) : (
                    <div className="article">
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

                            <div
                                title="bookmark this article"
                                className="article-bookmark"
                            >
                                <img
                                    height="24px"
                                    style={{ margin: '0 6px' }}
                                    src={bookmark}
                                    alt="bookmark"
                                />
                            </div>
                        </div>
                        <div className="label">
                            <div className="label-tag">
                                <img
                                    height="24px"
                                    style={{ margin: '0 6px' }}
                                    src={paper}
                                    alt=""
                                />
                                <span>
                                    {article.source
                                        ? article.source.name
                                        : ''}{' '}
                                    |{' '}
                                    {Math.round(
                                        (new Date() -
                                            new Date(
                                                article.art_pub_dt
                                            )) /
                                            (1000 * 60 * 60 * 24 * 7)
                                    )}{' '}
                                    Weeks
                                </span>
                            </div>
                            <div className="label-tag">
                                <img src={label} alt="" />
                                <span>
                                    {article.category ||
                                        'Lorem, ipsum.'}
                                </span>
                            </div>
                        </div>

                        <div
                            className="article-content"
                            dangerouslySetInnerHTML={{
                                __html: article.art_data
                            }}
                        ></div>

                        <div className="divider"></div>

                        {article.author_data.length ? (
                            article.author_data.map((author) => (
                                <>
                                    <Author
                                        hasAuthor={false}
                                        author={author}
                                    />
                                    <div className="divider"></div>
                                </>
                            ))
                        ) : (
                            <>
                                <Author />
                                <div className="divider"></div>
                            </>
                        )}

                        <div className="action-btns">
                            <div
                                style={{
                                    marginRight: '1.5rem',
                                    marginBottom: '1.5rem'
                                }}
                                className="btn"
                            >
                                Take a Quiz
                            </div>
                            <div className="btn">Discussion</div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}
