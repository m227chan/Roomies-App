describe("getOwedSummary API", () => {

  // Define test data
  const testData = {
    firebaseUID: "UM5BGLRCgHTikMr0qhTAjCcXutD2",
    firstName: "Zach",
    lastName: "Zammit",
    owed: -4323.57, 
  };
  
  it("returns the correct amount owed to the user", () => {
    const testFirebaseUID = testData.firebaseUID; // Use the test data for input
    cy.request({
      method: "POST",
      url: "/api/getOwedSummary",
      body: {
        user: testFirebaseUID,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("express");

      const summary = JSON.parse(response.body.express);
      expect(summary).to.be.an("array");
      expect(summary.length).to.eq(1);

      const userSummary = summary[0];
      expect(userSummary).to.have.property("firstName");
      expect(userSummary).to.have.property("lastName");
      expect(userSummary).to.have.property("owed");

      expect(userSummary.firstName).to.eq(testData.firstName);
      expect(userSummary.lastName).to.eq(testData.lastName);
      expect(userSummary.owed).to.eq(testData.owed);
    });
  });

  after(() => {
    // Remove test data from database 
    // Delte User and Delete Room not set-up yet
  });
});
