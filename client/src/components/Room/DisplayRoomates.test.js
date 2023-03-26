import { render, screen } from "@testing-library/react";
import DisplayRoomates from "./DisplayRoomates";
import "@testing-library/jest-dom";

describe("Testing if display roommates works", () => {
  const roomateData = [
    {
      firstName: "Sun",
      lastName: "Thapa",
      firebaseUID: "123",
    },
    {
      firstName: "Matt",
      lastName: "Chan",
      firebaseUID: "456",
    },
    {
      firstName: "Max",
      lastName: "Horbik",
      firebaseUID: "789",
    },
  ];

  const user = {
    uid: "123",
  };

  let displayRoomates;

  function renderComponent() {
    displayRoomates = jest.fn().mockName("displayRoomates");
    render(<DisplayRoomates roomateData={roomateData} user={user} />);
  }

  it("displays roommates except for the current user", () => {
    renderComponent();
    expect(screen.getByText("ROOMMATES")).toBeInTheDocument();
    expect(screen.getByText("Matt Chan")).toBeInTheDocument();
    expect(screen.getByText("Max Horbik")).toBeInTheDocument();
    expect(screen.queryByText("Sun Thapa")).not.toBeInTheDocument();
  });
});
