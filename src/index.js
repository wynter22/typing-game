import './asset/css/style.css';
import Router from './router/router';

const app = document.querySelector('#app');
window.$router  = new Router(app);
window.$router.render();






