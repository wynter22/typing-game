import httpRequest from '../utils/httpRequest';

const gameService = {
  fetchWords: async function () {
    const url = 'https://my-json-server.typicode.com/kakaopay-fe/resources/words';
    const response = await httpRequest('GET', url).catch(error => error);
    try {
      return response.status === 200 ? JSON.parse(response.data) : [];
    } catch (e) {
      console.error('failed parse fetch words data!!', e);
      return [];
    }
  }
};

export default gameService;
