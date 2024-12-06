//menu hamburguer
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

const removeButton = document.getElementsByClassName("removeButton");
for (let i = 0; i < removeButton.length; i++) {
  removeButton[i].addEventListener("click", removeItem);
}

const quantityInputs = document.getElementsByClassName("quantity");
for (let i = 0; i < quantityInputs.length; i++) {
  quantityInputs[i].addEventListener("change", updateTotal);
}

const addToCartButtons = document.getElementsByClassName(
  "button-hover-background"
);
for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", addProductToCart);
}

function addProductToCart(event) {
  const button = event.target;
  const productsInfos = button.parentElement.parentElement;
  const productImage =
    productsInfos.getElementsByClassName("product-image")[0].src;
  const productTitle =
    productsInfos.getElementsByClassName("product-title")[0].innerText;
  const productPrice =
    productsInfos.getElementsByClassName("product-price")[0].innerText;

  let newCartProduct = document.createElement("div");
  newCartProduct.classList.add("bag-item");
  newCartProduct.innerHTML = `
  <div class="bag-flex">
        <img class="product-image" src="${productImage}" alt="Imagem em miniatura de ${productTitle}">
        <p class="product-title">${productTitle}</p>
        <p class="product-price">R$ ${productPrice}</p>
        <input type="number" class="quantity" name="qtde" id="qtde" value="1" min="0" max="99" oninput="validateMax(this)">
        <button class="removeButton">x</button>
  </div>`;

  const asideBagItens = document.querySelector("aside .bag-itens");
  asideBagItens.append(newCartProduct);
}

//removeButton
function removeItem(event) {
  event.target.parentElement.parentElement.remove();
  updateTotal();
}

//modal de bolsa
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

//valor maximo/minimo input
function validateMax(input) {
  if (parseInt(input.value) > 99) {
    input.value = 99;
  } else if (parseInt(input.value) < 0) {
    input.value = 0;
  }
}

//atualização no valor
function updateTotal() {
  let totalAmount = 0;
  const bagItens = document.getElementsByClassName("bag-item");
  for (let i = 0; i < bagItens.length; i++) {
    const productPrice = bagItens[i]
      .getElementsByClassName("product-price")[0]
      .innerText.replace("R$", "")
      .replace(",", ".");
    const productQtde = bagItens[i].getElementsByClassName("quantity")[0].value;

    totalAmount += productPrice * productQtde;
  }
  document.querySelector(
    ".product-price.final"
  ).innerText = `R$ ${totalAmount.toFixed(2)}`;
}
