export default class Result {

  score = 0;
  avgTime = 0;

  constructor() {
    this.score = 0;
    this.avgTime = 0;
  }

  render(el) {
    this.init();
    el.innerHTML = this.template();
    this.setEvent();
  }

  setEvent() {
    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click', () => $router.push('/'));
  }

  template() {
    return `<section class="container game-result">
              <div class="card">
                <div class="card__header">
                  <div class="text--medium font-weight-bold">Mission Complete!</div>
                </div>
                <div class="card__content">
                  <div class="text--large font-weight-bold">당신의 점수는 <span class="score">${this.score}</span>점 입니다.</div>
                  <div class="text--x-small font-weight-bold">단어당 평균 답변 시간은 <span class="answer-time">${this.avgTime}</span>초입니다.</div>
                  <div class="card__content__button-box">
                    <button class="restart-button">다시 시작</button>
                  </div>
                </div>
              </div>
            </section>`;
  }

  init() {
    const searchParams = new URLSearchParams(location.search);
    this.score = searchParams.get('score');
    this.avgTime = searchParams.get('time');

    if (!this.score && !this.avgTime) {
      alert('진행된 게임이 없습니다. 게임 시작 화면으로 이동합니다.');
      window.$router.push('/');
    }
  }
};
