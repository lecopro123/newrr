import { useEffect, useState } from 'react'
import { ChevronUp, Cross } from '../../icons'
import ImageViewer from '../ImageViewer/imageviewer'
import './datapopup.scss'

function isYoutubeLink(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    var match = url.match(regExp)
    return match && match[7].length === 11 ? match[7] : false
}

const DataPopup = ({ xy, popRef, handlePopUp, popupdata }) => {
    // const [coor, setCoor] = useState({ x: xy.x, y: xy.y })
    const [open, setOpen] = useState(false)
    const [link, setLink] = useState('')

    useEffect(() => {
        let diff = xy.wX - xy.x
        let diffY = xy.wY - xy.y
        console.log('X:', diff, 'Y:', diffY)

        // console.log(popRef.current.clientHeight)
        if (diff < 500) {
            // popRef.current.style.top = 'auto'
            // popRef.current.style.bottom = 'auto'
            popRef.current.style.left = 'auto'
            popRef.current.style.right = diff + 'px'
            console.log('flip-x')
        }
        if (diffY < xy.wY) {
            // popRef.current.style.left = 'auto'
            // popRef.current.style.right = 'auto'
            if (diffY < 0) {
                popRef.current.style.top = 'auto'
                popRef.current.style.bottom = 0 + 'px'
            } else if (diffY > 330 && diffY < 600) {
                popRef.current.style.bottom = 'auto'
                popRef.current.style.top = 0 + 'px'
            } else {
                popRef.current.style.top = 'auto'
                popRef.current.style.bottom = diffY + 'px'
            }

            console.log('flip-y')
        }
        // else {
        //     // popRef.current.style.left = 'auto'
        //     popRef.current.style.top = xy.x
        //     popRef.current.style.bottom = 'auto'
        //     // popRef.current.style.left = xy.y
        //     // popRef.current.style.right = 'auto'

        //     console.log('no-flip')
        // }
    }, [xy.y, xy.x, xy.wX, popRef, xy.wY])

    return (
        <div
            style={{ left: xy.x + 'px', top: xy.y + 'px' }}
            ref={popRef}
            className="popup"
        >
            <div
                onClick={handlePopUp}
                className="close-btn btn-circle"
            >
                <Cross />
            </div>
            <div
                onClick={() =>
                    popRef.current.classList.toggle('expanded')
                }
                className="expand-btn btn-circle"
            >
                <ChevronUp />
            </div>
            <div className="wrapper">
                <div className="title">
                    {popupdata.type && (
                        <small>{popupdata.type}</small>
                    )}
                    <h2
                        // onClick={dragElement}
                        className="title-popup"
                        // onClick={() =>
                        //     popRef.current.classList.toggle(
                        //         'expanded'
                        //     )
                        // }
                        style={{
                            fontFamily: 'Josefin Sans'
                        }}
                        dangerouslySetInnerHTML={{
                            __html: popupdata.title
                        }}
                    ></h2>
                </div>
                <div
                    onClick={() =>
                        popRef.current.classList.toggle('expanded')
                    }
                    className="meaning"
                >
                    {unescape(popupdata.meaning)}
                </div>
                <div>
                    {popupdata.videoLinks &&
                        unescape(popupdata.videoLinks)
                            .split(',')
                            .map((v_link, i) => {
                                return isYoutubeLink(v_link) ? (
                                    <iframe
                                        key={i}
                                        style={{
                                            border: 'none',
                                            margin: '12px',
                                            width: '100%',
                                            maxWidth: '400px',
                                            height: '250px'
                                        }}
                                        src={
                                            'https://www.youtube.com/embed/' +
                                            isYoutubeLink(v_link)
                                        }
                                        title="YouTube video player"
                                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : null
                            })}
                </div>
                <div className="photos">
                    {open && (
                        <ImageViewer imagelink={link} open={open} />
                    )}
                    {popupdata.image &&
                        popupdata.image.split(',').map((image, i) => (
                            <img
                                onClick={() => {
                                    setLink(image)
                                    setOpen(!open)
                                }}
                                className="data-images"
                                key={i}
                                src={image}
                                alt={image}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}
export default DataPopup
