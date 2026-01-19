const modal = document.querySelector(".modal");
const openBtn = document.querySelector("#openModal");
const closeBtn = document.querySelector(".close");

const modalOpen = () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // отключаем скролл страницы
};

const modalClose = () => {
  modal.style.display = "none";
  document.body.style.overflow = ""; // включаем скролл
};

openBtn.onclick = modalOpen;
closeBtn.onclick = modalClose;

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modalClose();
  }
});

const onScroll = () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= documentHeight) {
    modalOpen();
    window.removeEventListener("scroll", onScroll);
  }
};

window.addEventListener("scroll", onScroll);

const modalInterval = setTimeout(modalOpen, 10000);
