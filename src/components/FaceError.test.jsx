import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FaceError } from "./FaceError";

describe("FaceError", () => {
  it("deve renderizar a mensagem de erro botânico", () => {
    render(<FaceError />);

    const mensagem = screen.getByText(/traição botânica detectada/i);
    expect(mensagem).toBeTruthy();
  });
});
