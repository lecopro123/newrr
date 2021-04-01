import * as types from '../types'

const initialState = {
    data: [],
    error: 0,
    page: 0,
    page_total: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ARTICLE_BY_CATEGORIES:
            return {
                ...state,
                data: action.data,
                error: action.error,
                page: action.page,
                page_total: action.page_total
            }
        case types.GET_MORE_ARTICLE_BY_CATEGORIES:
            return {
                ...state,
                data: [...state.data, ...action.data],
                error: action.error,
                page: action.page,
                page_total: action.page_total
            }
        default:
            return state
    }
}

export default reducer
