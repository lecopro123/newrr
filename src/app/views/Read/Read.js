import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import {
    getArticleById,
    toogleBookmark
} from '../../../redux/actions/articleActions'
import bookmark from '../../assets/bookmark-fill.svg'
import check from '../../assets/check.svg'
import chevron from '../../assets/chevron-up.svg'
import coin from '../../assets/coin.png'
import x from '../../assets/x.svg'
import { ArticleAuthor } from '../../components/article'
import ArticleCategory from '../../components/article/ArticleCategory/articlecategory'
import ArticleSource from '../../components/article/ArticleSource/articlesource'
import { Layout } from '../../components/common'
import { Button, Divider } from '../../components/ui'
import './Read.scss'

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
    const [popupdata, setPopupData] = useState({
        text: '',
        type: '',
        content: ''
    })
    const popRef = useRef(null)

    const handlePopUp = ({ target }) => {
        let hasData = populatePopup(target)
        console.log(target)
        if (popRef.current.classList.contains('open')) {
            if (!hasData) {
                popRef.current.classList.toggle('open')
            }
        } else {
            if (hasData) {
                if (popRef.current.classList.contains('expanded')) {
                    popRef.current.classList.toggle('expanded')
                }
                popRef.current.classList.toggle('open')
            }
        }

        console.log(popRef.current.classList)
    }

    const populatePopup = (target) => {
        if (!target.dataset.meaning) return false
        setPopupData({
            text: target.textContent,
            type: target.dataset.title || 'meaning',
            content: target.dataset.meaning
        })

        return true
    }

    return (
        <Layout
            loading={loading}
            loadingText="Article loading, Hang On!"
            navbar={true}
            categories={true}
        >
            {!loading && (
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
                        onClick={handlePopUp}
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
                        <Button
                            style={{
                                padding: '0 2.5rem',
                                marginRight: '2.5rem'
                            }}
                            className="btn-primary"
                        >
                            Take a Quiz
                        </Button>
                        <Button
                            style={{
                                padding: '0 2.5rem'
                            }}
                            className="btn-primary"
                        >
                            Discussion
                        </Button>
                    </div>
                </div>
            )}

            <div ref={popRef} className="popup">
                <div onClick={handlePopUp} className="close-btn">
                    <img src={x} alt="x" />
                </div>
                <div
                    onClick={() =>
                        popRef.current.classList.toggle('expanded')
                    }
                    className="expand-btn"
                >
                    <img src={chevron} alt="^" />
                </div>
                <div className="wrapper">
                    <div className="title">
                        <h2>
                            {popupdata.text}&nbsp;
                            <span style={{ fontSize: '16px' }}>
                                ({popupdata.type})
                            </span>
                        </h2>
                    </div>
                    <div
                        onClick={() =>
                            popRef.current.classList.toggle(
                                'expanded'
                            )
                        }
                        className="meaning"
                    >
                        {popupdata.content.replace(
                            /%[0-9|A-Z|a-z]{2}/gi,
                            ' '
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
