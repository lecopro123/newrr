import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './Login.scss'

export default function Login(props) {
    return (
        <div className="bg">
            <div className="circle1"></div>
            <div className="circle2"></div>

            <div className="bg-grid">
                <div className="rect"></div>
                <div className="rect"></div>
            </div>

            <div class="flex-grid">
                <div class="col sidebar">
                    <div>Welcome To</div>
                    <img className="sidebar-logo" src={logo} alt="" />
                    <div className="sidebar-text">
                        Login to read smarticles, explore class notes{' '}
                        <br />
                        and many more
                    </div>
                </div>
                <div class="col">
                    <div className="sidebar-text">
                        Please enter your phone number <br /> to
                        continue
                    </div>
                    <input
                        type="text"
                        placeholder="Your phone number"
                        className="input"
                    />
                    <Link style={{ textDecoration: 'none' }} to="/">
                        <div className="btn otp-btn">GET OTP</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
