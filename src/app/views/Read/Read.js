import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import {
    getArticleById,
    toogleBookmark
} from '../../../redux/actions/articleActions'
import coin from '../../assets/coin.png'
import { ArticleAuthor } from '../../components/article'
import ArticleCategory from '../../components/article/ArticleCategory/articlecategory'
import ArticleSource from '../../components/article/ArticleSource/articlesource'
import { DataPopup, Layout } from '../../components/common'
import { Bookmark, Check } from '../../components/icons'
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

    const [xy, setXy] = useState({ x: 0, y: 0, wX: 0, wY: 0 })

    let [articleHTML, setArticleHTML] = useState('')
    const [tintOn, setTintOn] = useState(false)

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
        function index(str) {
            let x = document.createElement('div')
            x.innerHTML = str

            let btns = x.getElementsByTagName('button')

            let bcount = 0
            let qcount = 0

            for (let i = 0; i < btns.length; i++) {
                if (btns[i].dataset.title === 'Extra Facts') {
                    bcount++
                    // btns[i].append('[' + bcount + ']')
                    btns[i].append(`<sup>${bcount}</sup>`)
                } else if (btns[i].dataset.title === 'Explanation') {
                    qcount++
                    // btns[i].append('[' + qcount + ']')
                    btns[i].append(`<sup>${qcount}</sup>`)
                }
            }

            setArticleHTML(x)

            setLoading(false)
        }
        dispatch(getArticleById(index, { id }))
    }, [id, dispatch])

    const handlePopUp = (e) => {
        setXy({
            x: e.screenX,
            y: e.screenY,
            wX: window.innerWidth,
            wY: window.innerHeight
        })

        let hasData = populatePopup(e.target)

        if (popRef.current.classList.contains('open')) {
            if (!hasData) {
                popRef.current.classList.toggle('open')
                setTintOn(!tintOn)
            }
        } else {
            if (hasData) {
                if (popRef.current.classList.contains('expanded')) {
                    popRef.current.classList.toggle('expanded')
                }
                popRef.current.classList.toggle('open')
                setTintOn(!tintOn)
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
                      target.dataset.title + target.innerHTML ||
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
            tintVisible={tintOn}
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
                                <Check />
                            ) : (
                                <Bookmark />
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
                            __html: decodeHTMLEntities(
                                articleHTML.innerHTML
                                    .replaceAll(
                                        'color: red;',
                                        'color: #D97E79;'
                                    )
                                    .replaceAll(
                                        'color: blue;',
                                        'color: #3195f2;'
                                    )
                            )
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

            <DataPopup
                xy={xy}
                popRef={popRef}
                handlePopUp={handlePopUp}
                popupdata={popupdata}
            />
        </Layout>
    )
}

function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea')
    textArea.innerHTML = text
    return textArea.value
}
