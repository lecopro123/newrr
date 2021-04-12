import * as types from '../types'

const initialState = {
    data: [],
    error: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GOT_ALL_SUBJECTS:
            return {
                ...state,
                data: action.data,
                error: action.error
            }
        default:
            return state
    }
}

export default reducer
