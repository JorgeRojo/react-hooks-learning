import Home from '../pages/Home/Home';
import Counter from '../pages/Counter/Counter';
import Api from '../pages/Api/Api';

const routesConfig = [
  {
    data: { menuOrder: 10, menuTitle: 'Counter' },
    path: '/counter',
    component: Counter,
    exact: false,
  },
  {
    data: { menuOrder: 0, menuTitle: 'Home' },
    path: '/',
    component: Home,
    exact: true,
  },
  {
    data: { menuOrder: 20, menuTitle: 'Api' },
    path: '/api',
    component: Api,
    exact: true,
  },
];

export default routesConfig;
