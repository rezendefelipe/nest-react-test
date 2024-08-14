/// <reference types="cypress" />

import { MantineProvider } from '@mantine/core';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ViewChannel from '../components/viewChannel';
import { GlobalProvider } from '../../../shared/hooks/useGlobalContext';
import { URL_CHANNELS } from '../../../shared/constants/urls';
import { ChannelType } from '../types/ChannelType';

describe('ViewChannel Component', () => {
  const channelData: ChannelType = {
    id: 1,
    name: 'Channel Name',
    description: 'Channel Description',
  };

  beforeEach(() => {
    cy.intercept('GET', `${URL_CHANNELS}/1`, channelData).as('getChannel');

    cy.mount(
      <GlobalProvider>
        <MantineProvider>
          <MemoryRouter initialEntries={['/channel/1']}>
            <Routes>
              <Route path="/channel/:id" element={<ViewChannel />} />
            </Routes>
          </MemoryRouter>
        </MantineProvider>
      </GlobalProvider>
    );
  });

  it('should display channel data after loading', () => {
    cy.wait('@getChannel');

    cy.get('[data-testid="name"]').should('contain', channelData.name);
    cy.get('div').contains('Description:').should('contain', channelData.description);
  });
});
