/// <reference types="cypress" />

import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';
import DeleteChannelComponent from '../components/deleteChannelComponent';
import { GlobalProvider } from '../../../shared/hooks/useGlobalContext';
import { URL_CHANNELS } from '../../../shared/constants/urls';

describe('DeleteChannelComponent', () => {
  beforeEach(() => {
    const mockGetData = cy.stub().as('getData');

    const mockProps = {
      id: 1,
      getData: mockGetData,
    };

    cy.intercept('DELETE', `${URL_CHANNELS}/*`, { statusCode: 200 }).as('deleteChannel');

    cy.mount(
      <GlobalProvider>
        <MantineProvider>
          <MemoryRouter>
            <DeleteChannelComponent {...mockProps} />
          </MemoryRouter>
        </MantineProvider>
      </GlobalProvider>
    );
  });

  it('should close the modal when cancel button is clicked', () => {
    cy.get('button[aria-label="Settings"]').click();
    cy.get('button').contains('Cancelar').click();
    cy.get('.mantine-Modal-modal').should('not.exist');
  });

  it('should call deleteRequest and getData on confirm', () => {
    cy.get('button[aria-label="Settings"]').click();
    cy.get('button').contains('Confirm').click();

    cy.wait('@deleteChannel').its('response.statusCode').should('eq', 200);
    cy.get('@getData').should('have.been.called');
  });
});
