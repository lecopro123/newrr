import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getArticlesBy } from '../../../../redux/actions/articleActions'
import label from '../../../assets/label.svg'
import {
    ArticleCard,
    ArticlesShowingBy
} from '../../../components/article'
import { Layout, NoDataFound } from '../../../components/common'

export default function ByCategory() {
    let { category, id } = useParams()
    const articles = useSelector((state) => state.articlesby)
    const [isLoading, setIsLoading] = useState(true)
    const [moreLoading, setmoreLoading] = useState(false)
    const dispatch = useDispatch()

    function callback() {
        setmoreLoading(false)
        console.log(`FETCHED_CATEGORY_PAGE_${articles.page + 1}`)
    }

    const handleViewMore = () => {
        setmoreLoading(true)
        dispatch(
            getArticlesBy(
                callback,
                { type: 'category', value: category },
                { id, page: articles.page + 1 }
            )
        )
    }

    useEffect(() => {
        setIsLoading(true)
        function initCallback() {
            console.log('FETCHED_CATEGORY_PAGE_1')
            setIsLoading(false)
        }
        dispatch(
            getArticlesBy(
                initCallback,
                { type: 'category', value: category },
                { id, page: 1 }
            )
        )
    }, [dispatch, setIsLoading, id, category])

    return (
        <Layout loading={isLoading} loadingText="loading source..">
            <ArticlesShowingBy
                showingby="category"
                title={category}
                icon={label}
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
