import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReadArticles } from '../../../redux/actions/articleActions'
import { ArticleCard } from '../../components/article'
import { Layout } from '../../components/common'
import { Button } from '../../components/ui'

export default function Home() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [moreLoading, setmoreLoading] = useState(false)
    const articles = useSelector((state) => state.articles)
    const udata = JSON.parse(localStorage.getItem('user_info'))
    var th = JSON.parse(localStorage.getItem('article_unlock')) !== null
    function callback() {
        setmoreLoading(false)
        console.log(`PAGE_${articles.page + 1}_SUCCESS`)
    }

    const handleViewMore = () => {
        setmoreLoading(true)
        dispatch(
            getReadArticles(callback, { page: articles.page + 1 }, udata.id))

    }

    useEffect(() => {

        function initCallback() {
            console.log('PAGE_1_SUCCESS')
            if (th) localStorage.removeItem('article_unlock')
            setIsLoading(false)
        }

        if (articles.data.length) return setIsLoading(false)
        dispatch(getReadArticles(initCallback, { page: 1 }, udata.id))
    }, [dispatch, setIsLoading, articles.data.length])

    return (
        <Layout loading={isLoading}>
            {!isLoading &&
                articles.data.map((article) => (
                    <ArticleCard key={article.id} article={article} page={articles.page} />
                ))}

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
