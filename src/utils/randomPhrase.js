function randomWord() {
    let num = Math.floor(Math.random() * 10) + 1;
    let word = '';
    const consonant = 'bcdfghjklmnpqrstvwxyz';
    const vowels = 'aeiou';
    const syllable = consonant + vowels;
    const size = Math.floor(Math.random() * (num - 1)) + 2;


    for (let i = 0; i < size; i++) {
        if (i === 0) {
            word += syllable[Math.floor(Math.random() * syllable.length)];
        } else {
            const previous = word[i - 1];
            if (consonant.includes(previous)) {
                word += vowels[Math.floor(Math.random() * vowels.length)];
            } else {
                word += syllable[Math.floor(Math.random() * syllable.length)];
            }
        }
    }
    return word;
}

export function randomPhrase(){
  let num = Math.floor(Math.random() * 10) + 1;
  let phrase = [];
  const size = Math.floor(Math.random() * (num - 1)) + 2;

  for (let i = 0; i < size; i++) {
    phrase.push(randomWord());
  }
  return phrase.join(' ');
}
