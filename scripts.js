// APARTADO PARA OBTENER ELEMENTOS RELACIONADOS CON LOS MODALES
const infoElements = document.querySelectorAll('.info');
const modalElements = document.querySelectorAll('.Modal1');
const closeButtons = document.querySelectorAll('.close');

//APARTADO PARA EL MODAL DE CADA PRODUCTO MUESTRE LA INFORMACIÓN
infoElements.forEach((trigger, index) => {
  trigger.addEventListener('click', () => {
    modalElements[index].style.display = 'block';
  });
});

closeButtons.forEach((closeBtn, index) => {
  closeBtn.addEventListener('click', () => {
    modalElements[index].style.display = 'none';
  });
});

// Cierra el modal si se hace clic fuera de él
window.addEventListener('click', (event) => {
  modalElements.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

//APARTADO PARA EL MODAL QUE SE MUESTRA AL DARLE CLICK AL BOTON DE "PAGAR AHORA"
const confirmButtons = document.querySelectorAll('.btn-confirmar');
confirmButtons.forEach((confirmButton, index) => {
  confirmButton.addEventListener('click', () => {
    // Oculta el modal
    modalElements[index].style.display = 'none';
    
    // Muestra el mensaje de éxito
    alert('Se ha realizado con éxito');
  });
});


// Datos del carrito en formato JSON
let cart = [];

// APARTADO PARA MANEJAR CLICK EN BOTONES "AGREGAR AL CARRITO"
const addToCartButtons = document.querySelectorAll('.agregar-al-carrito');
const cartItemsList = document.getElementById('cart-items');

// Ocultar el carrito inicialmente
cartItemsList.style.display = 'none';

// Manejar clic en botones "Agregar al carrito"
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const product = button.getAttribute('data-product');
    const price = parseFloat(button.getAttribute('data-price'));

    // Busca si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.product === product);

    if (existingProduct) {
      // Si ya existe en el carrito, incrementa la cantidad
      existingProduct.quantity += 1;
    } else {
      // Si no existe en el carrito, agrégalo
      cart.push({ product, price, quantity: 1 });
    }

    // Mostrar el carrito si no está vacío
    cartItemsList.style.display = 'block';

    // Actualizar la vista del carrito
    displayCart();

    // Calcular subtotal, propina y total
    const subtotal = calcularSubtotal(cart, productosJSON);
    const porcentajePropina = parseInt(document.querySelector('input[name="propina"]:checked').value);
    const { propina, total } = calcularTotalConPropina(subtotal, porcentajePropina);
    actualizarValores(subtotal, propina, total);
  });
});

// APARTADO PARA MANEJAR CLICK EN BOTONES DE ELIMINACIÓN
cartItemsList.addEventListener('click', (event) => {
  if (event.target.classList.contains('eliminar-producto')) {
    const li = event.target.parentElement;
    const productName = li.querySelector('.product-name').textContent;

    // Buscar el producto en el carrito
    const productIndex = cart.findIndex(item => item.product === productName);

    if (productIndex !== -1) {
      const product = cart[productIndex];
      if (product.quantity > 1) {
        // Si la cantidad es mayor que 1, disminuir la cantidad
        product.quantity -= 1;
      } else {
        // Si la cantidad es 1, eliminar el producto del carrito
        cart.splice(productIndex, 1);
      }

      // Eliminar el elemento del carrito en la vista
      li.remove();

      // Si el carrito está vacío, ocultar el carrito
      if (cart.length === 0) {
        cartItemsList.style.display = 'none';
      }
    }

    // Actualizar la vista del carrito
    displayCart();

    // Calcular subtotal, propina y total
    const subtotal = calcularSubtotal(cart, productosJSON);
    const porcentajePropina = parseInt(document.querySelector('input[name="propina"]:checked').value);
    const { propina, total } = calcularTotalConPropina(subtotal, porcentajePropina);
    actualizarValores(subtotal, propina, total);
  }
});

