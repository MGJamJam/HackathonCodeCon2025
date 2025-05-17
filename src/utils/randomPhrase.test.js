import { randomPhrase } from "./randomPhrase";

describe("randomWord", () => {
  it("deve gerar apenas letras minúsculas", () => {
    const frase = randomPhrase();
    const palavras = frase.split(" ");
    palavras.forEach((word) => {
      expect(word).toMatch(/^[a-z]+$/);
    });
  });

  it("cada palavra deve alternar vogais após consoantes", () => {
    const frase = randomPhrase();
    const consonant = "bcdfghjklmnpqrstvwxyz";
    const vowels = "aeiou";
    const palavras = frase.split(" ");
    palavras.forEach((word) => {
      for (let i = 1; i < word.length; i++) {
        if (consonant.includes(word[i - 1])) {
          expect(vowels.includes(word[i])).toBe(true);
        }
      }
    });
  });

  it("deve gerar palavras com tamanho entre 2 e 10", () => {
    const frase = randomPhrase();
    const palavras = frase.split(" ");
    palavras.forEach((word) => {
      expect(word.length).toBeGreaterThanOrEqual(2);
      expect(word.length).toBeLessThanOrEqual(10);
    });
  });

  it("deve gerar frases com pelo menos 2 palavras", () => {
    const frase = randomPhrase();
    const palavras = frase.split(" ");
    expect(palavras.length).toBeGreaterThanOrEqual(2);
  });
});
