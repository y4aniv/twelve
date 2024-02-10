function filterAccommodation(type) {
    const sortingButtons = {
        'all': document.getElementById('sorting__all'),
        'villa': document.getElementById('sorting__villa'),
        'pavillon': document.getElementById('sorting__pavillon')
    };
    const accommodationContent = document.getElementById('accommodation__content');

    document.querySelector('.sorting__active').classList.remove('sorting__active');
    sortingButtons[type].classList.add('sorting__active');
    accommodationContent.style.opacity = 0;
    
    setTimeout(() => {
        const elements = document.querySelectorAll('.content__item');
        elements.forEach(element => {
            const dataType = element.getAttribute('data-type').toLowerCase();
            if (type === 'all' || dataType === type) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });
        accommodationContent.style.opacity = 1;
    }, 500);
}

document.getElementById('sorting__all').addEventListener('click', () => filterAccommodation('all'));
document.getElementById('sorting__villa').addEventListener('click', () => filterAccommodation('villa'));
document.getElementById('sorting__pavillon').addEventListener('click', () => filterAccommodation('pavillon'));
