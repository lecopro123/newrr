import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import {
    userLoginRequest,
    verifyOTPRequest
} from '../../../redux/actions/userActions'
import logo from '../../assets/logo.png'
import './Login.scss'

export default function Login(props) {
    const dispatch = useDispatch()
    const [phone, setPhone] = useState(null)
    const [OTP, setOTP] = useState(null)
    const [hasOTP, setHasOTP] = useState(false)
    const [otpLoading, setOtpLoading] = useState(false)
    let history = useHistory()
    let location = useLocation()

    let { from } = location.state || { from: { pathname: '/' } }

    const loginData = useSelector((state) => state.user)

    function callback() {
        console.log('OTP_RECEIVED')
        setHasOTP(true)
        setOtpLoading(false)
    }

    const handleOtpRequest = () => {
        setOtpLoading(true)
        dispatch(userLoginRequest(callback, { phonenumber: phone }))
    }

    const handleLoginBtn = () => {
        // auth.verifyOtp(
        //     () => {
        //         history.replace(from)
        //     },
        //     { userOtp: OTP, serverOtp: loginData.OTP }
        // )

        dispatch(
            verifyOTPRequest(
                () => {
                    history.replace(from)
                },
                { userOTP: OTP, serverOTP: loginData.OTP }
            )
        )
    }

    return (
        <div className="bg">
            <div className="circle1"></div>
            <div className="circle2"></div>

            <div className="bg-grid">
                <div className="rect"></div>
                <div className="rect"></div>
            </div>

            <div className="flex-grid">
                <div className="col sidebar">
                    <div>Welcome To</div>
                    <img className="sidebar-logo" src={logo} alt="" />
                    <div className="sidebar-text">
                        Login to read smarticles, explore class notes{' '}
                        <br />
                        and many more
                    </div>
                </div>
                {!hasOTP && !otpLoading ? (
                    <div className="col">
                        <div className="sidebar-text">
                            {from.pathname === '/' ? (
                                ''
                            ) : (
                                <p>
                                    You must log in to read full
                                    article <br />
                                    {from.pathname}
                                </p>
                            )}
                            <br />
                            Please enter your phone number <br /> to
                            continue
                        </div>

                        <input
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            placeholder="Your phone number"
                            className="input"
                            pattern="[1-9]{1}[0-9]{9}"
                        />

                        <div
                            className="btn otp-btn"
                            onClick={handleOtpRequest}
                        >
                            GET OTP
                        </div>
                    </div>
                ) : (
                    <div className="col">
                        <div className="sidebar-text">
                            Enter OTP Here {loginData.OTP}
                        </div>

                        <input
                            onChange={(e) => setOTP(e.target.value)}
                            type="text"
                            placeholder="Enter OTP here"
                            className="input"
                            pattern="[0-9]{4}"
                        />

                        <button
                            disabled={otpLoading}
                            className="btn otp-btn"
                            onClick={handleLoginBtn}
                        >
                            LOGIN
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
