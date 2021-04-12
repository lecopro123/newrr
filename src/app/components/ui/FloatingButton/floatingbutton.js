import { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, Swap } from '../../icons'
import './floatingbutton.scss'

const FloatingButton = ({ props }) => {
    let floatRef = useRef(null)
    let bottomNavRef = useRef(null)
    let userFloatRef = useRef(null)
    const history = useHistory()

    // let cBottomNavRef = useRef(null)  // block

    const toggleNavExpand = () => {
        // cBottomNavRef.current.classList.toggle('unhide')
        if (
            userFloatRef.current.classList.contains('user-popup-open')
        ) {
            toggleUserExpand()
        }
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
                <Menu />
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
                    <Swap />
                </div>
                {/* <div className="bottom-navbar-title">MENU</div> */}
                <div className="bottom-navbar-menuitems">
                    <div
                        onClick={() => history.push('/')}
                        className="bottom-navbar-menuitems-item"
                    >
                        Home
                    </div>
                    <div
                        onClick={() =>
                            history.push('/user/bookmarks')
                        }
                        className="bottom-navbar-menuitems-item"
                    >
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
