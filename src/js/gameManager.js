export default class GameManager {
  gameWords;
  wordIterator;
  currentWord;
  gameResult;

  constructor() {
    this.gameWords = [];
    this.wordIterator = null;
    this.currentWord = null;
    this.gameResult = [];
  }

  load(words) {
    const isLoad = words && Array.isArray(words);
    this.gameWords = isLoad ? words : [];
    this.wordIterator = this.gameWords.values();
    this.currentWord = null;
  }

  nextWord() {
    this.currentWord = this.wordIterator ? this.wordIterator.next() : null;
    return this.currentWord;
  }

  markAnswerTime(time) {
    if (this.currentWord
      && this.currentWord.hasOwnProperty('value')
      && this.currentWord.value.hasOwnProperty('second')) {
      const answerTime = (this.currentWord.value.second - time);
      this.gameResult.push(answerTime);
      return true;
    }
    return false;
  }

  averageAnswerTime() {
    if (this.gameResult && this.gameResult.length) {
      const sum = this.gameResult.reduce((sum, answerTime) => sum + answerTime, 0);
      return sum ? Math.floor(sum / this.gameResult.length) : 0;
    } else {
      return 0;
    }
  }
}
