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
    .to("#videoCover", {yPercent:-100, ease:"power4", duration:1}, "<")
    .from("a img", {yPercent:-160}, ">")
    .from("nav ul li", {yPercent:-240, stagger:0.1, duration:0.3}, "<0.2")
    .from("#heroSection__mouseSvg", {opacity:0, yoyo:true, repeat:2, duration:0.3}, "<")
    .from("h1", {y:50, ease:"back(1.5)", duration:0.8}, "<")
    .from("p strong", {opacity:0}, ">")
    .from("#leaf2", {xPercent:-100, duration:0.8}, "<")
    .from("#leafdim2", {xPercent:-100, duration:0.8}, "<")
    .from("#leaves", {xPercent:100, duration:0.8}, "<0.2")
}

window.addEventListener("load", function(event) {
    init();
    setTimeout(() => {
        typewriter(0);
    }, 2000)
})

let leavesMoving = gsap.timeline()
.to("#leaf2", {rotation:1.5, yoyo:true, repeat:-1, duration:7,ease: "sine.inOut", transformOrigin:"left"})
.to("#leafdim2", {rotation:2, yoyo:true, repeat:-1, duration:6.5,ease: "sine.inOut", transformOrigin:"left"}, 0.5)
.to("#leaves", {rotation:1.5, yoyo:true, repeat:-1, duration:6.5,ease: "sine.inOut", transformOrigin:"right"}, 0.5)

// let parallaxLeaves = 

let tl = gsap.timeline({
    scrollTrigger: {
        
        trigger:"#visualIdentityBlock",
        start:"bottom 80%",
        end:"bottom 0%",
        toggleActions: "restart none none none",
        scrub:1
    }
})

// .from("h3", {x: -300, ease:"power2.InOut"}, 0)
// .from("span", {x: 300, ease:"power2.InOut"}, 0)
// .from("p", {y: 70}, 0)
// .from("#visualIdentityBlock video", {xPercent:10, ease:"linear"}, 0)



let h2Typewriting = gsap.timeline()
.fromTo("h2", { text:"" },
    { text: document.querySelector('h2').textContent, duration:1, ease:"power.InOut"})


ScrollTrigger.create({

    trigger:"#heroSection video",
    animation:h2Typewriting,
    start:"bottom 30%",
    end:"+=600",
    scroller:"#scrollContainer",
    markers:true,
    toggleActions: "restart none none reverse",
})


// gsap.to(".animatedLine", {
//     y:40, duration:10, transformOrigin: "top", 
//         scrollTrigger: {
//             trigger: ".animatedLine",
//             markers:true,
//             start: "top 75%",
//             end: "bottom 50%",
//             scrub: 1
//         }
// });

// const item = document.querySelector(".item");
// gsap.defaults({ duration: 0.3 });
// const tl = gsap
//   .timeline({ paused: true })
//   .to(".text", { color: "white", x: 10 })
//   .to(".dot", { backgroundColor: "#F93", scale: 1.5 }, 0);

// item.addEventListener("mouseenter", () => tl.play());
// item.addEventListener("mouseleave", () => tl.reverse());




//Cercle suivant le curseur
// window.addEventListener("mousemove", function(e) {
//     positionUpdate(e);
// })
  
//     function positionUpdate(event) { 
//       var x_cursor = event.pageX;
//       var y_cursor = event.pageY;
//       var x_box = document.querySelector("#cube").getBoundingClientRect().left;
//       var y_box = document.querySelector("#cube").getBoundingClientRect().top;
  
//       document.querySelector("#cube").animate({
//         left: event.pageX + "px",
//         top: event.pageY + "px"
//       }, {
//         duration: 300
//     });
//     document.querySelector("#cube").style.left = event.pageX + "px";
//     document.querySelector("#cube").style.top =  event.pageY + "px";
//     };



ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();
