import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookmarks } from '../../../../redux/actions/articleActions'
import nodata from '../../../assets/nodata.svg'
import Article from '../../../components/article'
import Layout from '../../../components/layout'

export default function Bookmarks(props) {
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

    // const renderBookmarks=(ids=[])=>{
    //     ids.map((id)=>{

    //     })
    // }

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
        <Layout>
            <div className="App-main">
                {!isLoading && (
                    <div style={{ padding: '.5rem 0' }}>
                        Showing <b>Bookmarks</b>
                    </div>
                )}

                {isLoading ? (
                    <>
                        <div className="loader"></div>
                        <p>Loading..</p>
                        <br />
                        <br />
                    </>
                ) : bookmarks.hasBookmarks ? (
                    bookmarks.data.map((article) => (
                        <Article key={article.id} article={article} />
                    ))
                ) : (
                    <div>
                        <img height="200px" src={nodata} alt="" />
                        <br />
                        <p>Nothing yet, Add Some</p>
                        <br />
                    </div>
                )}
            </div>

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

            <div>ids:{bookmarks.ids.length}</div>
            <div>datas:{bookmarks.data.length}</div>
        </Layout>
    )
}
