import * as types from '../types'

const initialState = {
    data: [],
    categories: {
        data: [],
        error: 0
    },
    error: 0,
    page: 0,
    page_total: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ARTICLES:
            return {
                ...state,
                data: action.data,
                error: action.error,
                page: action.page,
                page_total: action.page_total
            }
        case types.GET_ARTICLE_CATEGORIES:
            return {
                ...state,
                categories: {
                    data: action.data,
                    error: action.error
                }
            }
        case types.GET_MORE_ARTICLES:
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
