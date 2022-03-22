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
    // .from("h1", {y:50, ease:"back(1.5)", duration:0.8}, "<")
    .from("p strong", {opacity:0}, ">")
    .from(".leaf2", {xPercent:-100, duration:0.8}, "<")
    .from(".leafdim2", {xPercent:-100, duration:0.8}, "<")
    .from("#leaves", {xPercent:100, duration:0.8}, "<0.2")
}

window.addEventListener("load", function(event) {
    init();
})

let headerChangeColor = gsap.to("nav a", {color: "#464646"});

ScrollTrigger.create({
    trigger:"#heroSection video",
    animation:headerChangeColor,
    start:"bottom 50",
    scroller:"#scrollContainer",
    toggleActions:"play none none reverse"
})


const services = document.querySelectorAll(".roundService");

services.forEach(service => {
    const serviceRound = service.querySelector(".roundService__circle");
    const hoverService = gsap.timeline({paused:true})
    .to(serviceRound, {scale:1.1, border: "dashed 2px rgba(255,179,179,0.6)", backgroundColor: "rgba(253,249,249,0.5)", duration:0.2})
    .to(serviceRound.querySelector("img"), {"filter": "grayscale(0%)", "-webkit-filter": "grayscale(100%)", duration:0.2}, 0.1)
    .to(service.querySelector("p"), {opacity:1, duration:0.5}, 0.2)

    service.addEventListener("mouseenter", () => hoverService.play());
    service.addEventListener("mouseleave", () => hoverService.reverse());

    service.addEventListener("click", function() {
        console.log("click")
    })
})


let articles = document.querySelectorAll("article");

articles.forEach((article) => {
    let heading = article.querySelector("h2");
    let h2Typewriting = gsap.fromTo(heading, {text:""}, {text:heading.textContent, duration:1, ease:"power.InOut"});

    ScrollTrigger.create({
    trigger:article,
    animation:h2Typewriting,
    start:"top 50%",
    end:"+=900",
    scroller:"#scrollContainer",
    pinSpacing:true,
    toggleActions: "restart none none reverse",
})
})









let active
let expanders = gsap.utils.toArray(".expander")

expanders.forEach(function(expander, index){
  let close = expander.querySelector(".close")
  let animation = gsap.timeline({paused:true})
  animation.to(expander, {width:200, duration:0.4})
  .from(close, {opacity:0, scale:0.4, duration:0.1, x:"-=10"}, "-=0.1")
  expander.animation = animation // assign the animation to the current element
  
  expander.addEventListener("click", function(){
    
    if(active){
      active.animation.reverse() // reverse (close) active element's animation
    }
    
    expander.animation.play() // play (open) the clicked element's animation
    active = expander
  })
  
  close.addEventListener("click", function(event){
    event.stopPropagation()
    expander.animation.reverse() 
  })
  
  console.log(expander)

})

gsap.set(".expander", {backgroundColor:gsap.utils.wrap(["#f5ce5b", "#c570b6", "#78d6e0"])})









ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

