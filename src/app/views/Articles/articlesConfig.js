import { Switch } from 'react-router-dom'
import { RouteWithSubRoutes } from '../../routerConfig'

export default function ArticlesConfig({ routes }) {
    return (
        <Switch>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
    )
}
