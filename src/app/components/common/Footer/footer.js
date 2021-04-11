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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                >
                    <path
                        fillRule="evenodd"
                        d="M18.78 15.28a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 00-1.06 0l-6.25 6.25a.75.75 0 101.06 1.06L12 9.56l5.72 5.72a.75.75 0 001.06 0z"
                    ></path>
                </svg>
            </button>
            <p className="copyright-text">
                Ⓒ 2020 - 2021 Reading Right. All rights reserved.
            </p>
            <AuthButton />
        </div>
    )
}

export default Footer
