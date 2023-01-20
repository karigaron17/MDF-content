const $carousel = document.querySelector(".shop-the-collection > div");
const $carouselH2 = document.querySelector(".shop-the-collection-container h2");
const $slide = document.querySelectorAll(".shop-the-collection > div > div");
const $slide1 = document.querySelector(".shop-the-collection > div > div:nth-child(1)");
const $slide2 = document.querySelector(".shop-the-collection > div > div:nth-child(2)");
const $slide3 = document.querySelector(".shop-the-collection > div > div:nth-child(3)");
const $toggle = document.querySelectorAll(".toggle");

//Create buttons
const $nextBtn = document.createElement("button");
const $prevBtn = document.createElement("button");
$nextBtn.innerHTML = "<span>Next</span>";
$prevBtn.innerHTML = "<span>Prev</span>";

//Add button class
$nextBtn.classList.add("toggle");
$prevBtn.classList.add("toggle");

//Add button data-toggle
$nextBtn.setAttribute("data-toggle", "next");
$prevBtn.setAttribute("data-toggle", "prev");

//Add controls
document.querySelector(".shop-the-collection").append($nextBtn);
document.querySelector(".shop-the-collection").append($prevBtn);

//Set slides aria label for accessability
$slide1.setAttribute("aria-label", "Slide one of three");
$slide2.setAttribute("aria-label", "Slide two of three");
$slide3.setAttribute("aria-label", "Slide three of three");

//Add class to last slide
document.querySelector(".shop-the-collection > div > div:last-child").classList.add("is-ref");


//Mobile Carousel functionality
function mobileCarousel() {
  if (window.innerWidth < 600) {

    // const $slide1 = document.querySelector(".shop-the-collection > div > div:nth-child(1)");
    // $slide.forEach((elem) => elem.style.display = "none");
    // $slide1.style.display = "block";
    
    $carouselH2.setAttribute("id", "carouselHeading");
    $carousel.setAttribute("aria-labelledby", "carouselHeading");

    document.addEventListener("click", delegate(toggleFilter, toggleHandler));
    // Common helper for event delegation.
    function delegate(criteria, listener) {
      return function (e) {
        var el = e.target;
        do {
          if (!criteria(el)) {
            continue;
          }
          e.delegateTarget = el;
          listener.call(this, e);
          return;
        } while ((el = el.parentNode));
      };
    }

    // Custom filter to check for required DOM elements
    function toggleFilter(elem) {
      return elem instanceof HTMLElement && elem.matches(".toggle");
      // OR
      // For < IE9
      // return elem.classList && elem.classList.contains('btn');
    }

    // Custom event handler function
    function toggleHandler(e) {
      var $newSlide;
      var $el = document.querySelector(".is-ref");
      const $currSliderControl = e.delegateTarget;
      // Info: e.target is what triggers the event dispatcher to trigger and e.currentTarget is what you assigned your listener to.

      $el.classList.remove("is-ref");
      if ($currSliderControl.getAttribute("data-toggle") === "next") {
        $newSlide = next($el);
        $carousel.classList.remove("is-reversing");
      } else {
        $newSlide = prev($el);
        $carousel.classList.add("is-reversing");
      }

      $newSlide.classList.add("is-ref");
      $newSlide.style.order = 1;
      for (var i = 2;i <= $slide.length; i++) {
        $newSlide = next($newSlide);
        $newSlide.style.order = i;
      }

      $carousel.classList.remove("is-set");
      return setTimeout(function () {
        return $carousel.classList.add("is-set");
      }, 50);

      function next($el) {
        if ($el.nextElementSibling) {
          return $el.nextElementSibling;
        } else {
          return $carousel.firstElementChild;
        }
      }

      function prev($el) {
        if ($el.previousElementSibling) {
          return $el.previousElementSibling;
        } else {
          return $carousel.lastElementChild;
        }
      }
    }


  
      
      
    




  }
  
  
}


window.addEventListener("resize", mobileCarousel);
window.addEventListener("load", mobileCarousel);