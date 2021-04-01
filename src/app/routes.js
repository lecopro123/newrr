import Category from './views/Category/Category'
import Home from './views/Home/Home'
import Root from './views/Root/Root'
import Bus from './views/Tacos/Bus/Bus'
import Cart from './views/Tacos/Cart/Cart'
import TacosConfig from './views/Tacos/tacosConfig'

export const routes = [
    {
        path: '/',
        exact: true,
        component: Root
    },
    {
        path: '/category/:category/:id/',
        component: Category
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/tacos',
        component: TacosConfig,
        routes: [
            {
                path: '/tacos/bus',
                component: Bus
            },
            {
                path: '/tacos/cart',
                component: Cart
            }
        ]
    }
]
