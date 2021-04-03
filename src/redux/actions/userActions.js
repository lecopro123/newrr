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
        dispatch({
            type: types.OTP_REQUEST,
            error: res.error,
            is_old: res.is_old,
            OTP: res.OTP,
            response: res.response,
            message: res.message
        })
        cb()
    })

export const verifyOTPRequest = (
    cb,
    options = { userOTP: 0, phonenumber: 0 }
) => (dispatch) =>
    fetchEndpoints(
        `${endpoint.OTP_VERIFICATION}?format=json&phonenumber=${options.phonenumber}&otp=${options.userOTP}`
    ).then((res) => {
        if (res.verified) {
            dispatch({ type: types.OTP_VERIFICATION_SUCCESS })
            localStorage.setItem('OTP', options.userOTP)
            cb(true)
        } else {
            dispatch({ type: types.OTP_VERIFICATION_FAILURE })
            cb(false)
        }
    })

// {
//     if (options.userOTP === options.serverOTP) {
//         dispatch({ type: types.OTP_VERIFICATION_SUCCESS })
//         localStorage.setItem('OTP', options.userOTP)
//     } else dispatch({ type: types.OTP_VERIFICATION_FAILURE })

//     cb()
// }

export const userLogOutRequest = (cb) => (dispatch) => {
    dispatch({ type: types.USER_LOGGED_OUT })
    localStorage.removeItem('OTP')
    cb()
}
