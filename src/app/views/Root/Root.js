import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReadArticles } from '../../../redux/actions/articleActions'
import { ArticleCard } from '../../components/article'
import { Layout } from '../../components/common'
import { Button, Loader } from '../../components/ui'

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

        if (articles.data.length) return setIsLoading(false)
        dispatch(getReadArticles(initCallback))
    }, [dispatch, setIsLoading, articles.data.length])

    return (
        <Layout>
            {isLoading ? (
                <>
                    <Loader />
                    <p style={{ padding: '12px 0' }}>
                        Hang on, Loading..
                    </p>
                </>
            ) : (
                articles.data.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))
            )}
            {!isLoading && articles.page + 1 <= articles.page_total && (
                <Button
                    onClick={handleViewMore}
                    loading={moreLoading}
                    disabled={moreLoading}
                    className={
                        moreLoading ? 'btn-circle' : 'btn-primary'
                    }
                >
                    View More
                </Button>
            )}
        </Layout>
    )
}
