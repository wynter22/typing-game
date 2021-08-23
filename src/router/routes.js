import Game from '/src/page/game';
import Result from '/src/page/result';

const routes = {
  '/': new Game(),
  '/result': new Result(),
};

export default routes;
