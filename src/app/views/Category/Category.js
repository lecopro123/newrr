import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getArticleByCategories } from '../../../redux/actions/articleActions'
import Article from '../../components/article'
import Layout from '../../components/layout'

export default function Category(props) {
    let { category, id } = useParams()
    const articles = useSelector((state) => state.articlesbycategory)
    const [isLoading, setIsLoading] = useState(true)
    const [moreLoading, setmoreLoading] = useState(false)
    const dispatch = useDispatch()

    function callback() {
        setmoreLoading(false)
        console.log('VIEW_MORE_SUCCESS')
    }

    const handleViewMore = () => {
        setmoreLoading(true)
        dispatch(
            getArticleByCategories(callback, {
                page: articles.page + 1
            })
        )
    }

    useEffect(() => {
        setIsLoading(true)
        function initCallback() {
            console.log('FETCHED_CATEGORY')
            setIsLoading(false)
        }
        dispatch(
            getArticleByCategories(initCallback, { id, category })
        )
    }, [dispatch, setIsLoading, id, category])

    return (
        <Layout>
            <div className="App-main">
                {!isLoading && (
                    <div style={{ padding: '1rem 0' }}>
                        Showing results for: <b>{category}</b>
                    </div>
                )}
                {isLoading ? (
                    <div className="loader"></div>
                ) : (
                    articles.data.map((article) => (
                        <Article
                            key={article.id}
                            article_category={articles.category}
                            article={article}
                        />
                    ))
                )}
            </div>

            {!isLoading && articles.page + 1 <= articles.page_total && (
                <div
                    onClick={handleViewMore}
                    className="btn-container"
                >
                    <div className="more-btn">
                        {moreLoading ? (
                            <div className="loader-small"></div>
                        ) : (
                            'View More'
                        )}
                    </div>
                </div>
            )}
            {/* <div>CAT:{ar}</div>
            <div>ID:{id}</div> */}
        </Layout>
    )
}
