//var request = new XMLHttpRequest();
//request.open("GET", "/Scripts/menu.json", true);

const productosJSON = {
    "productos": [
      {
        "nombre": "Pizza",
        "precio": 10.99,
        "imagen": "../img/pizza test.webp",
        "descripcion": "Esta pizza está hecha con los mejores ingredientes y tiene un precio de $10.99.",
        "tipo": "Platillo principal"
      },
      {
        "nombre": "Hamburguesa",
        "precio": 8.99,
        "imagen": "../img/Hamburguesa.png",
        "descripcion": "Esta Hamburguesa está hecha con los mejores ingredientes y tiene un precio de $10.99.",
        "tipo": "Platillo principal"
      },
      {
        "nombre": "Ensalada",
        "precio": 4.99,
        "imagen": "../img/Ensalada.png",
        "descripcion": "Esta Ensalada está hecha con los mejores ingredientes y tiene un precio de $10.99.",
        "tipo": "Bebidas"
      },
      {
        "nombre": "Pastel",
        "precio": 10.99,
        "imagen": "../img/Chocolate-Cake-removebg-preview.png",
        "descripcion": "Esta Pastel está hecha con los mejores ingredientes y tiene un precio de $10.99.",
        "tipo": "Postres"
      },
      {
        "nombre": "Tacos",
        "precio": 5.99,
        "imagen": "../img/tacos.png",
        "descripcion": "Esta Tacos está hecha con los mejores ingredientes y tiene un precio de $10.99.",
        "tipo": "Platillo principal"
      },
      {
        "nombre": "Spaghetti",
        "precio": 9.99,
        "imagen": "../img/spaghetti-with-ai-generated-free-png.webp",
        "descripcion": "Esta Spaghetti está hecha con los mejores ingredientes y tiene un precio de $10.99.",
        "tipo": "Platillo principal"
      },
      {
        "nombre": "Pollo frito",
        "precio": 7.99,
        "imagen": "../img/pollo.png",
        "descripcion": "Esta Pollo frito está hecha con los mejores ingredientes y tiene un precio de $10.99.",
        "tipo": "Platillo principal"
      },
      {
        "nombre": "Pescado",
        "precio": 10.99,
        "imagen": "../img/pescado.png",
        "descripcion": "Esta Pescado está hecha con los mejores ingredientes y tiene un precio de $10.99.",
        "tipo": "Platillo principal"
      },
      {
        "nombre": "Frutas",
        "precio": 5.99,
        "imagen": "../img/frutas.png",
        "descripcion": "Esta Frutas está hecha con los mejores ingredientes y tiene un precio de $10.99.",
        "tipo": "Postres"
      },
      {
        "nombre": "Helado",
        "precio": 5.99,
        "imagen": "../img/helado.png",
        "descripcion": "Esta Helado está hecha con los mejores ingredientes y tiene un precio de $10.99.",
        "tipo": "Postres"
      }
      

    ]
  };
const productosContainer = document.querySelector('.productos');
const cartItemsList = document.getElementById('cart-items');
const subtotalElement = document.getElementById('subtotal');
const montoPropinaElement = document.getElementById('monto-propina');
const totalElement = document.getElementById('total');
const propina10 = document.getElementById('propina-10');
const propina13 = document.getElementById('propina-13');
const propina20 = document.getElementById('propina-20');
const btnPagar = document.querySelector('.btn-Pagar');
const filtroPlatillosButton = document.getElementById('filter-platillos');
const filtroPostresButton = document.getElementById('filter-postres');
const filtroBebidasButton = document.getElementById('filter-bebidas');
const mostrarTodoButton = document.getElementById('btn-mostrar-todo');

// Array para almacenar los productos seleccionados
const selectedProducts = [];

// Array de elementos de propina
const propinaElements = [propina10, propina13, propina20];

// Agregamos un event listener a cada elemento de propina para actualizar el total
propinaElements.forEach(propinaElement => {
  propinaElement.addEventListener('change', actualizarTotal);
});

