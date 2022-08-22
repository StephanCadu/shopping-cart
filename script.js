const myOl = document.querySelector('.cart__items');
const clearBtn = document.querySelector('.empty-cart');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const createAllElements = async () => {
  const itemsSection = document.querySelector('.items');
  itemsSection.appendChild(createCustomElement('span', 'loading', 'carregando...'));
  const { results } = await fetchProducts('computador');
  itemsSection.innerHTML = '';
  results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    const myItem = createProductItemElement({ sku, name, image });
    itemsSection.appendChild(myItem);
  });
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const calculatePrice = () => Array.from(myOl.children)
.reduce((acc, { innerHTML }) => acc + Number(innerHTML.match(/[\d*.\d*]*$/)[0]), 0);

const showPrice = () => {
  const priceText = document.querySelector('.total-price');
  priceText.innerHTML = calculatePrice();
};

const cartItemClickListener = ({ target }) => {
  target.remove();
  saveCartItems(myOl.innerHTML);
  showPrice();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addItemOnCart = async ({ target: { parentNode } }) => {
  const itemId = getSkuFromProductItem(parentNode);
  const { id: sku, title: name, price: salePrice } = await fetchItem(itemId);
  myOl.appendChild(createCartItemElement({ sku, name, salePrice }));
  saveCartItems(myOl.innerHTML);
  showPrice();
};

const addItemListener = async () => {
  const myButtons = document.querySelectorAll('.item__add');
  myButtons.forEach((btn) => btn.addEventListener('click', addItemOnCart));
};

const getFromLocal = () => {
  if (localStorage.length === 0) myOl.innerHTML = '';
  myOl.innerHTML = getSavedCartItems();
  const myLis = document.querySelectorAll('.cart__item');
  myLis.forEach((li) => li.addEventListener('click', cartItemClickListener));
};

clearBtn.addEventListener('click', () => {
  myOl.innerHTML = '';
  localStorage.clear();
  showPrice();
});

window.onload = async () => {
  await createAllElements();
  await addItemListener();
  getFromLocal();
  showPrice();
};
