import gameService from '../src/api/gameService';

describe('Game Service 테스트', () => {

  it('게임 데이터는 배열이고, Null이 아니어야한다.', async () => {
    const data = await gameService.fetchWords();
    expect(data).toEqual(expect.any(Array));
    expect(data).not.toBeNull();
  });

  it('게임 데이터 배열은 second, text 프로퍼티를 포함하는 Object로 구성되어야한다.', async () => {
    const data = await gameService.fetchWords();

    if (data.length) {
      expect(data).toEqual(expect.arrayContaining([
        expect.objectContaining({second: expect.any(Number), text: expect.any(String)}),
      ]));
    }
  });


});
