const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test('if, when saveCartItems("<ol><li>Item</li></ol>") is executed the localStorage.setItem is called', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  test('if calling saveCartItems("<ol><li>Item</li></ol>"), localStorage.setItem is called with ("cartItems", "<ol><li>Item</li></ol>")', () => {
    const actual = saveCartItems('<ol><li>Item</li></ol>');
    expect(actual).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
  // fail('Teste vazio');
});
