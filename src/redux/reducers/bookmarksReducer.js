import * as types from '../types'

const checkBookmarks = () => {
    const bookmarks = localStorage.getItem('Bookmarks')
    if (bookmarks === null) return false
    return true
}

const PER_PAGE = 2

const initialState = {
    hasBookmarks:
        checkBookmarks() === true &&
        JSON.parse(localStorage.getItem('Bookmarks')).length > 0
            ? true
            : false,
    ids: checkBookmarks()
        ? JSON.parse(localStorage.getItem('Bookmarks'))
        : [],
    data: [],
    page: 0,
    page_total: checkBookmarks()
        ? Math.ceil(
              JSON.parse(localStorage.getItem('Bookmarks')).length /
                  PER_PAGE
          )
        : 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_REMOVE_BOOKMARK:
            return {
                ...state,
                ids: action.ids,
                page_total: action.page_total,
                page: action.page
            }
        case types.GET_BOOKMARKED_ARTICLES:
            return {
                ...state,
                data: action.data,
                page: action.page
            }
        case types.GET_MORE_BOOKMARKED_ARTICLES:
            return {
                ...state,
                data: [...state.data, ...action.data],
                page: action.page
            }
        default:
            return state
    }
}

export default reducer
