import * as endpoint from '../../api/endpoints'
import fetchEndpoints from '../../api/fetchEndpoints'
import * as types from '../types'

export const userLoginRequest = (
    cb,
    options = { phonenumber: 0 }
) => (dispatch) =>
    fetchEndpoints(
        `${endpoint.LOGIN_REQUEST}?format=json&phonenumber=${options.phonenumber}`
    ).then((res) => {
        if (res.error === 0) {
            dispatch({
                type: types.OTP_REQUEST,
                OTP: res.OTP
            })
            cb(true, res)
        } else cb(false, res)
    })

export const getUserInfo = (id) => (dispatch) =>
    fetchEndpoints(
        `${endpoint.LOGIN_REQUEST}${id}/?format=json`
    ).then((res) => {
        if (res.data) {
            dispatch({
                type: types.GOT_USER_INFO,
                info: res.data[0]
            })
            localStorage.setItem(
                'USERINFO',
                JSON.stringify(res.data[0])
            )
        }
    })

export const verifyOTPRequest = (
    cb,
    options = { userOTP: 0, phonenumber: 0, otpResponse: {} }
) => (dispatch) =>
    fetchEndpoints(
        `${endpoint.OTP_VERIFICATION}?format=json&phonenumber=${options.phonenumber}&otp=${options.userOTP}`
    ).then((res) => {
        if (res.verified) {
            dispatch({
                type: types.OTP_VERIFICATION_SUCCESS,
                user: options.otpResponse
            })
            localStorage.setItem('logged_in', true)
            localStorage.setItem(
                'user_info',
                JSON.stringify(options.otpResponse)
            )
            cb(true)
        } else {
            dispatch({ type: types.OTP_VERIFICATION_FAILURE })
            cb(false, 'Invalid OTP, try again!')
        }
    })

export const userLogOutRequest = (cb) => (dispatch) => {
    dispatch({ type: types.USER_LOGGED_OUT })
    localStorage.removeItem('logged_in')
    localStorage.removeItem('user_info')
    cb()
}
