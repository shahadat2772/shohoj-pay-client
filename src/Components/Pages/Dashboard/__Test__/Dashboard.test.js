import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard";
const mockDashboard = () => {
  return (
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
};
// RESIZEOBSERVER ERROR
test("Rendering Dashboard section", () => {
  render(mockDashboard());
  const dashboard = screen.getByTestId("user-name");
  expect(dashboard).toBeInTheDocument();
});
