import GameManager from '../src/js/gameManager';

describe('Game Manager 테스트', () => {
  let gameManager;
  beforeAll(() => {
    gameManager = new GameManager();
  });

  it('gameManager 생성시 필수 property 체크한다.', () => {
    //필수 property : gameWords, wordIterator, currentWord, gameResult
    expect(gameManager).toHaveProperty('gameWords');
    expect(gameManager).toHaveProperty('wordIterator');
    expect(gameManager).toHaveProperty('currentWord');
    expect(gameManager).toHaveProperty('gameResult');
  });

  it('게임 로드시 파라미터가 없어도 필수 프로퍼티를 정상적으로 설정한다.', () => {
    gameManager.load();

    expect(gameManager.gameWords).toEqual([]);
    expect(gameManager.gameResult).toEqual([]);
    expect(gameManager.wordIterator).toEqual([].values());
    expect(gameManager.currentWord).toBeNull();
  });


  it('wordIterator가 null인 경우 다음 단어는 null을 반환한다.', () => {
    gameManager.wordIterator = null;
    const currentWord = gameManager.nextWord();

    expect(gameManager.wordIterator).toBeNull();
    expect(currentWord).toBeNull();
  });

  it('wordIterator가 존재할 경우 다음 단어를 정상적으로 반환한다.', () => {
    const words = [{second: 0, text: ''}];
    gameManager.wordIterator = words.values();
    const currentWord = gameManager.nextWord();

    expect(gameManager.wordIterator).not.toBeNull();
    expect(currentWord).toEqual(expect.objectContaining({
      done: expect.any(Boolean),
      value: expect.anything()
    }));
  });

  it('currentWord가 null인 경우 답변시간을 마킹하지 않고 flase를 반환한다.', () => {
    gameManager.currentWord = null;
    const beforeGameResult = gameManager.gameResult.length;
    const isMarkAnswerTime = gameManager.markAnswerTime();
    const afterGameResult = gameManager.gameResult.length;

    expect(beforeGameResult).toEqual(afterGameResult);
    expect(isMarkAnswerTime).not.toBeTruthy();
  });

  it('currentWord가 비정상적으로 존재하는 경우 답변시간을 마킹하지 않고 false를 반환한다.', () => {
    gameManager.currentWord = {};
    const beforeGameResult = gameManager.gameResult.length;
    const isMarkAnswerTime = gameManager.markAnswerTime();
    const afterGameResult = gameManager.gameResult.length;

    expect(isMarkAnswerTime).not.toBeTruthy();
    expect(beforeGameResult).toEqual(afterGameResult);
  });

  it('currentWord가 정상적으로 존재하는 경우 답변시간을 마킹하고 true를 반환한다.', () => {
    // 정상적 currentWord = {done: false, value : {second:0, text:''}}
    gameManager.currentWord = {done: false, value: {second: 0, text: ''}};
    const beforeGameResult = gameManager.gameResult.length;
    const isMarkAnswerTime = gameManager.markAnswerTime();
    const afterGameResult = gameManager.gameResult.length;

    expect(isMarkAnswerTime).toBeTruthy();
    expect(beforeGameResult).not.toEqual(afterGameResult);
    expect(afterGameResult).toBeGreaterThan(beforeGameResult);

  });

  it('gameResult가 null인 경우 평균 답변시간은 0을 반환한다.', () => {
    gameManager.gameResult = null;
    const avgAnswerTime = gameManager.averageAnswerTime();

    expect(avgAnswerTime).toEqual(0);
  });

  it('gameResult가 빈 배열인 경우 평균 답변시간은 0을 반환한다.', () => {
    gameManager.gameResult = [];
    const avgAnswerTime = gameManager.averageAnswerTime();

    expect(avgAnswerTime).toEqual(0);
  });


  it('gameResult가 정상 배열인 경우 평균 답변시간을 정상 반환한다.', () => {
    gameManager.gameResult = [2, 3, 4];
    const avgAnswerTime = gameManager.averageAnswerTime();

    expect(avgAnswerTime).toBeGreaterThan(0);
  });


});
