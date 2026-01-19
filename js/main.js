const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
let index = 0;

const hideSlide = () => {
  slides.forEach((slide) => {
    slide.style.opacity = 0;
    slide.classList.remove("active_slide");
  });
};
const showSlide = (i = 0) => {
  slides[i].style.opacity = 1;
  slides[i].classList.add("active_slide");
};

hideSlide();
showSlide(index);

const autoSlider = (i = 0) => {
  setInterval(() => {
    i++;
    if (i > slides.length - 1) {
      i = 0;
    }
    hideSlide();
    showSlide(i);
  }, 10000);
};

next.onclick = () => {
  index < slides.length - 1 ? index++ : (index = 0);
  hideSlide();
  showSlide(index);
};

prev.onclick = () => {
  index > 0 ? index-- : (index = slides.length - 1);
  hideSlide();
  showSlide(index);
};

autoSlider(index);
