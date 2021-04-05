import { Switch } from 'react-router-dom'
import { RouteWithSubRoutes } from '../../routerConfig'

const ArticlesConfig = ({ routes }) => (
    <Switch>
        {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
        ))}
    </Switch>
)

export default ArticlesConfig
