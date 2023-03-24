describe('Room Landing Test', () => {
  it('can view the home pageIt can view the Home Page of a room', () => {
    cy.visit('/Room');
    cy.contains('Organize all your roommate needs all in one place. Remember to keep everything up-to-date!');
  });
});
