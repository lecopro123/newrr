import * as types from '../types'

const validCredentials = () => {
    const authorizationToken = localStorage.getItem('OTP')
    if (authorizationToken === null) return false
    return true
}

const initialState = {
    isLoggedIn: validCredentials(),
    error: 0,
    is_old: 0,
    OTP: validCredentials() ? localStorage.getItem('OTP') : '',
    response: 0,
    message: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.OTP_REQUEST:
            return {
                ...state,
                error: action.error,
                is_old: action.is_old,
                OTP: action.OTP,
                response: action.response,
                message: action.message
            }
        case types.OTP_VERIFICATION_SUCCESS:
            return {
                ...state,
                isLoggedIn: true
            }
        case types.OTP_VERIFICATION_FAILURE:
            return {
                ...state,
                isLoggedIn: false
            }
        case types.USER_LOGGED_OUT:
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            return state
    }
}

export default reducer
