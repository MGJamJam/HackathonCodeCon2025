const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR'; 
    speechSynthesis.speak(utterance);
  }

export default speak;