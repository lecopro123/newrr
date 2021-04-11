import { useEffect, useRef } from 'react'
import './imageviewer.scss'
const ImageViewer = ({
    imagelink = 'https://www.w3schools.com/css/img_5terre.jpg',
    open,
    ...rest
}) => {
    let r = useRef(null)
    useEffect(() => {
        r.current.classList.toggle('is-active')
    }, [open])
    return (
        <div
            onClick={() => r.current.classList.toggle('is-active')}
            ref={r}
            className="image-bg"
            {...rest}
        >
            <div className="toast">Click anywhere to close</div>
            <img
                className="image-current"
                src={imagelink}
                alt="some"
            />
        </div>
    )
}
export default ImageViewer
