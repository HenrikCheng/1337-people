import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import axios from "axios";
import { SWRConfig } from "swr";

// Mock the axios module
jest.mock("axios");

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

describe("If no data is present", () => {
  test("Show loader component", () => {
    render(
      <Router>
        <App />
      </Router>
    );
  });
});

describe("If error", () => {
  test("Show error component", () => {
    render(
      <Router>
        <App />
      </Router>
    );
  });
});

describe("On API response", () => {
  // test("renders error component on error")

  test("renders employee data if succesfull", async () => {
    const mockData = [
      {
        id: 1,
        name: "John Doe",
        email: "johndoe@gmail.com",
        phoneNumber: "+46701235050",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "janesmith@gmail.com",
        phoneNumber: "+46720133700",
      },
    ];

    // Mock the axios.get() method to return a successful response
    axios.get.mockResolvedValueOnce({ data: mockData });

    // Render the component with the SWRConfig and the mocked API response
    render(
      <Router>
        <SWRConfig value={{ dedupingInterval: 0 }}>
          <App />
        </SWRConfig>
      </Router>
    );

    // Wait for the component to fetch the data
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    // Additional assertions in separate waitFor calls
    await waitFor(() => {
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });
});
