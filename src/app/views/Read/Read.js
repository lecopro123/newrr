import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import {
    getArticleById,
    toogleBookmark
} from '../../../redux/actions/articleActions'
import coin from '../../assets/coin.png'
import { ArticleAuthor, ArticlePopup } from '../../components/article'
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
    const [popupdata, setPopupData] = useState({
        type: '',
        title: '',
        comment: '',
        commentStatus: '',
        image: '',
        meaning: '',
        videoLinks: ''
    })
    const popRef = useRef(null)

    const handleBookmark = () => {
        dispatch(toogleBookmark(id))
    }

    useEffect(() => {
        function index() {
            setLoading(false)
        }
        dispatch(getArticleById(index, { id }))
    }, [id, dispatch])

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
    }

    const populatePopup = (target) => {
        if (!target.dataset.meaning) return false
        setPopupData({
            type: target.dataset.title
                ? `${target.dataset.title}`
                : '',
            title:
                target.type === 'button'
                    ? (target.dataset.line &&
                          unescape(target.dataset.line)) ||
                      target.dataset.title + target.textContent ||
                      `${target.textContent} Explanation`
                    : target.textContent,
            meaning: target.dataset.meaning || '',
            comment: target.dataset.comment || '',
            commentStatus: target.dataset.commentStatus || '',
            image: target.dataset.image || '',
            videoLinks: target.dataset.videoLinks || ''
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
                            {ids.includes(id) ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#fff"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M21.03 5.72a.75.75 0 010 1.06l-11.5 11.5a.75.75 0 01-1.072-.012l-5.5-5.75a.75.75 0 111.084-1.036l4.97 5.195L19.97 5.72a.75.75 0 011.06 0z"
                                    ></path>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6.69 2a1.75 1.75 0 00-1.75 1.756L5 21.253a.75.75 0 001.219.583L12 17.21l5.782 4.625A.75.75 0 0019 21.25V3.75A1.75 1.75 0 0017.25 2H6.69z"
                                    ></path>
                                </svg>
                            )}
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

            <ArticlePopup
                popRef={popRef}
                handlePopUp={handlePopUp}
                popupdata={popupdata}
            />
        </Layout>
    )
}
