import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { SWRConfig } from "swr";

import App from "./App";
import Loader from "./components/Loader";

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

describe("On API response", () => {
  test("renders the error message on API failure", async () => {
    // Mock the axios.get() method to return a rejected promise
    axios.get.mockRejectedValueOnce(new Error("API request failed"));

    // Render the component with the SWRConfig and the mocked API response

    render(
      <Router>
        <SWRConfig value={{ dedupingInterval: 0 }}>
          <App>
            <Loader />
          </App>
        </SWRConfig>
      </Router>
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      // Wait for the error message to render
      await waitFor(() => {
        const errorMessage = screen.getByText("Oops, something went wrong.");
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  test("renders the loader component", async () => {
    const mockData = [];

    // Mock the axios.get() method to return a successful response
    axios.get.mockResolvedValueOnce({ data: mockData });

    // Render the component with the SWRConfig and the mocked API response
    render(
      <Router>
        <SWRConfig value={{ dedupingInterval: 0 }}>
          <App>
            <Loader />
          </App>
        </SWRConfig>
      </Router>
    );

    // Wait for the Loader component to render
    await waitFor(() => {
      const noEmployeesMessage = screen.queryByText("No employees found...");
      expect(noEmployeesMessage).toBeInTheDocument();
    });
  });

  test("renders employee data if succesful", async () => {
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
