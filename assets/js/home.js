gsap.registerPlugin(TextPlugin, ScrollTrigger);

const locoScroll = new LocomotiveScroll({
    el:document.querySelector('[data-scroll-container]'),
    smooth:true
});

locoScroll.on("scroll", ScrollTrigger.update());

ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, 
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
  });

function init() {
    let heroTimeline = gsap.timeline()
    .from("#animateHero", {autoAlpha:0})
    .from("video", {opacity:0, duration:0.1})
    .to("#heroSection__videoCover", {yPercent:-100, ease:"power4", duration:1}, "<")
    .from("a img", {yPercent:-160}, ">")
    .from("nav ul li", {yPercent:-240, stagger:0.1, duration:0.3}, "<0.2")
    .from("#heroSection__mouseSvg", {opacity:0, yoyo:true, repeat:2, duration:0.3}, "<")
    .from("h1", {y:50, ease:"back(1.5)", duration:0.8}, "<")
    .from("p strong", {opacity:0}, ">")
    .from(".leaf2", {xPercent:-100, duration:0.8}, "<")
    .from(".leafdim2", {xPercent:-100, duration:0.8}, "<")
    .from("#leaves", {xPercent:100, duration:0.8}, "<0.2")
}

window.addEventListener("load", function(event) {
    init();
    setTimeout(() => {
        typewriter(0);
    }, 2000)
})

let leavesMoving = gsap.timeline()
.to(".leaf2", {rotation:1.5, yoyo:true, repeat:-1, duration:7,ease: "sine.inOut", transformOrigin:"left"})
.to(".leafdim2", {rotation:2, yoyo:true, repeat:-1, duration:6.5,ease: "sine.inOut", transformOrigin:"left"}, 0.5)
.to("#leaves", {rotation:1.5, yoyo:true, repeat:-1, duration:6.5,ease: "sine.inOut", transformOrigin:"right"}, 0.5)

// let parallaxLeaves = 

// let tl = gsap.timeline({
//     scrollTrigger: {
        
//         trigger:"#visualIdentityBlock",
//         start:"bottom 80%",
//         end:"bottom 0%",
//         toggleActions: "restart none none none",
//         scrub:1
//     }
// })

// .from("h3", {x: -300, ease:"power2.InOut"}, 0)
// .from("span", {x: 300, ease:"power2.InOut"}, 0)
// .from("p", {y: 70}, 0)
// .from("#visualIdentityBlock video", {xPercent:10, ease:"linear"}, 0)

let headerChangeColor = gsap.to("nav a", {color: "#464646"});

ScrollTrigger.create({
    trigger:"#heroSection video",
    animation:headerChangeColor,
    start:"bottom 50",
    scroller:"#scrollContainer",
    toggleActions:"play none none reverse"
})

let sections = document.querySelectorAll(".animatedSection");

sections.forEach((section) => {
    let heading = section.querySelector("h2");
    let h2Typewriting = gsap.fromTo(heading, {text:""}, {text:heading.textContent, duration:1, ease:"power.InOut"});

    ScrollTrigger.create({
    trigger:section,
    animation:h2Typewriting,
    start:"top 50%",
    end:"+=900",
    scroller:"#scrollContainer",
    pinSpacing:true,
    toggleActions: "restart none none reverse",
})
})


let articles = document.querySelectorAll(".serviceArticle");

articles.forEach( (article) => {
    console.log(article);
    let tl = gsap.timeline()
        .fromTo(article, {yPercent:30, scale:0.9, opacity:0}, {yPercent:0, scale:1, opacity:1, duration:1, stagger:0.1})
        // .from(article.querySelector("h3"), {opacity:0}, "<0.1")
        // .from(article.querySelectorAll("h4"), {opacity:0, y:-5}, "<")
        // .from(article.querySelectorAll("p"), {opacity:0}, "<")
        // .from(article.querySelectorAll("hr"), {opacity:0, y:-10}, "<0.1")
        // .from(article.querySelectorAll("button"), {y:10, opacity:0}, "<")
        // .from(article.querySelector(".carrouselIcons"), {y:10, opacity:0}, "<")


    ScrollTrigger.create({
    trigger:article,
    scroller:"#scrollContainer",
    animation: tl,
    start:"top bottom",
    end:"center bottom",
    scrub:4,
    toggleActions: "play none none reverse",
    })
})


let aboutUs = document.querySelectorAll(".aboutFlex");

aboutUs.forEach( (about) => {
    let tl = gsap.timeline()
    .fromTo(about.querySelector("img"), {y:500, opacity:0}, {y:0, opacity:1, duration:2, ease:"back", stagger:3})
    .fromTo(about.querySelector(".texte"), {scale:0.95, opacity:0}, {scale:1, opacity:1, duration:1}, "<0.2")

    ScrollTrigger.create({
        trigger:document.querySelector("#about"),
        scroller:"#scrollContainer",
        animation: tl,
        start:"top bottom",
        scrub:4,
        toggleActions: "play none none reverse",
    })
})
  


ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();