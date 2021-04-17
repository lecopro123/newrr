import { Switch } from 'react-router-dom'
import { RouteWithSubRoutes } from '../../routerConfig'

const SubjectsConfig = ({ routes }) => {
    return (
        <Switch>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
    )
}

export default SubjectsConfig
