import { combineReducers } from 'redux'
import articlesbyReducer from './articlesbyReducer'
import articlesReducer from './articlesReducer'
import categoriesReducer from './categoriesReducer'
import userReducer from './userReducer'

export default combineReducers({
    articles: articlesReducer,
    categories: categoriesReducer,
    articlesby: articlesbyReducer,
    user: userReducer
})
