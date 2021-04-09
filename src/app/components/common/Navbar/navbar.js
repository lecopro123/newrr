import { Link } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import MenuIcon from '../../../assets/menu.svg'
import searchIcon from '../../../assets/search.svg'
import { Button } from '../../ui'
import './navbar.scss'

function NavBar(props) {
    return (
        <div className="navbar">
            <div className="navbar-actions">
                <Button className="btn-rectangle">
                    <img src={MenuIcon} alt="menu" />
                </Button>
                <Link to="/">
                    <img
                        style={{ height: '9.5rem' }}
                        src={logo}
                        alt="Logo"
                    />
                </Link>
                <Link to="/articles/search?q=coffee">
                    <Button className="btn-circle">
                        <img src={searchIcon} alt="search"></img>
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default NavBar
