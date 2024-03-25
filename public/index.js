const totalAmount = document.querySelector('.total-amount');
const modalWindow = document.querySelectorAll('.modalWindow')

let ingredientsBar = document.getElementsByClassName('clientChoice')[0];
const orderBtn = document.querySelectorAll('.typical-btn');
ingredientsBar.addEventListener('click', addToAnotherUl);

let price = 0;

function addToAnotherUl(e) {
  if (e.target.tagName !== 'LI') return;

  let addedIngredientList = document.querySelector('.finalIngredients');

  const targetLi = e.target;
  const dataCount = targetLi.getAttribute('data-count');

  const cloneLi = addedIngredientList.querySelectorAll('li.' + targetLi.classList[0]);
  const similarCount = cloneLi.length;

  if ((dataCount === 'single' && similarCount < 1) || (dataCount === 'double' && similarCount < 2)) {
    const li = e.target;
    const priceToAdd = parseInt(li.getAttribute('data-price'));
    let clonedLi = li.cloneNode(true);

    li.classList.add('selected');
    addedIngredientList.append(clonedLi);

    price += priceToAdd;
    updatePrice();
    updatePizzaView();

    let selectedIngredientsCount = document.querySelectorAll('.finalIngredients li').length;

    if (selectedIngredientsCount >= 4) {
      document.querySelector('.typical-btn').hidden = false;
    }
  } else {
    alert('Max ingredients reached');
  }
}

function updatePrice() {
  const priceDisplay = document.querySelector('.total-amount');
  priceDisplay.textContent = `Total Price: $${price.toFixed(2)}`;
}

function removeLi(e) {
  if (e.target.tagName === 'LI') {

    const selectedLi = e.target;
    
    document.querySelectorAll('.finalIngredients .selected').forEach((el) => {
      if (el.textContent === selectedLi.textContent) {
        el.classList.remove('selected');
      }
    });
    selectedLi.parentNode.removeChild(selectedLi);

    const priceToRemove = parseInt(selectedLi.getAttribute('data-price'));
    price -= priceToRemove;
    updatePizzaView();
    updatePrice();
  }
}

function createOrder(event) {
  event.preventDefault();

  const selectedIngredients = document.querySelectorAll('.finalIngredients li');
  const order = {
    ingredients: [],
    totalPrice: price.toFixed(2)
  };

  selectedIngredients.forEach((ingredient) => {
    const ingredientName = ingredient.textContent.trim();
    const ingredientPrice = parseFloat(ingredient.getAttribute('data-price'));
    order.ingredients.push({ name: ingredientName, price: ingredientPrice });
  });

  console.log('Order: ', order);
}

function updatePizzaView() {
  const ingredientsLists = document.querySelectorAll('.clientChoice ul');
  const quarters = document.querySelectorAll('.picture .quarter');

  let selectedColumns = 0;

  ingredientsLists.forEach((list) => {
    const selectedItemCount = list.querySelectorAll('li.selected').length;
    if (selectedItemCount > 0) {
      selectedColumns++;
    }
  });

  quarters.forEach((quarter, index) => {
    quarter.hidden = index >= selectedColumns;
  });
}

document.querySelector('.typical-btn').addEventListener('click', createOrder);




