import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ChatbotInterface from "./ChatbotInterface";
import { MemoryRouter } from "react-router-dom";

describe("ChatbotInterface", () => {
  it("renderiza sem quebrar", () => {
    const { container } = render(
      <MemoryRouter>
        <ChatbotInterface />
      </MemoryRouter>,
    );

    expect(container).toBeDefined();
  });
});
