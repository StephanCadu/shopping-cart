const fetchProducts = async (product) => {
  // seu código aqui
  try {
    if (!product) throw new Error('You must provide an url');
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const myReturn = await fetch(URL)
    .then((response) => response.json())
    .then((object) => object);
    return myReturn;
  } catch (error) {
    return error;
  }
};
fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
