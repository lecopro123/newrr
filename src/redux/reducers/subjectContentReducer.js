import * as types from '../types'

const initialState = {
    subject: {},
    data: [],
    error: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GOT_SUBJECT_CONTENTS:
            return {
                ...state,
                data: action.data,
                error: action.error,
                subject: action.subject
            }

        default:
            return state
    }
}

export default reducer
