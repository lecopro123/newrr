import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getArticleCategories,
    getReadArticles
} from '../../../redux/actions/articleActions'
import Article from '../../components/article'
import Layout from '../../components/layout'
import './Root.scss'

export default function Root(props) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [moreLoading, setmoreLoading] = useState(false)
    const articles = useSelector((state) => state.articles)

    function callback() {
        setmoreLoading(false)
        console.log('VIEW_MORE_SUCCESS')
    }

    const handleViewMore = () => {
        setmoreLoading(true)
        dispatch(
            getReadArticles(callback, { page: articles.page + 1 })
        )
    }

    useEffect(() => {
        function initCallback() {
            console.log('INITIAL_LOAD')
            setIsLoading(false)
        }

        dispatch(getArticleCategories())
        dispatch(getReadArticles(initCallback))
    }, [dispatch, setIsLoading])

    return (
        <Layout>
            <div className="App-main">
                {isLoading ? (
                    <div className="loader"></div>
                ) : (
                    articles.data.map((article) => (
                        <Article key={article.id} article={article} />
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
        </Layout>
    )
}
