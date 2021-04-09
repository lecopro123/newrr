import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getArticlesBy } from '../../../../redux/actions/articleActions'
import label from '../../../assets/label.svg'
import nodata from '../../../assets/nodata.svg'
import {
    ArticleCard,
    ArticlesShowingBy
} from '../../../components/article'
import { Layout } from '../../../components/common'
import { Loader } from '../../../components/ui'

export default function ByCategory(props) {
    let { category, id } = useParams()
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
                { type: 'category', value: category },
                { id, page: articles.page + 1 }
            )
        )
    }

    useEffect(() => {
        setIsLoading(true)
        function initCallback() {
            console.log('FETCHED_CATEGORY')
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
        <Layout>
            <ArticlesShowingBy
                showingby="category"
                title={category}
                icon={label}
            />

            {isLoading ? (
                <>
                    <Loader />
                    <p style={{ paddingTop: '12px' }}>Loading..</p>
                </>
            ) : articles.data.length ? (
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
