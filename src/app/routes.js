import ArticlesConfig from './views/Articles/articlesConfig'
import ByCategory from './views/Articles/ByCategory/bycategory'
import ByQuery from './views/Articles/ByQuery/byquery'
import BySource from './views/Articles/BySource/bysource'
import Login from './views/Login/Login'
import ReadArticle from './views/ReadArticle/ReadArticle'
import Root from './views/Root/Root'

export const routes = [
    {
        path: '/',
        exact: true,
        component: Root
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
        component: ReadArticle,
        private: true
    }
]
