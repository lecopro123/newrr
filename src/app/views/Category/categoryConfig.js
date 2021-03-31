import { Switch } from "react-router";
import { RouteWithSubRoutes } from "../../routerConfig";

export default function CategoryConfig({ routes }) {
    return (
        <div>
            Tacos Page
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </div>
    );
}
