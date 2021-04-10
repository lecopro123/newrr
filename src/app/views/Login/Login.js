import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import {
    userLoginRequest,
    verifyOTPRequest
} from '../../../redux/actions/userActions'
import logo from '../../assets/logo.png'
import { Button, InputField, Loader } from '../../components/ui'
import './Login.scss'

export default function Login(props) {
    let dispatch = useDispatch()
    let history = useHistory()
    let location = useLocation()
    let { from } = location.state || { from: { pathname: '/' } }
    let loginData = useSelector((state) => state.user)

    const [phone, setPhone] = useState(null)
    const [OTP, setOTP] = useState(null)
    const [hasOTP, setHasOTP] = useState(false)
    const [otpLoading, setOtpLoading] = useState(false)
    const [verifyingOtp, setVerifyingOtp] = useState(false)
    const [msg, setMsg] = useState({ loadingMsg: '', errorMsg: '' })

    function callback() {
        console.log('OTP_RECEIVED')
        setHasOTP(true)
        setOtpLoading(false)
        setVerifyingOtp(false)
        setMsg({ errorMsg: `Didn't receive?` })
    }

    const handleOtpRequest = () => {
        setOtpLoading(true)
        setMsg({ loadingMsg: 'Sending OTP' })
        setVerifyingOtp(true)
        dispatch(userLoginRequest(callback, { phonenumber: phone }))
    }

    function verifyCallback(success) {
        if (success) {
            setTimeout(() => {
                history.replace(from)
            }, 100)
        } else {
            setMsg({ errorMsg: 'Invalid OTP, try again!' })
            setVerifyingOtp(false)
        }
    }

    const handleLoginBtn = () => {
        setVerifyingOtp(true)
        setMsg({ loadingMsg: 'Verifying OTP' })
        dispatch(
            verifyOTPRequest(verifyCallback, {
                userOTP: OTP,
                phonenumber: phone
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
                    <div>Welcome To</div>
                    <img className="sidebar-logo" src={logo} alt="" />
                    <div className="sidebar-text">
                        Login to read smarticles, explore class notes
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

                        <InputField
                            onChange={(e) => setPhone(e.target.value)}
                            type="number"
                            placeholder="Your phone number"
                            className="input"
                            pattern="[1-9]{1}[0-9]{9}"
                        />

                        <Button onClick={handleOtpRequest}>
                            GET OTP
                        </Button>
                    </div>
                ) : verifyingOtp ? (
                    <div className="col">
                        <Loader style={{ marginBottom: '12px' }} />
                        {loginData.isLoggedIn ? (
                            <p>OTP Verification Succesful</p>
                        ) : (
                            <p>{msg.loadingMsg}</p>
                        )}
                    </div>
                ) : (
                    <div className="col">
                        <div className="sidebar-text">
                            Enter OTP Here {loginData.OTP}
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
