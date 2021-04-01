import { Switch } from 'react-router-dom'
import { RouteWithSubRoutes } from '../../routerConfig'

export default function TacosConfig({ routes }) {
    return (
        <div>
            Tacos Page
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </div>
    )
}
