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