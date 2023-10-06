// Carga el menú desde JSON
function cargarMenu() {
    // Obtenemos el archivo JSON
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "menu.json");
    xhr.onload = function() {
      // Procesamos los datos JSON
      var menu = JSON.parse(xhr.responseText);
  
      // Mostramos el menú
      var ul = document.querySelector("ul#menu");
      ul.innerHTML = "";
      for (var i = 0; i < menu.length; i++) {
        var item = menu[i];
        ul.innerHTML += "<li><img src='" + item.imagen + "' alt='" + item.nombre + "'><p>" + item.nombre + "</p><p>$" + item.precio + "</p><button type='button' class='agregar'>Agregar a la canasta</button></li>";
      }
    };
    xhr.send();
  }
  
  
// Agrega un ítem al menú
function agregarItem(item) {
    // Obtenemos la orden del usuario
    var orden = document.querySelector("ul#orden");
  
    // Agregamos el ítem a la orden
    var li = document.createElement("li");
    li.innerHTML = "<img src='" + item.imagen + "' alt='" + item.nombre + "'><p>" + item.nombre + "</p><p>$" + item.precio + "</p>";
    orden.appendChild(li);
  
    // Actualizamos el total
    actualizarTotal();
  }
  
  
  // Actualiza el total de la orden
  function actualizarTotal() {
    // Obtenemos el total de la orden
    var total = 0;
    var orden = document.querySelector("ul#orden");
    for (var i = 0; i < orden.children.length; i++) {
      var item = orden.children[i];
      total += item.querySelector("p").textContent * 1;
    }
  
    // Actualizamos el total en la pantalla
    document.querySelector("#total").textContent = total;
  }
  
  // Carga las reservaciones disponibles
  function cargarReservas() {
    // Obtenemos el archivo JSON
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "reservaciones.json");
    xhr.onload = function() {
      // Procesamos los datos JSON
      var reservas = JSON.parse(xhr.responseText);
  
      // Mostramos las reservaciones
      var ul = document.querySelector("ul#reservacion");
      ul.innerHTML = "";
      for (var i = 0; i < reservas.length; i++) {
        var reserva = reservas[i];
        ul.innerHTML += "<li>" + reserva.fecha + " " + reserva.hora + "</li>";
      }
    };
    xhr.send();
  }
  
  // Evento de clic del botón de agregar
  document.querySelector("ul#menu").addEventListener("click", function(e) {
    // Obtenemos el elemento que se ha clicado
    var item = e.target.closest("li");
  
    // Agregamos el ítem a la orden
    agregarItem(item);
  });
  
  // Evento de clic del botón de eliminar
  document.querySelector("ul#orden").addEventListener("click", function(e) {
    // Obtenemos el elemento que se ha clicado
    var item = e.target.closest("li");
  
    // Eliminamos el ítem de la orden
    eliminarItem(item);
  });
  
  // Evento de clic del botón de reservación
  document.querySelector("form#reservacion").addEventListener("submit", function(e) {
    // Obtenemos la fecha y hora de la reservación
    var fecha = document.querySelector("input[name='fecha']").value;
    var hora = document.querySelector("input[name='hora']").value;
  
    // Enviamos los datos al servidor
    var datos = new FormData(this);
    datos.append("fecha", fecha);
    datos.append("hora", hora);
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "index.php");
    xhr.send(datos);
  
    // Mostramos un mensaje de éxito
    if (xhr.status === 200) {
      alert("Reserva realizada correctamente");
    }
  
    // Limpiamos los campos del formulario
    document.querySelector("input[name='fecha']").value = "";
    document.querySelector("input[name='hora']").value = "";
  
    e.preventDefault();
  });
  
  // Cargamos el menú y las reservaciones
  cargarMenu();
  cargarReservas();
  // Evento de clic del botón de reservación
document.querySelector("form#reservacion").addEventListener("submit", function(e) {
    // Obtenemos la fecha y hora de la reservación
    var fecha = document.querySelector("input[name='fecha']").value;
    var hora = document.querySelector("input[name='hora']").value;
  
    // Validamos la fecha
    var fechaValida = false;
    var dia = fecha.split("-")[2];
    for (var i = 0; i < dias.length; i++) {
      if (dia == dias[i]) {
        fechaValida = true;
        break;
      }
    }
  
    // Si la fecha es válida, enviamos los datos al servidor
    if (fechaValida) {
      // Enviamos los datos al servidor
      var datos = new FormData(this);
      datos.append("fecha", fecha);
      datos.append("hora", hora);
  
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "index.php");
      xhr.send(datos);
  
      // Mostramos un mensaje de éxito
      if (xhr.status === 200) {
        alert("Reserva realizada correctamente");
      }
  
      // Limpiamos los campos del formulario
      document.querySelector("input[name='fecha']").value = "";
      document.querySelector("input[name='hora']").value = "";
  
      e.preventDefault();
    } else {
      // Mostramos un mensaje de error
      alert("La fecha seleccionada no es válida");
    }
  });
  