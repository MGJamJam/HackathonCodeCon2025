const speak = (text) => {
  const allVoices = speechSynthesis.getVoices();
  const randomVoice = allVoices[Math.floor(Math.random() * allVoices.length)];

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = randomVoice;
  utterance.lang = "pt-BR";

  speechSynthesis.speak(utterance);
};

export default speak;
