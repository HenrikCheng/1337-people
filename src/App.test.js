import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

describe("App", () => {
  test("app header rendered correctly", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const headerElement = screen.getByText(/The fellowship of/i);
    const spanElement = screen.getByText("Tretton37", { selector: "span" });
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveTextContent("Tretton37");
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent("The fellowship of");
  });
});

describe("If no users are fetched", () => {
  test("Show no user component", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const headerElement = screen.getByText(/The fellowship of/i);
    const spanElement = screen.getByText("Tretton37", { selector: "span" });
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveTextContent("Tretton37");
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent("The fellowship of");
  });

  // test("header is shown", () => {
  //   render(
  //     <Router>
  //       <App />
  //     </Router>
  //   );
  //   expect(screen.getByRole("heading", { name: /Hello/i })).toHaveTextContent(
  //     "Hello"
  //   );
  // });
});
