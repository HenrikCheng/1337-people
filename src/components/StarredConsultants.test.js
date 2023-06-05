import { render, screen } from "@testing-library/react";
import StarredConsultants from "./StarredConsultants";

describe("StarredConsultants", () => {
  render(<StarredConsultants />);

  test("correct heading text is displayed", () => {
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Starred Consultants"
    );
  });

  test("renders with the correct className", () => {
    render(<StarredConsultants />);

    const headingElement = screen.getByRole("heading", {
      level: 2,
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
