import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../SignUp/SignUp";
const mockSignUp = () => {
  return (
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );
};
test("SignUp Heading", () => {
  render(mockSignUp());
  const signUp = screen.getByTestId("signUp-heading");
  expect(signUp).toBeInTheDocument();
});
it("Renders form properly", () => {
  render(mockSignUp());
  const nameLabel = screen.getByLabelText(/Name/i);
  const emailLabel = screen.getByLabelText(/Email/i);
  const confirmPassLabel = screen.getByLabelText(/Confirm Password/i);
  expect(nameLabel).toBeInTheDocument();
  expect(emailLabel).toBeInTheDocument();
  expect(confirmPassLabel).toBeInTheDocument();
  expect(nameLabel).toHaveAttribute("type", "text");
  expect(emailLabel).toHaveAttribute("type", "email");
  expect(confirmPassLabel).toHaveAttribute("type", "password");
  const submitBtn = screen.getByRole("submit");
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).toHaveAttribute("type", "submit");
});
