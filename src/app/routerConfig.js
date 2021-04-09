import React from 'react'
import { useSelector } from 'react-redux'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom'
import { NotFound } from './components/common'
import { routes } from './routes'

export default function RouterConfig() {
    return (
        <Router>
            <div>
                {/* ALL_ROUTES_WITH_LINK

                    <ul style={{ backgroundColor: "teal" }}>
                        {routes.map((route, i) => (
                            <li key={i}>
                                <Link to={route.path}>{route.path}</Link>
                                {route.routes && (
                                    <ul>
                                        {route.routes.map((route, i) => (
                                            <li key={i}>
                                                <Link to={route.path}>
                                                    {route.path}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul> 
                */}

                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}

                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export function RouteWithSubRoutes(route) {
    if (route.private) {
        return (
            <PrivateRoute
                exact={route.exact}
                path={route.path}
                render={(props) => (
                    // pass the sub-routes down to keep nesting
                    <route.component
                        {...props}
                        routes={route.routes}
                    />
                )}
            />
        )
    } else
        return (
            <Route
                exact={route.exact}
                path={route.path}
                render={(props) => (
                    // pass the sub-routes down to keep nesting
                    <route.component
                        {...props}
                        routes={route.routes}
                    />
                )}
            />
        )
}

function PrivateRoute({ exact, path, render, ...rest }) {
    const auth = useSelector((state) => state.user)

    return (
        <Route
            exact={exact}
            path={path}
            {...rest}
            render={({ location }) =>
                auth.isLoggedIn ? (
                    render()
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}
