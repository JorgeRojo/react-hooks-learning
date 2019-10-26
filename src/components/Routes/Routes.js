import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import routesConfig from './routesConfig';
import RouteNoMatch from '../pages/RouteNoMatch/RouteNoMatch';

const sortMenuItems = (prev, next) => prev.data.menuOrder - next.data.menuOrder;

const Routes = () => {
  return (
    <Router>
      <nav style={{ position: 'absolute' }}>
        <ul>
          {routesConfig
            .sort(sortMenuItems)
            .map(({ path, data: { menuTitle } }, index) => (
              <li key={index}>
                <Link to={path}>{menuTitle}</Link>
              </li>
            ))}
        </ul>
      </nav>

      <Switch>
        {routesConfig.map(({ exact, path, component }, index) => (
          <Route key={index} {...{ exact, path, component }} />
        ))}
        <Route path="*" component={RouteNoMatch} />
      </Switch>
    </Router>
  );
};

export default Routes;
