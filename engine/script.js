//menu hamburguer
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show'); 
});



jewelsJson.map((item, index) =>{
  console.log(item)
})


//dados de cada joia
let jewItem = ''

jewItem.querySelector('.product-img img').src = item.img
jewItem.querySelector('.product-price').innerHTML = `R$ ${item.price.toFixed(2)}`
jewItem.querySelector('.product-title').innerHTML = item.name


//modal
const bagButton = document.querySelector('.icon')