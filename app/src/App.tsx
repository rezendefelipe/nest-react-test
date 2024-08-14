import type { Router as RemixRouter } from '@remix-run/router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { createTheme, MantineProvider } from "@mantine/core";
import { channelScreenRoutes } from './modules/channel/routes';
import { HeaderComponent } from './shared/components/header';

const router: RemixRouter = createBrowserRouter([
  ...channelScreenRoutes,
]);

const theme = createTheme({
  fontFamily: 'Verdana, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Greycliff CF, sans-serif' },
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <HeaderComponent></HeaderComponent>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default App
