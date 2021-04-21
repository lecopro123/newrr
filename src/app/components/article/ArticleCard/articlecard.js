import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
//import { useDispatch, useSelector } from 'react-redux'
import { ArticleCategory, ArticleSource } from '..'
//import { getUserArticleInfo } from '../../../../redux/actions/articleActions'
import coin from '../../../assets/coin.png'
import unlock from '../../../assets/unlock.svg'
import './articlecard.scss'
import Modal from '../../ui/Modal/modal';

function ArticleCard({ article, article_category, page }) {
    //const dispatch = useDispatch()
    //const art = useSelector((state) => state.userAdata)
    let history = useHistory()
    //console.log(history);
    const udata = JSON.parse(localStorage.getItem('user_info'))
    const [show, setshow] = useState(false)
    //const [val, setval] = useState(localStorage.getItem('article_unlock'))
    //const [isLoading, setIsLoading] = useState(true)

    //console.log(art.data[0].id !== article.id || art.data[1].id !== article.id)
    //console.log(art.coll.indexOf(article.id) !== -1)
    /*useEffect(() => {
        if ((localStorage.getItem('article_unlock') !== 0)) {
            setval(JSON.parse(localStorage.getItem('article_unlock')))
        }
    }, [dispatch])*/
    //console.log(JSON.parse(localStorage.getItem('article_unlock')).id);
    return (
        <div>
            {(article.is_unlocked || JSON.parse(localStorage.getItem('article_unlock')).art_id === article.id)  //(/*art.data[0].id === article.id && art.data[1].id === article.id*/) ?
                ? (
                    <div className="article">
                        <Link
                            //className="Linker"
                            to={'/article/read/' + article.id}
                            //onClick={() => setshow(!show)}
                            style={{ textDecoration: 'none' }}
                        >
                            {/*<Modal show={show} unlock={unlock} to={'/article/read/' + article.id} user_id={udata.id} art_id={article.id} art_s={article.art_star} user_s={udata.user_star} handleClose={() => setshow(!show)}>
                        <div>
                        </div>
        </Modal>*/}
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
                                    {article.art_star}
                                </div>
                                <div className="article-covertext">
                                    {article.art_head}
                                </div>
                            </div>
                        </Link>
                        <div className="article-meta">
                            <div className="article-meta-source">
                                <ArticleSource article={article} unlock={unlock} />
                            </div>
                            <div className="article-meta-reduced">
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
                            <div className="article-meta-category">
                                <ArticleCategory
                                    article={article}
                                    article_category={article_category}
                                />
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <div className="article">
                        <div
                            className="Linker"
                            onClick={() => setshow(!show)}
                            style={{ textDecoration: 'none' }}
                        >
                            <Modal learning={article.art_user_learning} show={show} unlock={unlock} to={'/article/read/' + article.id} user_id={udata.id} art_id={article.id} art_s={article.art_star} user_s={udata.user_star} handleClose={() => setshow(!show)}>
                                <div>
                                </div>
                            </Modal>
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
                                    {article.art_star}
                                </div>
                                <div className="article-covertext">
                                    {article.art_head}
                                </div>
                            </div>
                        </div>
                        <div className="article-meta">
                            <div className="article-meta-source">
                                <ArticleSource article={article} />
                            </div>
                            <div className="article-meta-reduced">
                                <div
                                    style={{ textDecoration: 'none' }}
                                    to={'/article/read/' + article.id}
                                >
                                    <div
                                        className="Linker"
                                        onClick={() => setshow(!show)}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        {article.art_data
                                            .replace(/(<([^>]+)>)/gi, '')
                                            .replace(
                                                /&nbsp;|&rsquo;|&mdash;|❓|💡|🔗/gi,
                                                ''
                                            )}
                                    </div>
                                </div>
                            </div>
                            <div className="article-meta-category">
                                <ArticleCategory
                                    article={article}
                                    article_category={article_category}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default ArticleCard
