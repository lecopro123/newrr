import * as types from '../types'

const isLoggedIn = () => {
    const authorizationToken = localStorage.getItem('logged_in')
    if (authorizationToken === null) return false
    return JSON.parse(localStorage.getItem('logged_in'))
}

const retriveUser = () => {
    const user_info = localStorage.getItem('user_info')
    if (user_info === null) return {}
    return JSON.parse(localStorage.getItem('user_info'))
}

const initialState = {
    isLoggedIn: isLoggedIn(),
    user: isLoggedIn() ? retriveUser() : {},
    info: {},
    OTP: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.OTP_REQUEST:
            return {
                ...state,
                OTP: action.OTP
            }
        case types.OTP_VERIFICATION_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.user
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
        case types.GOT_USER_INFO:
            return {
                ...state,
                info: action.info
            }
        default:
            return state
    }
}

export default reducer
