
gsap.registerPlugin(TextPlugin, ScrollTrigger, ScrollSmoother);


let smoother = ScrollSmoother.create({
  smooth: 1,               // how long (in seconds) it takes to "catch up" to the native scroll position
  smoothTouch:0.1,


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

document.querySelector("#heroSection__mouseSvg").addEventListener("click", (e) => {
    // smoother.scrollTo("#servicesSection", true, "top")
    gsap.to(smoother, {
      scrollTop: smoother.offset(".h2Container__first", "top"),
      duration:2.5,
      ease: "back.out(1.2)"
    })
  })

let leavesMoving = gsap.timeline()
.to(".leaf2", {rotation:2.5, yoyo:true, repeat:-1, duration:7,ease: "sine.inOut", transformOrigin:"left"})
.to(".leafdim2", {rotation:3, yoyo:true, repeat:-1, duration:6.5,ease: "sine.inOut", transformOrigin:"left"}, 0.5)
.to("#leaves", {rotation:1.5, yoyo:true, repeat:-1, duration:6.5,ease: "sine.inOut", transformOrigin:"right"}, 0.5)

let headerChangeColor = gsap.to("nav a", {color: "#464646"});

ScrollTrigger.create({
    trigger:"#heroSection video",
    animation:headerChangeColor,
    start:"bottom 50",
    toggleActions:"play none none reverse"
})

let h2Appearance = gsap.timeline()
.to(".h2Container__first span:first-child", {opacity:0, yPercent:-50, scale:0.9})
.fromTo(".h2Container__first span:last-child",{opacity:0, yPercent:0, scale:0.9}, {opacity:1, yPercent:-100, scale:1})


ScrollTrigger.create({
  trigger:".h2Container__first",
  animation:h2Appearance,
  start:"top 50",
  end:"+=1000",
  pin:true,
  pinSpacing:true,
  toggleActions:"play none none reverse"
})


document.querySelectorAll(".h3Container").forEach((h3Container) => {
  
  let h3Appearance = gsap.timeline()
  .fromTo(h3Container.querySelector("h3"), {opacity:0, scale:0.9}, {y:-200, opacity:1, scale:1})
  .fromTo(h3Container.querySelectorAll(".secondAppearance"), {opacity:0, y:100, scale:0.9}, {opacity:1, y:-200, scale:1, stagger:0.2}, "<0.2")
  .from(h3Container, {backgroundSize:"0% 80%"}, 0)

  ScrollTrigger.create({
    trigger:h3Container,
    animation:h3Appearance,
    start:"top 80%",
    toggleActions:"play none none reverse",
  })
})

// let circleMoving = gsap.timeline()
// .fromTo("#circle", {rotation:0, y:0}, {rotation:360, y:1500, duration:20, ease:"linear"})

// ScrollTrigger.create({
//   trigger:"#aboutSection",
//   animation:circleMoving,
//   start:"top top",
//   end:"bottom 50%",
//   toggleActions:"play none none reverse",
//   scrub:true,
// })


  // Survol boutons Know More
const items = document.querySelectorAll(".callToAction");

items.forEach((item) => {
    const tl = gsap
    .timeline({ paused: true })
    .to(item, {color:"#464646", duration:0.1})
    .fromTo(item, {
        "--opacity": 0,
    }, {"--opacity": 1, color:"black", y:-3, duration:0.2}, "<")

  item.addEventListener("mouseenter", () => tl.play());
  item.addEventListener("mouseleave", () => tl.reverse());
})



