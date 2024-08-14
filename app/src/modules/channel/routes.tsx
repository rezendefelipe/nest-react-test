import { RouteObject } from 'react-router-dom';
import ChannelScreen from './screens/ChannelScreen';

export const channelScreenRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ChannelScreen />,
    errorElement: <div>Página não encontrada</div>,
  },
];
