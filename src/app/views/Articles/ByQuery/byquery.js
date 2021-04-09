import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { getArticlesBy } from '../../../../redux/actions/articleActions'
import nodata from '../../../assets/nodata.svg'
import search from '../../../assets/search-bg.svg'
import { ArticleCard } from '../../../components/article'
import ShowingBy from '../../../components/article/ArticlesShowingBy/showingby'
import { Layout } from '../../../components/common'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function ByQuery(props) {
    let query = useQuery()
    let q = query.get('q')
    const articles = useSelector((state) => state.articlesby)
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
            getArticlesBy(
                callback,
                { type: 'query', value: q },
                { page: articles.page + 1 }
            )
        )
    }

    useEffect(() => {
        console.log(q)
        setIsLoading(true)
        function initCallback() {
            console.log('FETCHED_CATEGORY')
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
        <Layout>
            <ShowingBy
                showingby="search"
                title={`Results for "${q}"`}
                icon={search}
            />

            {isLoading ? (
                <>
                    <div className="loader"></div>
                    <p style={{ paddingTop: '12px' }}>Loading..</p>
                </>
            ) : articles.data.length ? (
                articles.data.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))
            ) : (
                <div>
                    <img height="200px" src={nodata} alt="" />
                    <br />
                    <p>Nothing yet, Coming Soon</p>
                    <br />
                </div>
            )}

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