// Iteramos sobre los productos en el objeto "productosJSON"
productosJSON.productos.forEach(producto => {
  // Creamos un contenedor de producto
  const productoDiv = document.createElement('div');
  productoDiv.className = 'producto background-img info';

  // Creamos una imagen para el producto
  const imagenProducto = document.createElement('img');
  imagenProducto.src = producto.imagen;
  imagenProducto.alt = producto.nombre;

  // Creamos un título para el producto
  const nombreProducto = document.createElement('h2');
  nombreProducto.textContent = producto.nombre;

  // Creamos un botón para agregar al carrito
  const agregarAlCarritoButton = document.createElement('button');
  agregarAlCarritoButton.textContent = 'Agregar al carrito';
  agregarAlCarritoButton.className = 'agregar-al-carrito';
  agregarAlCarritoButton.dataset.product = producto.nombre;
  agregarAlCarritoButton.dataset.price = producto.precio;

  // Agregamos un event listener para el botón "Agregar al carrito"
  agregarAlCarritoButton.addEventListener('click', (e) => {
    const productName = agregarAlCarritoButton.dataset.product;
    const productPrice = parseFloat(agregarAlCarritoButton.dataset.price);
    const existingProduct = selectedProducts.find(product => product.name === productName);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      selectedProducts.push({ name: productName, price: productPrice, quantity: 1 });
    }

    actualizarCarrito();
    e.stopPropagation();
  });

  // Agregamos un event listener para mostrar la descripción del producto al hacer clic
  productoDiv.addEventListener('click', () => {
    mostrarDescripcionModal(producto);
  });

  // Agregamos un event listener para ocultar el modal al hacer clic fuera de él
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  });

  // Agregamos los elementos al contenedor del producto
  productoDiv.appendChild(imagenProducto);
  productoDiv.appendChild(nombreProducto);
  productoDiv.appendChild(agregarAlCarritoButton);

  // Agregamos el contenedor del producto al contenedor general de productos
  productosContainer.appendChild(productoDiv);
});

// Función para mostrar la descripción de un producto en un modal
function mostrarDescripcionModal(producto) {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const modalTitle = document.createElement('h2');
  modalTitle.textContent = producto.nombre;

  const modalDescription = document.createElement('p');
  modalDescription.textContent = producto.descripcion;

  const closeButton = document.createElement('span');
  closeButton.classList.add('close');
  closeButton.textContent = '×';

  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalDescription);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.style.display = 'block';
}

// Función para actualizar el carrito de compras
function actualizarCarrito() {
  cartItemsList.innerHTML = '';
  const productsCount = {};

  selectedProducts.forEach((product) => {
    if (!productsCount[product.name]) {
      productsCount[product.name] = 0;
    }
    productsCount[product.name] += product.quantity;
  });

  let subtotal = 0;

  for (const productName in productsCount) {
    if (productsCount.hasOwnProperty(productName)) {
      const productQuantity = productsCount[productName];
      const product = selectedProducts.find((p) => p.name === productName);
      const listItem = document.createElement('li');
      listItem.innerHTML = `<button class="eliminar-producto">-</button> ${productName} ${productQuantity}x ($${(product.price * productQuantity).toFixed(2)})`;

      const deleteButton = listItem.querySelector('.eliminar-producto');
      deleteButton.addEventListener('click', () => eliminarProducto(productName));

      cartItemsList.appendChild(listItem);

      subtotal += product.price * productQuantity;
    }
  }

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  actualizarTotal();
}

// Función para eliminar un producto del carrito
function eliminarProducto(productName) {
  const productIndex = selectedProducts.findIndex(product => product.name === productName);
  if (productIndex !== -1) {
    if (selectedProducts[productIndex].quantity > 1) {
      selectedProducts[productIndex].quantity--;
    } else {
      selectedProducts.splice(productIndex, 1);
    }
    actualizarCarrito();
  }
}

// Función para actualizar el total y el monto de la propina
function actualizarTotal() {
  const subtotal = selectedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);

  let propina = 0;
  if (propina10.checked) {
    propina = subtotal * 0.1;
  } else if (propina13.checked) {
    propina = subtotal * 0.13;
  } else if (propina20.checked) {
    propina = subtotal * 0.2;
  }

  montoPropinaElement.textContent = `$${propina.toFixed(2)}`;

  const total = subtotal + propina;
  totalElement.textContent = `$${total.toFixed(2)}`;
}

