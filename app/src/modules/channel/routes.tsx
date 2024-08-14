import { RouteObject } from 'react-router-dom';
import ChannelScreen from './screens/ChannelScreen';
import ViewChannel from './components/viewChannel';
import NotFoundPage from '../../shared/components/NotFoundPage';

export const channelScreenRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ChannelScreen />,
    errorElement: <NotFoundPage />,
  },
  {
    path: 'view/:id',
    element: <ViewChannel />
  }
];
