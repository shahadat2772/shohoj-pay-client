import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login/Login";
const mockLogin = () => {
  return (
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};
test("Login Heading", () => {
  render(mockLogin());
  const loginHeading = screen.getByTestId("login-heading");
  expect(loginHeading).toBeInTheDocument();
});
it("Renders form properly", () => {
  render(mockLogin());
  const emailLabel = screen.getByLabelText(/Email/i);
  const passwordLabel = screen.getByLabelText(/Password/i);
  expect(emailLabel).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();
  const inputEmail = screen.getByLabelText(/email/i);
  expect(inputEmail).toHaveAttribute("type", "email");
  const inputPass = screen.getByLabelText(/Password/i);
  expect(inputPass).toHaveAttribute("type", "password");
});