const btnPagarAhora = document.getElementById('btn-pagar-ahora');
const modal = document.querySelector('.Modal1');
const closeModal = modal.querySelector('.close');

btnPagarAhora.addEventListener('click', () => {
  modal.style.display = 'block';

  // Agrega un evento al botón "Confirmar Pedido" dentro del modal
  const confirmarPedidoButton = modal.querySelector('#btn-reiniciar');
  confirmarPedidoButton.addEventListener('click', () => {
    modal.style.display = 'none';
    realizarPago(); // Llama a la función para procesar el pago
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Función para procesar el pago
function realizarPago() {
  alert('¡Pago realizado con éxito!');
}


const reiniciarButton = document.getElementById('btn-reiniciar');

reiniciarButton.addEventListener('click', () => {
  // Limpia el carrito
  selectedProducts.length = 0;

  // Actualiza el carrito
  actualizarCarrito();

  // Reinicia los valores de subtotal, propina y total
  const subtotalInicial = 0;
  const { propina, total } = calcularTotalConPropina(subtotalInicial, 10);
  actualizarValores(subtotalInicial, propina, total);

  // Oculta el carrito
  cartItemsList.style.display = 'none';

  // Desmarca la opción de propina 10%
  propina10.checked = true;
});

// Inicialmente, muestra todos los productos
mostrarProductos(productosJSON.productos);


// Agregamos event listeners para los botones de filtro
filtroPlatillosButton.addEventListener('click', () => {
  filtrarYMostrarProductos('Platillo principal');
});

filtroPostresButton.addEventListener('click', () => {
  filtrarYMostrarProductos('Postres');
});

filtroBebidasButton.addEventListener('click', () => {
  filtrarYMostrarProductos('Bebidas');
});

// Función para filtrar y mostrar productos de un tipo específico
function filtrarYMostrarProductos(tipo) {
  const productosFiltrados = productosJSON.productos.filter(producto => producto.tipo === tipo);
  mostrarProductos(productosFiltrados);
}

mostrarTodoButton.addEventListener('click', () => {
  mostrarProductos(productosJSON.productos);
});

// Función para mostrar productos en el contenedor
function mostrarProductos(productos) {
  productosContainer.innerHTML = ''; // Limpia los productos anteriores

  productos.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.className = 'producto background-img info';

    const imagenProducto = document.createElement('img');
    imagenProducto.src = producto.imagen;
    imagenProducto.alt = producto.nombre;

    const nombreProducto = document.createElement('h2');
    nombreProducto.textContent = producto.nombre;

    const agregarAlCarritoButton = document.createElement('button');
    agregarAlCarritoButton.textContent = 'Agregar al carrito';
    agregarAlCarritoButton.className = 'agregar-al-carrito';
    agregarAlCarritoButton.dataset.product = producto.nombre;
    agregarAlCarritoButton.dataset.price = producto.precio;

    // Agregamos un event listener para el botón "Agregar al carrito"
    agregarAlCarritoButton.addEventListener('click', (e) => {
      const productName = agregarAlCarritoButton.dataset.product;
      const productPrice = parseFloat(agregarAlCarritoButton.dataset.price);
      const existingProduct = selectedProducts.find(product => product.name === productName);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        selectedProducts.push({ name: productName, price: productPrice, quantity: 1 });
      }

      actualizarCarrito();
      e.stopPropagation();
    });

    // Agregamos un event listener para mostrar la descripción del producto al hacer clic
    productoDiv.addEventListener('click', () => {
      mostrarDescripcionModal(producto);
    });

    // Agregamos los elementos al contenedor del producto
    productoDiv.appendChild(imagenProducto);
    productoDiv.appendChild(nombreProducto);
    productoDiv.appendChild(agregarAlCarritoButton);

    // Agregamos el contenedor del producto al contenedor general de productos
    productosContainer.appendChild(productoDiv);
  });
}

// Función para mostrar la descripción de un producto en un modal
function mostrarDescripcionModal(producto) {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const modalTitle = document.createElement('h2');
  modalTitle.textContent = producto.nombre;

  const modalDescription = document.createElement('p');
  modalDescription.textContent = producto.descripcion;

  const closeButton = document.createElement('span');
  closeButton.classList.add('close');
  closeButton.textContent = '×';

  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalDescription);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.style.display = 'block';
}
