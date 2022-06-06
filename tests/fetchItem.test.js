require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('if the fetchItem is a function', () => {
    expect(typeof fetchItem).toBe('function');
  });
  test('if the function is called with the argument "MLB1615760527"', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  test('if the function is called with the endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  test('if fetchItem returns an data structure', async () => {
    const acutal = await fetchItem('MLB1615760527');
    expect(acutal).toEqual(item);
  });
  test('if fetchItem() returns the Error message "You must provide an url"', async () => {
    const actual = await fetchItem();
    expect(actual).toThrow(new Error('You must provide an url'));
  });
  // fail('Teste vazio');
});
