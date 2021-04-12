import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookmarks } from '../../../../redux/actions/articleActions'
import bookmarkIcon from '../../../assets/bookmark-fill.svg'
import nodata from '../../../assets/nodata.svg'
import {
    ArticleCard,
    ArticlesShowingBy
} from '../../../components/article'
import { Layout } from '../../../components/common'

export default function Bookmarks() {
    const bookmarks = useSelector((state) => state.bookmarks)
    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()
    const [moreLoading, setmoreLoading] = useState(false)

    function callback() {
        setmoreLoading(false)
        console.log('VIEW_MORE_SUCCESS')
    }

    const handleViewMore = () => {
        setmoreLoading(true)
        dispatch(
            fetchBookmarks(callback, {
                page: bookmarks.page + 1,
                ids: bookmarks.ids
            })
        )
    }

    useEffect(() => {
        setIsLoading(true)
        function initCallback() {
            console.log('PAGE-1_BOOKMARKS')
            setIsLoading(false)
        }

        dispatch(
            fetchBookmarks(initCallback, {
                ids: bookmarks.ids,
                page: 1
            })
        )
    }, [dispatch, bookmarks.ids])

    return (
        <Layout
            loading={isLoading}
            loadingText="loading your bookmarks"
        >
            <ArticlesShowingBy
                showingby="bookmarks"
                title="bookmarks"
                icon={bookmarkIcon}
            />

            {!isLoading &&
                (bookmarks.hasBookmarks ? (
                    bookmarks.data.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                        />
                    ))
                ) : (
                    <div>
                        <img height="200px" src={nodata} alt="" />
                        <p style={{ padding: '12px 0' }}>
                            Nothing yet, Add Some
                        </p>
                    </div>
                ))}

            {!isLoading &&
                bookmarks.page + 1 <= bookmarks.page_total && (
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

            {/* {!isLoading && (
                <>
                    <div>ids: {bookmarks.ids.length}</div>
                    <div>datas: {bookmarks.data.length}</div>
                </>
            )} */}
        </Layout>
    )
}
