import * as types from '../types'

const initialState = {
    data: [],
    error: null,
    coll: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_ART_INFO_s:
            var col = action.info.map(ar => ar.id)
            return {
                ...state,
                data: action.info.map(ar => ar.id),
                coll: state.coll.concat(col),
                error: null
            }
        /*case types.Coin_op_f:
            return {
                ...state,
                data: [],
                error: action.info
            }*/
        default:
            return state
    }
}

export default reducer
