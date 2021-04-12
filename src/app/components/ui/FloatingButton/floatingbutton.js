import { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import './floatingbutton.scss'

const FloatingButton = ({ props }) => {
    let floatRef = useRef(null)
    let bottomNavRef = useRef(null)
    let userFloatRef = useRef(null)
    const history = useHistory()

    // let cBottomNavRef = useRef(null)  // block

    const toggleNavExpand = () => {
        // cBottomNavRef.current.classList.toggle('unhide')
        floatRef.current.classList.toggle('float-hidden')
        bottomNavRef.current.classList.toggle('bottom-navbar-open')
    }

    const toggleUserExpand = () => {
        userFloatRef.current.classList.toggle('user-popup-open')
    }

    return (
        <>
            <div
                ref={floatRef}
                onClick={toggleNavExpand}
                className="floating-action-btn"
            >
                <svg
                    className="floating-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                >
                    <path
                        fillRule="evenodd"
                        d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z"
                    ></path>
                </svg>
            </div>
            {/* to block */}
            {/* <div
                ref={cBottomNavRef}
                className="bottom-navbar-container"
            > */}
            <div ref={bottomNavRef} className="bottom-navbar">
                <div
                    onClick={toggleNavExpand}
                    className="bottom-navbar-hide-btn"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                    >
                        <path d="M7.72 21.78a.75.75 0 001.06-1.06L5.56 17.5h14.69a.75.75 0 000-1.5H5.56l3.22-3.22a.75.75 0 10-1.06-1.06l-4.5 4.5a.75.75 0 000 1.06l4.5 4.5zm8.56-9.5a.75.75 0 11-1.06-1.06L18.44 8H3.75a.75.75 0 010-1.5h14.69l-3.22-3.22a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5z"></path>
                    </svg>
                </div>
                {/* <div className="bottom-navbar-title">MENU</div> */}
                <div className="bottom-navbar-menuitems">
                    <div
                        onClick={() => history.push('/')}
                        className="bottom-navbar-menuitems-item"
                    >
                        Home
                    </div>
                    <div className="bottom-navbar-menuitems-item">
                        Archives
                    </div>
                    <div className="bottom-navbar-menuitems-item">
                        Class Notes
                    </div>
                    <div className="bottom-navbar-menuitems-item">
                        Quizez
                    </div>
                    <div className="bottom-navbar-menuitems-item">
                        Discussion Rooms
                    </div>
                </div>
                <div className="bottom-navbar-user-container">
                    <div
                        onClick={toggleUserExpand}
                        className="bottom-navbar-user"
                    >
                        JD
                    </div>
                </div>
            </div>
            <div ref={userFloatRef} className="user-popup"></div>
            {/* </div> */}
        </>
    )
}
export default FloatingButton
