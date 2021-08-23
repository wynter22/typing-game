import Result from '../src/page/result';

describe('Game Result 화면 테스트', () => {

  let result;

  beforeEach(() => {
    window.alert = jest.fn();
    window.$router = {push: jest.fn()};

    const element = document.createElement('div');
    element.setAttribute('id', 'app');
    document.body.appendChild(element);

    result = new Result();
    result.render(element);
  });

  it('location.search없는 경우 score와 avgTime이 null로 설정된다.', () => {
    result.init();

    expect(result.score).toBeNull();
    expect(result.avgTime).toBeNull();
  });

  it('location.search에 socre, time 값이 존재하는 경우 score,avgTime이 정상적으로 설정된다. ', () => {
    const params = {score: 10, time: 1};
    const path = Object.entries(params).map(([key, value]) => {
      return key + '=' + value;
    }).join('&');

    delete window.location;
    window.location = new URL('https://localhost:8080?' + path);

    result.init();

    expect(result.score).toEqual(params.score.toString());
    expect(result.avgTime).toEqual(params.time.toString());

  });

  afterEach(() => {
    delete window.$router;
  });

});
