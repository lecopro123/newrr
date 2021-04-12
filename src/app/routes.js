import ArticlesConfig from './views/Articles/articlesConfig'
import ByAuthor from './views/Articles/ByAuthor/byauthor'
import ByCategory from './views/Articles/ByCategory/bycategory'
import ByQuery from './views/Articles/ByQuery/byquery'
import BySource from './views/Articles/BySource/bysource'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Read from './views/Read/Read'
import SubjectContent from './views/Subjects/SubjectContent/SubjectContent'
import SubjectsConfig from './views/Subjects/SubjectsConfig'
import Subjects from './views/Subjects/SubjectsList/Subjects'
import Bookmarks from './views/User/Bookmarks/Bookmarks'
import Profile from './views/User/Profile/Profile'
import UserConfig from './views/User/userConfig'

/**
 * @property: @type
 *
 * path: String
 * component: <React.Component />
 * exact?: Boolean
 * private?: Boolean
 */

export const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/classnotes',
        component: SubjectsConfig,
        routes: [
            {
                path: '/classnotes/subjects',
                component: Subjects
            },
            {
                path: '/classnotes/:subject/:id/',
                component: SubjectContent
            }
        ]
    },
    {
        path: '/articles',
        component: ArticlesConfig,
        routes: [
            {
                path: '/articles/category/:category/:id/',
                component: ByCategory
            },
            {
                path: '/articles/source/:source/:id/',
                component: BySource
            },
            {
                path: '/articles/search',
                component: ByQuery
            },
            {
                path: '/articles/author/:author/:id/',
                component: ByAuthor
            }
        ]
    },
    {
        path: '/article/read/:id/',
        component: Read,
        private: true
    },
    {
        path: '/user',
        component: UserConfig,
        private: true,
        routes: [
            {
                path: '/user/bookmarks',
                component: Bookmarks
            },
            {
                path: '/user',
                component: Profile
            }
        ]
    }
]
