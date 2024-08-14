import { RouteObject } from 'react-router-dom';
import ChannelScreen from './screens/ChannelScreen';
import ViewChannel from './components/viewChannel';

export const channelScreenRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ChannelScreen />,
    errorElement: <div>Página não encontrada</div>,
  },
  {
    path: 'view/:id',
    element: <ViewChannel />
  }
];
