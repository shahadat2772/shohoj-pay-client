import ResetPassword from "../ResetPassword/ResetPassword";
import { render, screen } from "@testing-library/react";
test("Login Heading", () => {
  render(<ResetPassword />);
  const resetHeading = screen.getByTestId(/reset-pass/i);
  expect(resetHeading).toBeInTheDocument();
});
it("Renders reset properly", () => {
  render(<ResetPassword />);
  const emailLabel = screen.getByLabelText(/Email/i);
  expect(emailLabel).toBeInTheDocument();
  const inputEmail = screen.getByLabelText(/Email/i);
  expect(inputEmail).toHaveAttribute("type", "email");
});
