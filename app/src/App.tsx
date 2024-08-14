import type { Router as RemixRouter } from '@remix-run/router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MantineProvider } from "@mantine/core";
import { channelScreenRoutes } from './modules/channel/routes';

const router: RemixRouter = createBrowserRouter([
  ...channelScreenRoutes,
]);

function App() {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default App
