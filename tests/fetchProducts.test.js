require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('if fetchProducts() is a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  test('if fetchProducts() is called with "computador" argument', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  test('if fetchProducts("computador"), the endpoint is https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  test('if fetchProducts("computador") returns to equal computadorSearch', async () => {
    const actual = await fetchProducts('computador');
    expect(actual).toEqual(computadorSearch);
  });
  test('when no parameter is passaed to fetchProducts(), it shows a message: "You must provide an url"', async () => {
    const actual = await fetchProducts();
    expect(actual).toThrow(new Error('You must provide an url'));
  });
  // fail('Teste vazio');
});
