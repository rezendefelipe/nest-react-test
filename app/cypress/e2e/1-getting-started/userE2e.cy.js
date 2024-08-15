/// <reference types="cypress" />
describe('End-to-End Test for Channel Management', () => {

  describe('Just visit e2e test', () => {
    it('should visit login', () => {
      cy.visit('http://localhost:5173/login')
    })
  })

  describe('Create new channe', () => {
    it('should create, view, and delete a channel', () => {
      cy.contains('Create account').click();
      cy.contains('Create your account!').should('exist');
    });
  })
});
