import routes from './routes';

export default class Router {
  $app;

  constructor(element) {
    this.$app = element;
    this.setEvent();
  }

  setEvent() {
    window.onpopstate = () => {
      this.render();
    };
  }

  push(path) {
    window.history.pushState({}, path, window.location.origin + path);
    this.render();
  }

  render() {
    const route = this.getRoute();
    route.render(this.$app);
  }

  getRoute() {
    const path = location.pathname;
    if (Object.keys(routes).includes(path)) {
      return routes[path];
    } else {
      window.history.replaceState({}, '/', window.location.origin);
      return routes['/'];
    }
  }
}
