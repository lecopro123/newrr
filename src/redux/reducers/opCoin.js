import * as types from '../types'

const initialState = {
    data: [],
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.Coin_op_s:
            return {
                ...state,
                data: action.info,
                error: null
            }
        case types.Coin_op_f:
            return {
                ...state,
                data: [],
                error: action.info
            }
        default:
            return state
    }
}

export default reducer
