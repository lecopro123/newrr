import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getArticlesBy } from '../../../../redux/actions/articleActions'
import nodata from '../../../assets/nodata.svg'
import Article from '../../../components/article'
import Layout from '../../../components/layout'

export default function BySource(props) {
    let { source, id } = useParams()
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
                { type: 'source', value: source },
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
                { type: 'source', value: source },
                { id, page: 1 }
            )
        )
    }, [dispatch, setIsLoading, id, source])

    return (
        <Layout>
            <div className="App-main">
                {!isLoading && (
                    <div style={{ padding: '.5rem 0' }}>
                        Showing by source: <b>{source}</b>
                    </div>
                )}
                {isLoading ? (
                    <>
                        <div className="loader"></div>
                        <p>Loading..</p>
                        <br />
                        <br />
                    </>
                ) : articles.data.length ? (
                    articles.data.map((article) => (
                        <Article key={article.id} article={article} />
                    ))
                ) : (
                    <div>
                        <img height="200px" src={nodata} alt="" />
                        <br />
                        <p>Nothing yet, Coming Soon</p>
                        <br />
                    </div>
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
