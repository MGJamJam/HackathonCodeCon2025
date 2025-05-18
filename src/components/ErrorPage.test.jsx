import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorPage } from "./ErrorPage";

describe("ErrorPage", () => {
  it("deve renderizar corretamente com título, mensagem e link", () => {
    render(<ErrorPage />);

    expect(
      screen.getByRole("heading", { name: /erro na comunicação vegetal/i }),
    ).toBeTruthy();

    expect(
      screen.getByText(/as plantas se recusaram a falar entre si/i),
    ).toBeTruthy();

    const link = screen.getByRole("link", { name: /tentar novamente/i });
    expect(link).toBeTruthy();
    expect(link.getAttribute("href")).toBe("/");
  });
});
