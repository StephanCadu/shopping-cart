require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  it('should be a function', () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });
  it('should call fetch', () => {
    expect.assertions(1);
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('should call fetch with the URL: "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    const urlTest = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(urlTest);
  });
  it('should return an object equal item', async () => {
    expect.assertions(1);
    const atual = await fetchItem('MLB1615760527');
    expect(atual).toEqual(item);
  });
  it('should return an error with the message: "You must provide an url" when called without parameters', async () => {
    expect.assertions(1);
    const expected = new Error('You must provide an url');
    expect(await fetchItem()).toEqual(expected);
  });
});
