const sliderLength = document.getElementsByClassName('accommodation-detail__slider')[0].children.length;
let sliderIndex = 0;

setInterval(() => {
    sliderIndex = (sliderIndex + 1) % sliderLength;
    document.getElementsByClassName('accommodation-detail__slider')[0].children[sliderIndex].style.opacity = 1;
    document.getElementsByClassName('accommodation-detail__slider')[0].children[(sliderIndex + sliderLength - 1) % sliderLength].style.opacity = 0;
    console.log(sliderIndex);
}, 3000);