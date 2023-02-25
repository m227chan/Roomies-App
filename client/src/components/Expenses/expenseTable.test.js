import React from "react";
import renderer from "react-test-renderer";
import ExpenseTable from "./expenseTable";

describe("ExpenseTable", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ExpenseTable />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
