import { RouteObject } from 'react-router-dom';
import CreateUserScreen from './screens/CreateUserScreen';

export const createUserRoutes: RouteObject[] = [
  {
    path: '/create-user',
    element: <CreateUserScreen />,
  },
];
