/// <reference types="cypress" />

import { MantineProvider } from '@mantine/core';
import { URL_CHANNELS } from "../../../shared/constants/urls";
import FormChannel from '../components/formChannel';
import { MemoryRouter } from 'react-router-dom';
import { GlobalProvider } from '../../../shared/hooks/useGlobalContext';

describe('FormChannel Component', () => {
  beforeEach(() => {
    const mockGetData = cy.stub().as('getData');

    const mockProps = {
      editValues: { id: null, name: '', description: '' },
      getData: mockGetData,
    };

    cy.intercept('POST', URL_CHANNELS, { statusCode: 200 }).as('postChannel');
    cy.intercept('PUT', `${URL_CHANNELS}/*`, { statusCode: 200 }).as('putChannel');

    cy.mount(
      <GlobalProvider>
        <MantineProvider>
          <MemoryRouter>
            <FormChannel {...mockProps}/>
          </MemoryRouter>
        </MantineProvider>
      </GlobalProvider>
    );
  });

  it('should display validation errors for empty fields', () => {
    cy.get('button').contains('Save').click();
    cy.get('.mantine-TextInput-error', { timeout: 10000 }).should('exist').and('contain', 'Name is required');
  });

  it('should display validation error for short name', () => {
    cy.get('input[placeholder="Name"]').type('A').blur();
    cy.get('button').contains('Save').click();
    cy.get('.mantine-TextInput-error').should('contain', 'Name is too short');
  });

  it('should call POST request when creating a channel', () => {
    cy.get('input[placeholder="Name"]').type('Channel Name');
    cy.get('input[placeholder="Description"]').type('Channel Description');
    cy.get('button').contains('Save').click();
    cy.wait('@postChannel').its('response.statusCode').should('eq', 200);
  });

  it('should call PUT request when editing a channel', () => {
    const editValues = { id: 1, name: 'Updated Channel Name', description: 'Updated Description' };

    cy.mount(
      <GlobalProvider>
        <MantineProvider>
          <MemoryRouter>
            <FormChannel editValues={editValues} getData={cy.stub().as('getData')} />
          </MemoryRouter>
        </MantineProvider>
      </GlobalProvider>
    );

    
    cy.get('input[placeholder="Name"]').clear().type('Updated Channel Name');
    cy.get('input[placeholder="Description"]').clear().type('Updated Description');
    cy.get('button').contains('Save').click();
    cy.wait('@putChannel').its('response.statusCode').should('eq', 200);
  });
});
