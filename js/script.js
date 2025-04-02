// ******************************************************
// Copyright year setter

const copyrightYearEl = document.querySelector(".copyright-year");
const currentYear = new Date().getFullYear();
copyrightYearEl.textContent = currentYear;

// ******************************************************
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    //creates a data type named "href", which captures the clicked attribute
    const href = link.getAttribute("href");

    // scrolls smoothly back to top
    if (href === "#") {
      // prevents normal operation links
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // scrolls smoothly to selected section
    if (href !== "#" && href.startsWith("#")) {
      // prevents normal operation links
      e.preventDefault();
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    //Close mobile navigation
    if (link.classList.contains("nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

// ******************************************************
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      // adds the sticky class to the header when "isIntersecting" is false
      // or hero section is outside the viewport
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null, // null is the viewport
    threshold: 0, // 0 waits until the hero section is outside of the viewport
    rootMargin: "-80px", // height of sticky navigation in CSS
  }
);

// ******************************************************
// Make Mobile Navigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
// add and remove "nav-open" as clicked
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// ******************************************************
// Testimony Carousel

let currentIndex = 0;

function updateCarousel() {
  const carouselSlides = document.getElementById("testimonyCards");
  const cssCardWidth = document.querySelector(".testimony-card");
  const cssCardGapDist = parseInt(getComputedStyle(testimonyCards).gap, 10);
  const cardWidth = cssCardWidth.offsetWidth + cssCardGapDist; // Width of each card - Default: 670px
  carouselSlides.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

  const indicators = document.querySelectorAll(".testimonial-indicator");
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("testimonial-active", index === currentIndex);
  });

  console.log(
    "card width:" +
      cssCardWidth +
      ", card gap:" +
      cssCardGapDist +
      ", total card width:" +
      cardWidth
  );
}

function nextSlide() {
  const totalCards = document.querySelectorAll(
    ".testimony-cards .testimony-card"
  ).length;
  currentIndex = (currentIndex + 1) % totalCards; // Loop to first card
  updateCarousel();
}

function prevSlide() {
  const totalCards = document.querySelectorAll(
    ".testimony-cards .testimony-card"
  ).length;
  currentIndex = (currentIndex - 1 + totalCards) % totalCards; // Loop to last card
  updateCarousel();
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

// Observes the movement of the viewport
obs.observe(sectionHeroEl);

// ******************************************************
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
