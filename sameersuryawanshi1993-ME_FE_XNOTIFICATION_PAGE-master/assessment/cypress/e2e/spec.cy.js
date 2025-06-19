import 'cypress-real-events/support';

describe('Notifications Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081'); // Adjust the path to your HTML file
  });

  it('should display the main elements', () => {
    cy.get('main').should('be.visible');
    cy.get('header').should('be.visible');
    cy.get('.notifications-counter').should('be.visible');
    cy.get('.mark-all-button').should('be.visible');
    cy.get('footer').should('be.visible');
  });

  it('should display notifications list', () => {
    cy.get('main ul#list').should('be.visible');
    cy.get('main ul li').should('have.length', 7); 
  });

  it('should mark notifications as read', () => {
    cy.get('.mark-all-button').click();
    cy.get('.notifications-counter').should('have.text', '0');
    cy.get('main ul li').should('not.have.class', 'new-notification');
    cy.get('.notification-dot').should('not.be.visible');
  });

  it('should display notification details', () => {
    cy.get('main ul li').first().as('firstNotification');
    cy.get('@firstNotification').find('img').should('be.visible');
    cy.get('@firstNotification').find('.notification-infos').should('be.visible');
    cy.get('@firstNotification').find('.notification-text').should('be.visible');
    cy.get('@firstNotification').find('.notification-link-post').should('be.visible');
  });

  it('should hide private messages initially', () => {
    cy.get('.notification-text-private-message').should('not.be.visible');
  });

  it('should show private messages on click', () => {
    cy.get('main ul li').eq(3).click(); // Assuming index 3 has a private message
    cy.get('.notification-text-private-message').should('be.visible');
  });

  it('should navigate to profiles and posts on click', () => {
    cy.get('main ul li').first().find('.profile-link').click(); 
    cy.url().should('include', '#'); 
    cy.go('back');

    cy.get('main ul li').first().find('.notification-link-post').click();
    cy.url().should('include', '#');
  });

  it('should have correct font family applied', () => {
    cy.get('body').should('have.css', 'font-family', '"Plus Jakarta Sans", sans-serif');
  });
});
