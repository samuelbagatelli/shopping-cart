const catalog = document.querySelector('section.items');
const cartItems = document.querySelector('ol.cart__items');
const total = document.querySelector('.total-price');
const emptyButton = document.querySelector('.empty-cart');
const container = document.querySelector('.container');

const loading = () => {
  const loading = document.createElement('p');
  loading.className = 'loading';
  loading.innerText = 'carregando...'
  container.appendChild(loading);
};

const removeLoading = () => {
  const loading = document.querySelector('.loading');
  container.removeChild(loading);
};

const appendTotalPrice = () => {
  const li = document.querySelectorAll('.cart__item');
  let acc = 0;
  li.forEach((element) => {
    const string = element.innerHTML.split('$')[1];
    const value = parseFloat(string, 10);
    acc += value;
  });
  total.innerHTML = acc;
};

const emptyCart = () => emptyButton.addEventListener('click', () => {
  cartItems.innerHTML = '';
  appendTotalPrice();
});

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const cartItemClickListener = (event) => {
  const elementToDelet = event.target;
  elementToDelet.remove();
  appendTotalPrice();
  localStorage.removeItem('cartItems');
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  cartItems.appendChild(li);
  return li;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const addItemToCart = async (event) => {
  const item = event.target.parentNode;
  const sku = getSkuFromProductItem(item);
  
  const data = await fetchItem(sku);
  const treatedObj = {
      sku: data.id,
      name: data.title,
      salePrice: data.price,
  };

  createCartItemElement(treatedObj);
  saveCartItems(cartItems.innerHTML);
  appendTotalPrice();
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  if (element === 'button') {
    e.addEventListener('click', addItemToCart);
  }
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  catalog.appendChild(section);

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const createCatalogItems = async () => {
  loading();
  const data = await fetchProducts('computador');
  const usefulResults = await data.results.reduce((acc, curr) => {
        acc.push({
          sku: curr.id,
          name: curr.title,
          image: curr.thumbnail,
        });
        return acc;
      }, []);
  const eachItem = await usefulResults.forEach((element) => createProductItemElement(element));

  return eachItem;
};
createCatalogItems();

const loadCartItems = () => {
  cartItems.innerHTML = getSavedCartItems();
  const li = document.querySelectorAll('.cart__item');
  li.forEach((element) => element.addEventListener('click', cartItemClickListener));
};

window.onload = () => { 
  loadCartItems();
  appendTotalPrice();
  emptyCart();
 };
