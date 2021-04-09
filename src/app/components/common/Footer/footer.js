import chevronUp from '../../../assets/up-chevron.svg'
import { AuthButton } from '../../auth'
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
                <img src={chevronUp} alt="^"></img>
            </button>
            <p className="copyright-text">
                Ⓒ 2020 - 2021 Reading Right. All rights reserved.
            </p>
            <AuthButton />
        </div>
    )
}

export default Footer
