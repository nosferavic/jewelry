// Menu Hamburguer
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Adicionar produto ao carrinho
const addToCartButtons = document.getElementsByClassName(
  "button-hover-background"
);
for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", addProductToCart);
}

const purchaseButton = document.querySelector(".finalButton");

purchaseButton.addEventListener("click", makePurchase);

function makePurchase() {
  const totalElement = document.querySelector(".product-price-final");
  const totalAmount = totalElement.innerText.replace("R$", "").trim();

  if (totalAmount === "" || parseFloat(totalAmount.replace(",", ".")) === 0) {
    alert("Seu carrinho está vazio!");
  } else {
    alert(`Obrigado por sua compra!
Valor do pedido: R$${totalAmount}
Volte sempre!`);
  }
}

function checkIfInputIsNull(event) {
  const quantityValue = parseInt(event.target.value, 10);

  const parentElement = event.target.closest(".bag-item");

  if (quantityValue === 0) {
    parentElement.remove();
  }

  updateTotal();
}

document.addEventListener("change", (event) => {
  if (event.target.classList.contains("quantity")) {
    checkIfInputIsNull(event);
  }
});

// Função para adicionar produto ao carrinho
function addProductToCart(event) {
  const button = event.target;
  const productsInfos = button.parentElement.parentElement;
  const productImage =
    productsInfos.getElementsByClassName("product-image")[0].src;
  const productTitle =
    productsInfos.getElementsByClassName("product-title")[0].innerText;
  const productPrice =
    productsInfos.getElementsByClassName("product-price")[0].innerText;

  const productCartsName =
    document.getElementsByClassName("cart-product-title");
  for (let i = 0; i < productCartsName.length; i++) {
    if (productCartsName[i].innerText === productTitle) {
      productCartsName[i].parentElement.parentElement.getElementsByClassName(
        "quantity"
      )[0].value++;
      updateTotal();
      return;
    }
  }

  let newCartProduct = document.createElement("div");
  newCartProduct.classList.add("bag-item");
  newCartProduct.innerHTML = `
    <div class="bag-flex">
      <img class="product-image" src="${productImage}" alt="Imagem em miniatura de ${productTitle}">
      <p class="product-title cart-product-title">${productTitle}</p>
      <p class="product-price">${productPrice}</p>
      <input type="number" class="quantity" name="qtde" id="qtde" value="1" min="0" max="99" oninput="validateMax(this)">
      <button class="removeButton">x</button>
    </div>`;

  const asideBagItens = document.querySelector("aside .bag-itens");
  asideBagItens.append(newCartProduct);

  const removeButton = newCartProduct.getElementsByClassName("removeButton")[0];
  removeButton.addEventListener("click", removeItem);

  updateTotal();

  newCartProduct
    .getElementsByClassName("quantity")[0]
    .addEventListener("change", updateTotal);
  newCartProduct
    .getElementsByClassName("removeButton")[0]
    .addEventListener("click", removeItem);
}

// Função para remover item do carrinho
function removeItem(event) {
  event.target.parentElement.parentElement.remove();
  updateTotal();
}

// Modal da bolsa
const bag = document.querySelector(".bag");
const overlay = document.getElementById("overlay");
const openButton = document.getElementById("openBag");
const closeButton = document.querySelector(".closeButton");

function openBag() {
  bag.classList.add("open");
  overlay.classList.add("show");
}

function closeBag() {
  bag.classList.remove("open");
  overlay.classList.remove("show");
}

openButton.addEventListener("click", openBag);
overlay.addEventListener("click", closeBag);
closeButton.addEventListener("click", closeBag);

// Função para validar o valor máximo/mínimo do input de quantidade
function validateMax(input) {
  if (parseInt(input.value) > 99) {
    input.value = 99;
  } else if (parseInt(input.value) < 0) {
    input.value = 0;
  }
}

// Função para atualizar o valor total no carrinho
function updateTotal() {
  let totalAmount = 0;
  const bagItens = document.getElementsByClassName("bag-item");

  for (let i = 0; i < bagItens.length; i++) {
    // Substitui a vírgula por ponto e converte para número com parseFloat
    const productPrice = parseFloat(
      bagItens[i]
        .getElementsByClassName("product-price")[0]
        .innerText.replace("R$", "")
        .replace(".", "")
        .replace(",", ".")
    );
    const productQtde = parseInt(
      bagItens[i].getElementsByClassName("quantity")[0].value
    );

    totalAmount += productPrice * productQtde;
  }

  document.querySelector(
    ".product-price-final"
  ).innerText = `R$ ${totalAmount.toFixed(2)}`;
}