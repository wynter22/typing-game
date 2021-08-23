import gameService from '../api/gameService';
import GameManager from '../js/gameManager';

const ENTER_KEY = 'Enter';

export default class Game {
  isPlaying;
  gameTime;
  gameScore;
  gameManager;
  timer;

  constructor() {
    this.isPlaying = false;
    this.gameManager = null;
    this.gameScore = 0;
    this.gameTime = 0;
    this.timer = null;
  }

  render(el) {
    el.innerHTML = this.template();
    this.setEvent();
  }

  setEvent() {
    const button = document.querySelector('.game-button');
    button.innerText = '시작';
    button.addEventListener('click', this.toggleGameButton);

    const gameInput = document.querySelector('.word-input');
    gameInput.addEventListener('keypress', this.matchWord);
  }

  template() {
    return `
    <section class="container">
        <div class="card">
            <div class="card__header">
                <div class="text--x-small font-weight-bold">남은 시간 : <span class="time">${this.gameTime}</span>초</div>
                <div class="text--x-small font-weight-bold">점수 : <span class="score">${this.gameScore}</span>점</div>
            </div>
            <div class="card__content">
                <div class="text--x-large font-weight-bold word-text">문제 단어</div>
                <div class="card__content__input-box word-input-box">
                    <span class="active">입력</span>
                    <input type="text" class="card__content__input word-input"/>
                </div>
                <div class="card__content__button-box">
                    <button class="game-button">시작</button>
                </div>
            </div>
        </div>
    </section>`;
  }

  matchWord = (event) => {
    if (ENTER_KEY === event.key) {
      const inputText = document.querySelector('.word-input');
      const wordText = document.querySelector('.word-text');
      if (inputText.value === wordText.innerText) {
        this.gameManager.markAnswerTime(this.gameTime);
        inputText.value = null;
        this.runGame();
      } else {
        inputText.value = null;
      }
    }
  };

  toggleGameButton = (event) => {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      event.target.innerText = '초기화';
      this.startGame();
    } else {
      event.target.innerText = '시작';
      this.resetGame();
    }
  };

  async startGame() {
    const words = await gameService.fetchWords();
    if (words.length) {
      this.gameManager = new GameManager();
      this.gameManager.load(words);
      this.setScore(this.gameManager.gameWords.length);

      const inputBox = document.querySelector('.word-input-box');
      inputBox.querySelector('span').classList.remove('active');
      const inputText = inputBox.querySelector('.word-input')
      inputText.classList.add('active');
      inputText.focus();


      this.runGame();
    } else {
      this.gameManager = null;
      alert('게임 단어를 불러올 수 없습니다. 다시 시도하시기 바랍니다.');
    }
  }

  runGame() {
    const currentWord = this.gameManager.nextWord();
    if (currentWord.done) {
      const avgAnswerTime = this.gameManager.averageAnswerTime();
      const searchQuery = '?score=' + this.gameScore + '&time=' + avgAnswerTime;
      this.resetGame();
      window.$router.push('/result' + searchQuery);
      return;
    }
    this.setWordText(currentWord.value.text);
    this.setTimer(currentWord.value.second);
  }

  resetGame() {
    this.isPlaying = false;
    this.gameManager = null;

    this.setTimer(0);
    this.setScore(0);

    this.clearInput();
    this.setWordText('문제 단어');

    const inputBox = document.querySelector('.word-input-box');
    inputBox.querySelector('span').classList.add('active');
    inputBox.querySelector('.word-input').classList.remove('active');
  }

  setTimer(time) {
    clearInterval(this.timer);
    this.timer = time ? setInterval(this.runTimer, 1000) : null;
    this.setTime(time);
  }

  runTimer = () => {
    this.gameTime--;
    if (this.gameTime > 0) {
      this.setTime(this.gameTime);
    } else {
      this.gameScore--;
      this.setScore(this.gameScore);
      this.clearInput();
      this.runGame();
    }
  };

  setScore(score) {
    this.gameScore = score;
    const scoreText = document.querySelector('.score');
    scoreText.innerText = this.gameScore;
  }

  setTime(time) {
    this.gameTime = time;
    const timeText = document.querySelector('.time');
    timeText.innerText = this.gameTime;
  }

  setWordText(word) {
    const wordText = document.querySelector('.word-text');
    wordText.innerText = word;
  }

  clearInput() {
    const inputText = document.querySelector('.word-input');
    inputText.value = null;
  }
}
