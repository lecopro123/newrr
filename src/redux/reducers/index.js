import { combineReducers } from 'redux'
import articlesByCategoryReducer from './articlesByCategoryReducer'
import articlesReducer from './articlesReducer'
import categoriesReducer from './categoriesReducer'

export default combineReducers({
    articles: articlesReducer,
    categories: categoriesReducer,
    articlesbycategory: articlesByCategoryReducer
})
