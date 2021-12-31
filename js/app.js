function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(function () {
  const list = document.querySelector(".gallery-carousel__img-container--list");
  const imgs = Array.from(list.children);
  const nextButton = document.querySelector(".gallery-carousel__btn--right");
  const prevButton = document.querySelector(".gallery-carousel__btn--left");
  const carouselNav = document.querySelector(".gallery-carousel__nav");
  const dots = Array.from(carouselNav.children);

  /* Getting the width of the images */
  const imgWidth = imgs[0].getBoundingClientRect().width;

  /* Arrange images next to one another */
  const setImagePosition = (img, index) => {
    img.style.left = imgWidth * index + "px";
  };
  imgs.forEach(setImagePosition);

  const moveToImg = (list, currentImg, targetImg) => {
    list.style.transform = "translateX(-" + targetImg.style.left + ")";
    currentImg.classList.remove("current--img");
    targetImg.classList.add("current--img");
  };

  const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current--img-dot");
    targetDot.classList.add("current--img-dot");
  };

  const hideShowArrows = (imgs, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
      prevButton.classList.add("hidden");
      nextButton.classList.remove("hidden");
    } else if (targetIndex === imgs.length - 1) {
      prevButton.classList.remove("hidden");
      nextButton.classList.add("hidden");
    } else {
      prevButton.classList.remove("hidden");
      nextButton.classList.remove("hidden");
    }
  };

  /* Clicking right button will move images to the left */
  nextButton.addEventListener("click", (e) => {
    const currentImg = list.querySelector(".current--img");
    const nextImg = currentImg.nextElementSibling;
    const currentDot = carouselNav.querySelector(".current--img-dot");
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = imgs.findIndex((img) => img === nextImg);
    /* Move to the next image */
    moveToImg(list, currentImg, nextImg);
    updateDots(currentDot, nextDot);
    hideShowArrows(imgs, prevButton, nextButton, nextIndex);
  });

  /* Clicking left button will move images to the right */
  prevButton.addEventListener("click", (e) => {
    const currentImg = list.querySelector(".current--img");
    const prevImg = currentImg.previousElementSibling;
    const currentDot = carouselNav.querySelector(".current--img-dot");
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = imgs.findIndex((img) => img === prevImg);
    /* Move to the next image */
    moveToImg(list, currentImg, prevImg);
    updateDots(currentDot, prevDot);
    hideShowArrows(imgs, prevButton, nextButton, prevIndex);
  });

  /* Clicking on dots will switch images */
  carouselNav.addEventListener("click", (e) => {
    const targetDot = e.target.closest("button");
    if (!targetDot) return;
    const currentImg = list.querySelector(".current--img");
    const currentDot = carouselNav.querySelector(".current--img-dot");
    const targetIndex = dots.findIndex((dot) => dot === targetDot);
    const targetImg = imgs[targetIndex];

    moveToImg(list, currentImg, targetImg);
    updateDots(currentDot, targetDot);
    hideShowArrows(imgs, prevButton, nextButton, targetIndex);
  });
});
