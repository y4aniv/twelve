gsap.registerPlugin(ScrollTrigger);

gsap.to(".keywords__text span", {
    scrollTrigger: {
        trigger: ".keywords__text",
        start: "10% 60%",
        end: "bottom 60%",
        scrub: 1,
    },
    opacity: 0.1,
    stagger: 0.1,
});