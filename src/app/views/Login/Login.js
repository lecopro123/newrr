import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import {
    userLoginRequest,
    verifyOTPRequest
} from '../../../redux/actions/userActions'
import logo from '../../assets/rr_logo.svg'
import { Button, InputField, Loader } from '../../components/ui'
import './Login.scss'

export default function Login(props) {
    let dispatch = useDispatch()
    let history = useHistory()
    let location = useLocation()
    let { from } = location.state || { from: { pathname: '/' } }
    const [otpLoading, setOtpLoading] = useState(false)
    const [verifyingOtp, setVerifyingOtp] = useState(false)

    const [phone, setPhone] = useState(null)
    const [OTP, setOTP] = useState(null)

    const [responseOTP, setResponseOTP] = useState(null)

    const [msg, setMsg] = useState({
        loadingMsg: '',
        errorMsg: 'New User?'
    })

    function otpCallback(success, res) {
        if (success) {
            console.log('USER_AC_EXISTS')
            setResponseOTP(res)
            setMsg({ errorMsg: `Didn't receive?` })
        } else {
            console.log('USER_AC_DOES_NOT_EXIST')
            if (res.message === 'Create Account') {
                setMsg({ errorMsg: 'User does not exist!' })
            }
        }
        setOtpLoading(false)
    }

    const handleOtpRequest = () => {
        setOtpLoading(true)
        setMsg({ loadingMsg: 'Sending OTP' })
        dispatch(
            userLoginRequest(otpCallback, { phonenumber: phone })
        )
    }

    function verifyCallback(success, msg) {
        if (success) {
            setTimeout(() => {
                history.replace(from)
            }, 100)
        } else {
            setMsg({ errorMsg: msg })
        }
        setVerifyingOtp(false)
    }

    const handleLoginBtn = () => {
        setVerifyingOtp(true)
        setMsg({ loadingMsg: 'Verifying OTP' })
        dispatch(
            verifyOTPRequest(verifyCallback, {
                userOTP: OTP,
                phonenumber: phone,
                otpResponse: responseOTP
            })
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
                    <div style={{ fontFamily: 'Josefin Sans' }}>
                        Welcome To
                    </div>
                    <img className="sidebar-logo" src={logo} alt="" />
                    <div
                        style={{ fontFamily: 'Josefin Sans' }}
                        className="sidebar-text"
                    >
                        Login to read smarticles, explore class notes
                        <br />
                        and many more
                    </div>
                </div>

                {!otpLoading && !responseOTP && (
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

                        <InputField
                            onChange={(e) => setPhone(e.target.value)}
                            type="number"
                            placeholder="Your phone number"
                            className="input"
                            pattern="[1-9]{1}[0-9]{9}"
                        />
                        {msg.errorMsg && (
                            <p style={{ marginBottom: '.5em' }}>
                                {msg.errorMsg}&nbsp;
                                <span
                                    style={{
                                        cursor: 'pointer',
                                        color: '#d97e79',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Create account
                                </span>
                            </p>
                        )}
                        <Button onClick={handleOtpRequest}>
                            GET OTP
                        </Button>
                    </div>
                )}

                {(otpLoading || verifyingOtp) && (
                    <div className="col">
                        <Loader style={{ marginBottom: '12px' }} />
                        <p>{msg.loadingMsg}</p>
                    </div>
                )}

                {!verifyingOtp && responseOTP && (
                    <div className="col">
                        <div className="sidebar-text">
                            Enter OTP Here {responseOTP.OTP}
                        </div>

                        <InputField
                            onChange={(e) => setOTP(e.target.value)}
                            type="number"
                            placeholder="Enter OTP here"
                            className="input"
                            pattern="[0-9]{4}"
                        />
                        {msg.errorMsg && (
                            <p style={{ marginBottom: '.5em' }}>
                                {msg.errorMsg}&nbsp;
                                <span
                                    style={{
                                        cursor: 'pointer',
                                        color: '#d97e79',
                                        textDecoration: 'underline'
                                    }}
                                    onClick={handleOtpRequest}
                                >
                                    Click to resend
                                </span>
                            </p>
                        )}
                        <Button
                            disabled={otpLoading}
                            onClick={handleLoginBtn}
                        >
                            LOGIN
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
