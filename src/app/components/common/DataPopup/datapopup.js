import { useState } from 'react'
import chevron from '../../../assets/chevron-up.svg'
import x from '../../../assets/x.svg'
import ImageViewer from '../ImageViewer/imageviewer'
import './datapopup.scss'

function isYoutubeLink(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    var match = url.match(regExp)
    return match && match[7].length === 11 ? match[7] : false
}

const DataPopup = ({ popRef, handlePopUp, popupdata }) => {
    const [open, setOpen] = useState(false)
    const [link, setLink] = useState('')
    return (
        <div ref={popRef} className="popup">
            <div onClick={handlePopUp} className="close-btn">
                <img src={x} alt="x" />
            </div>
            <div
                onClick={() =>
                    popRef.current.classList.toggle('expanded')
                }
                className="expand-btn"
            >
                <img src={chevron} alt="^" />
            </div>
            <div className="wrapper">
                <div className="title">
                    {popupdata.type && (
                        <small style={{ color: 'gray' }}>
                            {popupdata.type}
                        </small>
                    )}
                    <h2
                        onClick={() =>
                            popRef.current.classList.toggle(
                                'expanded'
                            )
                        }
                        style={{
                            fontFamily: 'Josefin Sans',
                            color: '#242323'
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
