import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getArticlesBy } from '../../../../redux/actions/articleActions'
import paper from '../../../assets/paper.svg'
import { ArticleCard } from '../../../components/article'
import ShowingBy from '../../../components/article/ArticlesShowingBy/showingby'
import { Layout, NoDataFound } from '../../../components/common'

export default function BySource() {
    let { source, id } = useParams()
    const articles = useSelector((state) => state.articlesby)
    const [isLoading, setIsLoading] = useState(true)
    const [moreLoading, setmoreLoading] = useState(false)
    const dispatch = useDispatch()
    const udata = (JSON.parse(localStorage.getItem('user_info')))
    function callback() {
        setmoreLoading(false)
        console.log(`FETCHED_SOURCE_PAGE_${articles.page + 1}`)
    }

    const handleViewMore = () => {
        setmoreLoading(true)
        dispatch(
            getArticlesBy(
                callback,
                { type: 'source', value: source },
                { id, page: articles.page + 1 },
                udata.id
            )
        )
    }

    useEffect(() => {
        setIsLoading(true)
        function initCallback() {
            console.log('FETCHED_SOURCE_PAGE_1')
            setIsLoading(false)
        }
        dispatch(
            getArticlesBy(
                initCallback,
                { type: 'source', value: source },
                { id, page: 1 },
                udata.id
            )
        )
    }, [dispatch, setIsLoading, id, source, udata.id])

    return (
        <Layout loading={isLoading} loadingText="loading source...">
            <ShowingBy
                showingby="source"
                title={source}
                icon={paper}
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
                    <NoDataFound />
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
