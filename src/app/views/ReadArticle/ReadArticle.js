import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import bookmark from '../../assets/bookmark-fill.svg'
import coin from '../../assets/coin.png'
import label from '../../assets/label.svg'
import paper from '../../assets/paper.png'
import Layout from '../../components/layout'
import './ReadArticle.scss'

export default function ReadArticle() {
    let { id } = useParams()
    const [article, setArticle] = useState({})
    const articles = useSelector((state) => state.articles)
    let articlesbycategory = useSelector(
        (state) => state.articlesbycategory
    )

    useEffect(() => {
        let data = articles.data.find((a) => a.id === parseInt(id))
        if (!data) {
            data = articlesbycategory.data.find(
                (a) => a.id === parseInt(id)
            )
        }
        setArticle(data)
    }, [id, articles.data, articlesbycategory.data])

    return (
        <Layout>
            <div className="App-main">
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

                        <div className="article-bookmark">
                            <img
                                height="24px"
                                style={{ margin: '0 6px' }}
                                src={bookmark}
                                alt=""
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
                                    articlesbycategory.category}
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
                    <div className="author">
                        <div className="author-avatar">
                            <div>
                                <h1 style={{ color: '#fff' }}>
                                    {getInitials('Lorem, ipsum.')}
                                </h1>
                            </div>
                        </div>

                        <div className="author-text">
                            <div className="author-text-name">
                                <h1>Lorem, ipsum.</h1>
                            </div>
                            <div className="author-text-description">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Itaque tenetur non,
                                nam perferendis neque repellendus.
                            </div>
                        </div>
                    </div>

                    <div className="divider"></div>

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
            </div>
        </Layout>
    )
}

const getInitials = (string) =>
    string
        .split(' ')
        .map(([firstLetter]) => firstLetter)
        .filter(
            (_, index, array) =>
                index === 0 || index === array.length - 1
        )
        .join('')
        .toUpperCase()