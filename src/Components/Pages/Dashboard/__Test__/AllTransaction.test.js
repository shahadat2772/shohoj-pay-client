import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AllTransaction from "../AllTransaction";
const mockSignUp = () => {
  return (
    <BrowserRouter>
      <AllTransaction />
    </BrowserRouter>
  );
};
test("All Transaction Heading", () => {
  render(mockSignUp());
  const transactionHeading = screen.queryByTestId("transaction-heading");
  expect(transactionHeading).not.toBeInTheDocument();
});
