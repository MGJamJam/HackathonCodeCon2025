// ImageRecognition.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImageRecognition } from "./ImageRecongnition";
import { MemoryRouter } from "react-router-dom";

vi.stubGlobal("navigator", {
  mediaDevices: {
    getUserMedia: vi.fn(() =>
      Promise.resolve({
        getTracks: () => [{ stop: vi.fn() }],
      }),
    ),
  },
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock da API
vi.mock("../utils/plantApi", () => ({
  default: vi.fn(() =>
    Promise.resolve({
      completed: true,
      result: { is_plant: { binary: true } },
    }),
  ),
}));

describe("ImageRecognition", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar sem erros e exibir o botão de iniciar", () => {
    render(
      <MemoryRouter>
        <ImageRecognition />
      </MemoryRouter>,
    );

    const botao = screen.getByRole("button", { name: /iniciar plantoversa/i });
    expect(botao).toBeTruthy();
  });
});
