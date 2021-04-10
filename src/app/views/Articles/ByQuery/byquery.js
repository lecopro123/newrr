import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { getArticlesBy } from '../../../../redux/actions/articleActions'
import nodata from '../../../assets/nodata.svg'
import search from '../../../assets/search-bg.svg'
import { ArticleCard } from '../../../components/article'
import ShowingBy from '../../../components/article/ArticlesShowingBy/showingby'
import { Layout } from '../../../components/common'

export default function ByQuery() {
    let query = new URLSearchParams(useLocation().search)
    let q = query.get('q')
    const articles = useSelector((state) => state.articlesby)
    const [isLoading, setIsLoading] = useState(true)
    const [moreLoading, setmoreLoading] = useState(false)
    const dispatch = useDispatch()

    function callback() {
        setmoreLoading(false)
        console.log(`FETCHED_SEARCH_PAGE_${articles.page + 1}`)
    }

    const handleViewMore = () => {
        setmoreLoading(true)
        dispatch(
            getArticlesBy(
                callback,
                { type: 'query', value: q },
                { page: articles.page + 1 }
            )
        )
    }

    useEffect(() => {
        setIsLoading(true)
        function initCallback() {
            console.log('FETCHED_SEARCH_PAGE_1')
            setIsLoading(false)
        }
        dispatch(
            getArticlesBy(
                initCallback,
                { type: 'query', value: q },
                { page: 1 }
            )
        )
    }, [dispatch, setIsLoading, q])

    return (
        <Layout
            loading={isLoading}
            loadingText={`Searching for "${q}"`}
        >
            <ShowingBy
                showingby="search"
                title={`Results for "${q}"`}
                icon={search}
            />

            {!isLoading &&
                (articles.data.length ? (
                    articles.data.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                        />
                    ))
                ) : (
                    <div>
                        <img height="200px" src={nodata} alt="" />
                        <p style={{ padding: '12px 0' }}>
                            Nothing yet, Coming Soon
                        </p>
                    </div>
                ))}

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
