import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import menuIcon from '../assets/menu.svg'
import searchIcon from '../assets/search.svg'

function NavBar(props) {
    return (
        <div className="App-header">
            <div className="App-header-actions">
                <div className="menu">
                    <img src={menuIcon} alt="m"></img>
                </div>
                <Link to="/">
                    <img className="logo" src={logo} alt="Logo" />
                </Link>
                <div className="search">
                    <img src={searchIcon} alt="s"></img>
                </div>
            </div>
        </div>
    )
}

export default NavBar
