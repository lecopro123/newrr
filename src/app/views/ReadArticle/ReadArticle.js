import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import {
    getArticleById,
    toogleBookmark
} from '../../../redux/actions/articleActions'
import bookmark from '../../assets/bookmark-fill.svg'
import check from '../../assets/check.svg'
import coin from '../../assets/coin.png'
import { ArticleAuthor } from '../../components/article'
import ArticleCategory from '../../components/article/ArticleCategory/articlecategory'
import ArticleSource from '../../components/article/ArticleSource/articlesource'
import { Layout } from '../../components/common'
import { Button, Divider } from '../../components/ui'
import './ReadArticle.scss'

export default function ReadArticle() {
    let { id } = useParams()
    let dispatch = useDispatch()
    const article = useSelector(
        (state) => state.articles.read.data[0]
    )
    const ids = useSelector((state) => state.bookmarks.ids)

    const [loading, setLoading] = useState(true)

    function callback() {
        console.log('ARTICLE_LOADED')
        setLoading(false)
    }

    const handleBookmark = () => {
        dispatch(toogleBookmark(id))
    }

    useEffect(() => {
        dispatch(getArticleById(callback, { id }))
    }, [id, dispatch])

    return (
        <Layout navbar={true} categories={true}>
            {loading ? (
                <>
                    <div className="loader"></div>
                    <p style={{ padding: '12px 0' }}>
                        Loading Article, Hang On!
                    </p>
                </>
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
                            onClick={handleBookmark}
                            title="bookmark this article"
                            className="article-bookmark"
                        >
                            <img
                                height="24px"
                                style={{ margin: '0 6px' }}
                                src={
                                    ids.includes(id)
                                        ? check
                                        : bookmark
                                }
                                alt="bookmark"
                            />
                        </div>
                    </div>
                    <div className="label">
                        <ArticleSource article={article} />
                        <ArticleCategory article={article} />
                    </div>

                    <div
                        className="article-content"
                        dangerouslySetInnerHTML={{
                            __html: article.art_data
                        }}
                    ></div>

                    <Divider />

                    {article.author_data.map((author, i) => (
                        <ArticleAuthor
                            key={i}
                            hasAuthor={true}
                            author={author}
                        />
                    ))}

                    <div className="action-btns">
                        <Button className="btn-primary">
                            Take a Quiz
                        </Button>
                        &emsp;
                        <Button className="btn-primary">
                            Discussion
                        </Button>
                    </div>
                </div>
            )}
        </Layout>
    )
}
