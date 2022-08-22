require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('should be a function', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });
  it('should call fetch', () => {
    expect.assertions(1);
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('should call fetch with the URL: "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    const urlTest = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(urlTest);
  });
  it('should return an object equal computadorSearch', async () => {
    expect.assertions(1);
    const atual = await fetchProducts('computador');
    expect(atual).toEqual(computadorSearch);
  });
  it('should return an error with the message: "You must provide an url" when called without parameters', async () => {
    expect.assertions(1);
    const expected = new Error('You must provide an url');
    expect(await fetchProducts()).toEqual(expected);
  });
});
