import { useContext } from 'react'
import { Link } from 'react-router-dom'
import ThemeContext from '../../../theme/ThemeContext'
import {
    AutoBrightness,
    Branding,
    Moon,
    Search,
    Sun
} from '../../icons'
import { Button } from '../../ui'
import './navbar.scss'

function NavBar({ opensearch, rootRef }) {
    const { dark, auto, toggleAuto, toggleDark } = useContext(
        ThemeContext
    )

    return (
        <div className="navbar">
            <div className="navbar-actions">
                <Button
                    onClick={auto ? toggleAuto : toggleDark}
                    className="btn-rectangle"
                >
                    {auto && (
                        <AutoBrightness
                            style={{
                                fill: dark ? '#ededf0' : ''
                            }}
                        />
                    )}
                    {!auto &&
                        (dark ? (
                            <Sun
                                style={{
                                    fill: dark ? '#ededf0' : '',
                                    stroke: dark ? '#ededf0' : ''
                                }}
                            />
                        ) : (
                            <Moon />
                        ))}
                </Button>
                <Link to="/">
                    <Branding className="branding-logo" />
                </Link>

                <Button onClick={opensearch} className="btn-circle">
                    <Search />
                </Button>
            </div>
        </div>
    )
}

export default NavBar
