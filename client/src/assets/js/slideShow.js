
var slideIndex = 0;
showSlides(slideIndex);
setTimeoutSlide();


function plusSlides(n) {
  slideIndex += 1;
  showSlides(slideIndex)
}

function currentSlides(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

function showSlides(n) {
  let slideShowBlocks = document.getElementsByClassName("slider_item");
  let dots = document.getElementsByClassName("dotsForSlideShow");


  if (n > slideShowBlocks.length - 1) {
      slideIndex = 0;
      n = slideIndex;
  }
  if (n < 0) {
      slideIndex = slideShowBlocks.length - 1;
      n = slideIndex;
  }

  for (let i = 0; i < slideShowBlocks.length; i++) {
      if (i == slideIndex) {
          slideShowBlocks[i].style.display = "block";
          dots[i].style.opacity = "1";
          continue;
      }
      else {
          slideShowBlocks[i].style.display = "none";
          dots[i].style.opacity = "0.5";
      }
  }
}

function setTimeoutSlide() {
  setTimeout(function() {
    plusSlides();
    setTimeoutSlide();
  }, 4000);
  /* setTimeout(setTimeoutSlide, 4000); */
}

