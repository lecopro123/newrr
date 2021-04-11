import { Link } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import { Button } from '../../ui'
import './navbar.scss'

function NavBar({ opensearch }) {
    return (
        <div className="navbar">
            <div className="navbar-actions">
                <Button className="btn-rectangle">
                    <svg
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
                </Button>
                <Link to="/">
                    <img
                        style={{ height: '9.5rem' }}
                        src={logo}
                        alt="Logo"
                    />
                </Link>

                <Button onClick={opensearch} className="btn-circle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14.53 15.59a8.25 8.25 0 111.06-1.06l5.69 5.69a.75.75 0 11-1.06 1.06l-5.69-5.69zM2.5 9.25a6.75 6.75 0 1111.74 4.547.746.746 0 00-.443.442A6.75 6.75 0 012.5 9.25z"
                        ></path>
                    </svg>
                </Button>
            </div>
        </div>
    )
}

export default NavBar
