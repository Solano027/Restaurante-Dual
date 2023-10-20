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

