import { RouteObject } from 'react-router-dom';

import SecretPage from './screens/SecretPage';

export const secretRoutes: RouteObject[] = [
  {
    path: '/secret',
    element: <SecretPage />,
  },
];
