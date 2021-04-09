import * as endpoint from '../../api/endpoints'
import fetchEndpoints from '../../api/fetchEndpoints'
import categorydata from '../../app/assets/category-detailed.json'
import * as types from '../types'

export const getArticleCategories = (local = false) => (dispatch) =>
    !local
        ? fetchEndpoints(
              `${endpoint.ARTICLE_CATEGORIES}?format=json`
          ).then((res) => {
              dispatch({
                  type: types.GET_ARTICLE_CATEGORIES,
                  data: res.data,
                  error: res.error
              })
          })
        : dispatch({
              type: types.GET_ARTICLE_CATEGORIES,
              data: categorydata,
              error: 0
          })

export const getReadArticles = (cb, options = { page: 1 }) => (
    dispatch
) =>
    fetchEndpoints(
        `${endpoint.READ_ARTICLES}?format=json&page=${options.page}`
    ).then((res) => {
        dispatch({
            type:
                options.page > 1
                    ? types.GET_MORE_ARTICLES
                    : types.GET_ARTICLES,
            data: res.data,
            error: res.error,
            page: options.page,
            page_total: res.page_total
        })
        cb()
    })

export const getArticleById = (cb, options = { id: 132 }) => (
    dispatch
) =>
    fetchEndpoints(
        `${endpoint.READ_ARTICLES}?format=json&id=${options.id}`
    ).then((res) => {
        dispatch({
            type: types.GOT_SINGLE_ARTICLE,
            data: res.data,
            error: res.error,
            article_id: options.id
        })
        cb()
    })

export const getArticlesBy = (
    cb,
    by = { type: 'source', value: 'Policy' },
    options = { id: 5, page: 1, query: 'elon' }
) => (dispatch) => {
    if (by.type === 'source') {
        fetchEndpoints(
            `${endpoint.ARTICLE_SOURCES}?format=json&s_id=${options.id}`
        ).then((res) => {
            dispatch({
                page: options.page,
                type:
                    options.page > 1
                        ? types.GOT_MORE_ARTICLES_BY_SOURCE
                        : types.GOT_ARTICLES_BY_SOURCE,
                data: res.data,
                error: res.error,
                page_total: res.page_total,
                source_type: by.type,
                source_value: by.value
            })
            cb()
        })
    } else if (by.type === 'category') {
        fetchEndpoints(
            `${endpoint.ARTICLE_CATEGORIES}${options.id}/?format=json&page=${options.page}`
        ).then((res) => {
            dispatch({
                page: options.page,
                type:
                    options.page > 1
                        ? types.GOT_MORE_ARTICLES_BY_CATEGORY
                        : types.GOT_ARTICLES_BY_CATEGORY,
                data: res.data,
                error: res.error,
                page_total: res.page_total,
                source_type: by.type,
                source_value: by.value
            })
            cb()
        })
    } else if (by.type === 'query') {
        fetchEndpoints(
            `${endpoint.ARTICLE_SEARCH}?format=json&q=${by.value}`
        ).then((res) => {
            dispatch({
                page: options.page,
                type:
                    options.page > 1
                        ? types.GOT_MORE_ARTICLES_BY_CATEGORY
                        : types.GOT_ARTICLES_BY_CATEGORY,
                data: res.data,

                // * NO PAGE AND ERROR RETURED FROM API (Needed Fix)
                // error: res.error,
                // page_total: res.page_total,

                source_type: by.type,
                source_value: by.value
            })
            cb()
        })
    }
}

export const toogleBookmark = (id = 132) => (dispatch) => {
    let ids = JSON.parse(localStorage.getItem('Bookmarks')) || []
    if (ids.includes(id)) {
        ids = ids.filter((x) => x !== id)
        localStorage.setItem('Bookmarks', JSON.stringify(ids))

        dispatch({ type: types.ADD_REMOVE_BOOKMARK, ids })
    } else {
        ids.push(id)
        localStorage.setItem('Bookmarks', JSON.stringify(ids))
        dispatch({
            type: types.ADD_REMOVE_BOOKMARK,
            ids,
            page_total: Math.ceil(ids.length / 2),
            page: 1
        })
    }
}

export const fetchBookmarks = (
    cb,
    options = { ids: [], page: 1 }
) => (dispatch) => {
    if (options.page > options.ids.length || options.page < 1) {
        return cb()
    }

    function indexIds(ids, per_page = 2) {
        let tempArray = []

        for (let i = 0; i < ids.length; i += per_page) {
            let myChunk = ids.slice(i, i + per_page)
            tempArray.push(myChunk)
        }

        return tempArray
    }

    let indexed = indexIds(options.ids)
    let data = []

    indexed[options.page - 1].forEach((id, i) =>
        fetchEndpoints(
            `${endpoint.READ_ARTICLES}?format=json&id=${id}`
        ).then((res) => {
            data.push(res.data[0])
            if (i === indexed[options.page - 1].length - 1) {
                dispatch({
                    type:
                        options.page > 1
                            ? types.GET_MORE_BOOKMARKED_ARTICLES
                            : types.GET_BOOKMARKED_ARTICLES,
                    data,
                    page: options.page
                })
                cb()
            }
        })
    )
}
