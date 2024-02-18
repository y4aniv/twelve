document.getElementById('button-menu').addEventListener('click', function () {
    gsap.to('.restaurant-menu', {
        x: 0,
        duration: 0.5,
        onComplete: function () {
            gsap.to('.menu__list li', {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
            })
        }
    })
});

document.getElementById('menu-close').addEventListener('click', function () {
    gsap.to('.restaurant-menu', {
        x: '100%',
        duration: 0.5,
        onComplete: function () {
            document.querySelectorAll('.menu__list li').forEach(function (li) {
                li.style.opacity = 0;
                li.style.transform = 'translateY(20px)';
            })
        }
    })
})