import { combineReducers } from 'redux'
import articlesbyReducer from './articlesbyReducer'
import articlesReducer from './articlesReducer'
import bookmarksReducer from './bookmarksReducer'
import categoriesReducer from './categoriesReducer'
import instiReducer from './instiReducer'
import subjectContentReducer from './subjectContentReducer'
import subjectsReducer from './subjectsReducer'
import userReducer from './userReducer'

export default combineReducers({
    articles: articlesReducer,
    categories: categoriesReducer,
    articlesby: articlesbyReducer,
    user: userReducer,
    bookmarks: bookmarksReducer,
    subjects: subjectsReducer,
    subjectcontent: subjectContentReducer,
    institutions: instiReducer
})
