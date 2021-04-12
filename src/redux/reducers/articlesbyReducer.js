import * as types from '../types'

const initialState = {
    data: [],
    from: {
        type: '',
        value: ''
    },
    error: 0,
    page: 0,
    page_total: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GOT_ARTICLES_BY_AUTHOR:
            return {
                ...state,
                data: action.data,
                error: action.error,
                from: {
                    type: action.source_type,
                    value: action.source_value
                },
                page: action.page,
                page_total: action.page_total
            }
        case types.GOT_MORE_ARTICLES_BY_AUTHOR:
            return {
                ...state,
                data: [...state.data, ...action.data],
                error: action.error,
                page: action.page,
                from: {
                    type: action.source_type,
                    value: action.source_value
                },
                page_total: action.page_total
            }
        case types.GOT_ARTICLES_BY_CATEGORY:
            return {
                ...state,
                data: action.data,
                error: action.error,
                from: {
                    type: action.source_type,
                    value: action.source_value
                },
                page: action.page,
                page_total: action.page_total
            }
        case types.GOT_MORE_ARTICLES_BY_CATEGORY:
            return {
                ...state,
                data: [...state.data, ...action.data],
                error: action.error,
                page: action.page,
                from: {
                    type: action.source_type,
                    value: action.source_value
                },
                page_total: action.page_total
            }
        case types.GOT_ARTICLES_BY_SOURCE:
            return {
                ...state,
                data: action.data,
                error: action.error,
                from: {
                    type: action.source_type,
                    value: action.source_value
                },
                page: action.page,
                page_total: action.page_total
            }
        case types.GOT_MORE_ARTICLES_BY_SOURCE:
            return {
                ...state,
                data: [...state.data, ...action.data],
                error: action.error,
                page: action.page,
                from: {
                    type: action.source_type,
                    value: action.source_value
                },
                page_total: action.page_total
            }
        case types.GOT_ARTICLES_BY_QUERY:
            return {
                ...state,
                data: action.data,
                error: action.error,
                from: {
                    type: action.source_type,
                    value: action.source_value
                },
                page: action.page,
                page_total: action.page_total
            }
        case types.GOT_MORE_ARTICLES_BY_QUERY:
            return {
                ...state,
                data: [...state.data, ...action.data],
                error: action.error,
                page: action.page,
                from: {
                    type: action.source_type,
                    value: action.source_value
                },
                page_total: action.page_total
            }
        default:
            return state
    }
}

export default reducer
