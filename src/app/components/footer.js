import chevronUp from '../assets/up-chevron.svg'
import { AuthButton } from '../auth/auth'

function Footer({ topRef }) {
    return (
        <div className="App-footer">
            <div
                className="top-btn"
                onClick={() =>
                    topRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'end',
                        inline: 'nearest'
                    })
                }
            >
                <img src={chevronUp} alt="^"></img>
            </div>
            <p>Ⓒ 2020 - 2021 Reading Right. All rights reserved.</p>
            <AuthButton />
        </div>
    )
}

export default Footer