// APARTADO PARA MOSTRAR LOS ELEMENTOS DEL CARRITO
function displayCart() {
  cartItemsList.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="product-name">${item.product}</span> <span class="product-quantity">${item.quantity}x</span> <span class="product-price">$${(item.price * item.quantity).toFixed(2)}</span> <button class="eliminar-producto">-</button>`;
    cartItemsList.appendChild(li);
  });
}

const productosJSON = {
  "productos": [
    {
      "nombre": "Pizza",
      "precio": 10.99
    },
    {
      "nombre": "Hamburguesa",
      "precio": 8.99
    },
    {
      "nombre": "Ensalada",
      "precio": 4.99
    },
    {
      "nombre": "Pastel",
      "precio": 10.99
    },
    {
      "nombre": "Tacos",
      "precio": 5.99
    },
    {
      "nombre": "Spaghetti",
      "precio": 9.99
    },
    {
      "nombre": "Pollo frito",
      "precio": 7.99
    },
    {
      "nombre": "Pescado",
      "precio": 10.99
    },
    {
      "nombre": "Frutas",
      "precio": 5.99
    },
    {
      "nombre": "Helado",
      "precio": 5.99
    }
  ]
};

// APARTADO PARA CALCULAR EL SUBTOTAL
function calcularSubtotal(carrito, productosJSON) {
  let subtotal = 0;
  for (const item of carrito) {
    const producto = productosJSON.productos.find(p => p.nombre === item.product);
    if (producto) {
      subtotal += producto.precio * item.quantity;
    }
  }
  return subtotal;
}

// APARTADO PARA CALCULAR EL TOTAL CON PROPINA
function calcularTotalConPropina(subtotal, porcentajePropina) {
  const propina = subtotal * (porcentajePropina / 100);
  const total = subtotal + propina;
  return { propina, total };
}

// APARTADO PARA AJUSTAR PORCENTAJE DE PROPINA (AJUSTABLE POR EL USUARIO)
const porcentajePropinaSelect = document.querySelectorAll('input[name="propina"]');
porcentajePropinaSelect.forEach(input => {
  input.addEventListener('change', () => {
    const subtotal = calcularSubtotal(cart, productosJSON);
    const porcentajePropina = parseInt(document.querySelector('input[name="propina"]:checked').value);
    const { propina, total } = calcularTotalConPropina(subtotal, porcentajePropina);
    actualizarValores(subtotal, propina, total);
  });
});

// APARTADO PARA ACTUALIZAR LOS VALORES EN EL HTML
function actualizarValores(subtotal, propina, total) {
  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('monto-propina').textContent = `$${propina.toFixed(2)}`;
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Llama a la función para calcular el subtotal inicial
const subtotalInicial = calcularSubtotal(cart, productosJSON);
const { propina, total } = calcularTotalConPropina(subtotalInicial, 10);
actualizarValores(subtotalInicial, propina, total);

//APARTADO PARA REINCIAR AL DARLE EL BOTON DE "Confirmar Pedido"
const reiniciarButton = document.getElementById('btn-reiniciar');

// Agrega un controlador de eventos al botón de reinicio
reiniciarButton.addEventListener('click', () => {
  // Reinicia el carrito (vacía el arreglo 'cart')
  cart = [];

  // Actualiza la vista del carrito
  displayCart();

  // Reinicia los valores de subtotal, propina y total
  const subtotalInicial = 0;
  const { propina, total } = calcularTotalConPropina(subtotalInicial, 10);
  actualizarValores(subtotalInicial, propina, total);

  // Oculta el carrito
  cartItemsList.style.display = 'none';
});
//APARTADO PARA EL CAROUSEL
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');
let currentIndex = 0;

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}

function updateCarousel() {
  const translateX = -currentIndex * 100;
  carousel.style.transform = `translateX(${translateX}%)`;
}

setInterval(nextSlide, 5000);
