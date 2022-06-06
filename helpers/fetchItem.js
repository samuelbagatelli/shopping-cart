const fetchItem = async (id) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const data = await response.json();

    const treatedObj = {
      sku: data.id,
      name: data.title,
      salePrice: data.price,
    };
    
    return treatedObj;
  } catch (error) {
    // throw new Error(error);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
