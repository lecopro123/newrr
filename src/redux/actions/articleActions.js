import * as endpoint from '../../api/endpoints'
import fetchEndpoints from '../../api/fetchEndpoints'
import * as types from '../types'

export const getArticleCategories = () => (dispatch) =>
    fetchEndpoints(`${endpoint.ARTICLE_CATEGORIES}?format=json`).then(
        (res) => {
            console.log(res)
            dispatch({
                type: types.GET_ARTICLE_CATEGORIES,
                data: res.data,
                error: res.error
            })
        }
    )

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

export const getArticleByCategories = (
    cb,
    options = { page: 1, id: 2, category: '' }
) => (dispatch) =>
    fetchEndpoints(
        `${endpoint.ARTICLE_CATEGORIES}${options.id}/?format=json&page=${options.page}`
    ).then((res) => {
        dispatch({
            type:
                options.page > 1
                    ? types.GET_MORE_ARTICLE_BY_CATEGORIES
                    : types.GET_ARTICLE_BY_CATEGORIES,
            data: res.data,
            category: options.category,
            error: res.error,
            page: options.page,
            page_total: res.page_total
        })
        cb()
    })
