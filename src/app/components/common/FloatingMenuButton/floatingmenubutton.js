import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { userLogOutRequest } from '../../../../redux/actions/userActions'
import person from '../../../assets/person.svg'
import { Menu, Swap } from '../../icons'
import './floatingmenubutton.scss'

const FloatingMenuButton = ({ props }) => {
    const auth = useSelector((state) => state.user)

    let dispatch = useDispatch()
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
                    <div
                        onClick={() =>
                            history.push('/classnotes/subjects')
                        }
                        className="bottom-navbar-menuitems-item"
                    >
                        Class Notes
                    </div>
                    <div className="bottom-navbar-menuitems-item">
                        Quizez
                    </div>
                    <div className="bottom-navbar-menuitems-item">
                        Discussion Rooms
                    </div>
                </div>
                <div
                    onClick={() =>
                        auth.isLoggedIn
                            ? null
                            : history.push('/login')
                    }
                    className="bottom-navbar-user-container"
                >
                    <div
                        onClick={toggleUserExpand}
                        className="bottom-navbar-user"
                    >
                        {auth.isLoggedIn ? 'JD' : '?'}
                    </div>
                </div>
            </div>
            <div
                ref={userFloatRef}
                className="user-popup at-floating-navigation__menu"
            >
                <header className="at-floating-navigation__user">
                    <div className="at-floating-navigation__thumbnail">
                        <img alt="Andy Tran" src={person} />
                    </div>
                    <div className="at-floating-navigation__content">
                        <h2 className="at-floating-navigation__title">
                            Jon Doe
                        </h2>
                        <p className="at-floating-navigation__description">
                            <a href="/user/profile">View Profile</a>
                        </p>
                    </div>
                </header>

                <a
                    onClick={() => dispatch(userLogOutRequest(null))}
                    className="at-floating-navigation__item"
                    href="/login"
                >
                    Log Out
                </a>
            </div>
            {/* </div> */}
        </>
    )
}
export default FloatingMenuButton
