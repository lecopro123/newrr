import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import { PrivateRoute } from './auth/auth'
import NotFound from './auth/notfound'
import { routes } from './routes'

export default function RouterConfig() {
    return (
        <Router>
            <div>
                {/* <ul style={{ backgroundColor: "teal" }}>
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
                </ul> */}

                {/* <NavBar /> */}

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
            <PrivateRoute path={route.path}>
                <route.component />
            </PrivateRoute>
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
