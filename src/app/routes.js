import ArticlesConfig from './views/Articles/articlesConfig'
import ByCategory from './views/Articles/ByCategory/bycategory'
import ByQuery from './views/Articles/ByQuery/byquery'
import BySource from './views/Articles/BySource/bysource'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Read from './views/Read/Read'
import Bookmarks from './views/User/Bookmarks/Bookmarks'
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
            }
        ]
    }
]
