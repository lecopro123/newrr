import { ChevronUp } from '../../icons'
import './footer.scss'

function Footer({ topRef }) {
    return (
        <div className="footer">
            <button
                className="btn-circle"
                onClick={() =>
                    topRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'end',
                        inline: 'nearest'
                    })
                }
            >
                <ChevronUp />
            </button>
            <p className="copyright-text">
                Ⓒ 2020 - 2021 Reading Right. All rights reserved.
            </p>
        </div>
    )
}

export default Footer
