import { Link } from 'react-router-dom'
import logo from '../../../assets/rr_logo.svg'
import { Menu, Search } from '../../icons'
import { Button } from '../../ui'
import './navbar.scss'

function NavBar({ opensearch }) {
    return (
        <div className="navbar">
            <div className="navbar-actions">
                <Button className="btn-rectangle">
                    <Menu />
                </Button>
                <Link to="/">
                    <img
                        style={{
                            height: '9.5rem',
                            padding: '1.5rem'
                        }}
                        src={logo}
                        alt="Logo"
                    />
                </Link>

                <Button onClick={opensearch} className="btn-circle">
                    <Search />
                </Button>
            </div>
        </div>
    )
}

export default NavBar
