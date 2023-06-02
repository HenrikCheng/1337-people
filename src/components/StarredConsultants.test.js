import { render, screen } from "@testing-library/react";
import StarredConsultants from "./StarredConsultants";

describe("StarredConsultants", () => {
  render(<StarredConsultants />);

  test("correct headertext is displayed", () => {
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Starred Consultants"
    );
  });

  test("renders with the correct className", () => {
    render(<StarredConsultants />);

    const headingElement = screen.getByRole("heading", {
      name: /Starred Consultants/i,
    });

    expect(headingElement).toHaveClass(
      "text-2xl",
      "font-extrabold",
      "leading-none",
      "tracking-tight",
      "text-gray-900",
      "md:text-3xl"
    );
  });
});
