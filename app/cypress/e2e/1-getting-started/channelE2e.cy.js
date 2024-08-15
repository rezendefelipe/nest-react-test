/// <reference types="cypress" />
describe('End-to-End Test for Channel Management', () => {

  const nameChannel = 'New Channel Cypress';

  describe('Just visit e2e test', () => {
    it('should visit', () => {
      cy.visit('http://localhost:5173/')
    })
  })

  describe('Create new channe', () => {
    it('should create, view, and delete a channel', () => {
      cy.contains('Create Channel').click();
      cy.get('input[placeholder="Name"]').type(nameChannel);
      cy.get('input[placeholder="Description"]').type('Channel for testing E2E');
      cy.get('button').contains('Save').click();
      cy.contains('Channel created').should('exist');
    });
  })

  describe('Should enter in view to new channel', () => {
    it('should create, view, and delete a channel', () => {
      cy.get(`[data-testid="btn-view-${nameChannel.split(' ').join('-')}"]`).click();
      cy.get('[data-testid="name"]').should('contain', `Name: ${nameChannel}`);
      cy.get('[data-testid="description"]').should('contain', 'Description: Channel for testing E2E');
    });
  })

  describe('Should go back and delete channel', () => {
    it('should go back', () => {
      cy.contains('Go Back').click();
    });

    it('should delete new channer', () => {
      cy.get(`[data-testid="btn-delete-${nameChannel.split(' ').join('-')}"]`).click();
      cy.get('button').contains('Confirm').click();
      cy.contains('New Channel').should('not.exist');
      cy.contains('Channel deleted').should('exist');
    });
  })

});
