import Home from '../pages/Home/Home';
import Counter from '../pages/Counter/Counter';
import Posts from '../pages/Posts/Posts';

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
    data: { menuOrder: 20, menuTitle: 'Posts' },
    path: '/posts',
    component: Posts,
    exact: true,
  },
];

export default routesConfig;
