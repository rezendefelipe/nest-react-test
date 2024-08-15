import { RouteObject } from 'react-router-dom';

import SecretPage from './screens/SecretPage';
import ProtectedRoutes from '../../shared/hooks/protectedRoutes';

export const secretRoutes: RouteObject[] = [
  {
    path: '/secret',
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/secret',
        element: <SecretPage />
      }
    ],
  },
];
