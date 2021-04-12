import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getArticlesBy } from '../../../../redux/actions/articleActions'
import nodata from '../../../assets/nodata.svg'
import label from '../../../assets/pencil.svg'
import {
    ArticleCard,
    ArticlesShowingBy
} from '../../../components/article'
import { Layout } from '../../../components/common'

export default function ByAuthor() {
    let { author, id } = useParams()
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
                { type: 'author', value: id },
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
                { type: 'author', value: id },
                { page: 1 }
            )
        )
    }, [dispatch, setIsLoading, id])

    return (
        <Layout loading={isLoading} loadingText="loading source..">
            <ArticlesShowingBy
                showingby="author"
                title={author}
                icon={label}
            />

            {!isLoading &&
                (articles.data.length ? (
                    articles.data.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article_category={articles.from.value}
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
