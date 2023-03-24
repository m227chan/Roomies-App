describe("Short Exchange API", () => {
  it("Returns the correct transaction", () => {
    const firebaseUID = "hIISXmD4J0S5ARMTk3RC5Wpbq1O2";
    const requestBody = { firebaseUID };
    const roommate1 = "Matthew Chan";
    const roommate2 = "Kendall Chan";
    const roommate3 = "Zach Zammit";
    const roommate4 = "Max Horbik";
    const roommate5 = "Sun Thapa";

    cy.request("POST", "/api/shortExchange", requestBody).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("express");

      const transaction = response.body.express;
      expect(transaction).to.include("pays");
      expect(transaction).to.include("$");
      expect(transaction).to.include(roommate1);
      expect(transaction).to.include(roommate2);
      expect(transaction).to.include(roommate3);
      expect(transaction).to.include(roommate4);
      expect(transaction).to.include(roommate5);

    });
  });
});