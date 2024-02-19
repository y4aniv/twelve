function filterAccommodation(type) {
  const sortingButtons = {
    all: document.getElementById('sorting__all'),
    villa: document.getElementById('sorting__villa'),
    pavillon: document.getElementById('sorting__pavillon'),
  };
  const accommodationContent = document.getElementById(
    'accommodation__content',
  );

  document
    .querySelector('.sorting__active')
    .classList.remove('sorting__active');
  sortingButtons[type].classList.add('sorting__active');

  gsap.to('.content__item[style*="display: block;"]', {
    opacity: 0,
    y: 20,
    stagger: 0.2,
    onComplete() {
      const elements = document.querySelectorAll('.content__item');
      elements.forEach((element) => {
        const dataType = element.getAttribute('data-type').toLowerCase();
        if (type === 'all' || dataType === type) {
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        }
      });
      gsap.to('.content__item[style*="display: block;"]', {
        opacity: 1,
        y: 0,
        stagger: 0.2,
      });
    },
  });
}

document
  .getElementById('sorting__all')
  .addEventListener('click', () => filterAccommodation('all'));
document
  .getElementById('sorting__villa')
  .addEventListener('click', () => filterAccommodation('villa'));
document
  .getElementById('sorting__pavillon')
  .addEventListener('click', () => filterAccommodation('pavillon'));

gsap.to('.content__item', {
  scrollTrigger: {
    trigger: '.content__item',
    start: 'top center',
  },
  opacity: 1,
  y: 0,
  stagger: 0.2,
});

document.querySelectorAll('.content__item').forEach((element) => {
  element.style.display = 'block';
});
