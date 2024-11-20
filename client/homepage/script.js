let currentSection = 0;
const container = document.getElementById('container');
let isAnimating = false;

document.addEventListener('wheel', (event) => {
  if (isAnimating) return;

  isAnimating = true;

  const delta = event.deltaY;

  if (delta > 0 && currentSection < 1) {
    currentSection++;
  } else if (delta < 0 && currentSection > 0) {
    currentSection--;
  }

  container.style.transform = `translateY(-${currentSection * 100}vh)`;

  setTimeout(() => {
    isAnimating = false;
  }, 800);
});

document.addEventListener('keydown', (event) => {
  if (isAnimating) return;

  if (event.key === 'ArrowDown' && currentSection < 1) {
    currentSection++;
  } else if (event.key === 'ArrowUp' && currentSection > 0) {
    currentSection--;
  }

  container.style.transform = `translateY(-${currentSection * 100}vh)`;

  isAnimating = true;
  setTimeout(() => {
    isAnimating = false;
  }, 800);
});

let touchStartY = 0;

container.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

container.addEventListener('touchend', (e) => {
  const touchEndY = e.changedTouches[0].clientY;

  if (touchStartY - touchEndY > 50 && currentSection < 1) {
    currentSection++;
  } else if (touchEndY - touchStartY > 50 && currentSection > 0) {
    currentSection--;
  }

  container.style.transform = `translateY(-${currentSection * 100}vh)`;

  isAnimating = true;
  setTimeout(() => {
    isAnimating = false;
  }, 800);
});

container.style.pointerEvents = "none";

setTimeout(() => {
  isAnimating = false;
  container.style.pointerEvents = "auto";
}, 800);

document.querySelectorAll('.clickable').forEach(element => {
  element.addEventListener('click', () => {
      const targetId = element.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      const sectionIndex = Array.from(container.children).indexOf(targetSection);

      container.style.transform = `translateY(-${sectionIndex * 100}vh)`;
  });
});