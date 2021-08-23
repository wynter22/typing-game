import Game from '../src/page/game';

describe('Game 화면 테스트', () => {

  let game;

  beforeEach(() => {
    let element = document.createElement('div');
    element.setAttribute('id', 'app');
    document.body.appendChild(element);

    game = new Game();
    game.render(element);
  });


  it('게임 시작 버튼 1회 클릭시 게임이 실행된다.', () => {
    const button = document.querySelector('.game-button');
    button.click();

    expect(game.isPlaying).toBeTruthy();
  });

  it('게임 시작 버튼 2회 클릭시 게임이 초기화된다.', () => {
    const button = document.querySelector('.game-button');
    button.click();
    button.click();

    expect(game.isPlaying).not.toBeTruthy();
  });


  it('input 값 작성 후 Enter를 누르면 input 값을 초기화한다.', () => {
    const input = document.querySelector('.word-input');
    input.value = 'test input';

    const event = new KeyboardEvent('keypress', {
      key: 'Enter',
    });

    input.dispatchEvent(event);

    expect(input.value).toEqual('');
  });

  it('게임 초기화시 gameManager가 null이 된다.', () => {
    game.resetGame();
    expect(game.gameManager).toBeNull();
  });

});
