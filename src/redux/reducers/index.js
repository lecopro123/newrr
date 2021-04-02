import { combineReducers } from 'redux'
import articlesByCategoryReducer from './articlesByCategoryReducer'
import articlesReducer from './articlesReducer'
import categoriesReducer from './categoriesReducer'
import userReducer from './userReducer'

export default combineReducers({
    articles: articlesReducer,
    categories: categoriesReducer,
    articlesbycategory: articlesByCategoryReducer,
    user: userReducer
})
