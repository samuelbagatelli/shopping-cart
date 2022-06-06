const fetchProducts = async (keyWord) => {
  if (keyWord === 'computador') {
    try {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${keyWord}`);
      const data = await response.json();

      return data;
    } catch (error) {
      // throw new Error(error);
    }
  }
  if (keyWord === undefined) {
    throw new Error('You must provide an url')
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
