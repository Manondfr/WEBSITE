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


// Survol boutons Know More
const items = document.querySelectorAll(".knowMoreButton");

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


// Essai carrousel
const tl = gsap.timeline();

tl
.fromTo(".serviceArticle__paragraph3", {opacity:1, scale:1}, {opacity:0, scale:0.9})
.fromTo(".serviceArticle__h4_3 h4", {opacity:1, scale:1}, {opacity:0, scale:0.9}, "<")
.add("paragraph1")
.fromTo(".serviceArticle__paragraph1", {opacity:0, scale:0.9}, {opacity:1, scale:1})
.fromTo(".serviceArticle__h4_1 h4", {opacity:0, scale:0.9}, {opacity:1, scale:1}, "<")
.addPause()
.to(".serviceArticle__paragraph1", {opacity:0, scale:0.9})
.to(".serviceArticle__h4_1 h4", {opacity:0, scale:0.9}, "<")
.to(".serviceArticle__h4_1 hr", {opacity:0}, "<")
.add("paragraph2")
.fromTo(".serviceArticle__paragraph2", {opacity:0, scale:0.9}, {opacity:1, scale:1})
.fromTo(".serviceArticle__h4_2 h4", {opacity:0, scale:0.9}, {opacity:1, scale:1}, "<")
.addPause()
.to(".serviceArticle__paragraph2", {opacity:0, scale:0.9})
.to(".serviceArticle__h4_2 h4", {opacity:0, scale:0.9}, "<") 
.to(".serviceArticle__h4_2 hr", {opacity:0}, "<")
.add("paragraph3")
.fromTo(".serviceArticle__paragraph3", {opacity:0, scale:0.9}, {opacity:1, scale:1})
.fromTo(".serviceArticle__h4_3 h4", {opacity:0, scale:0.9}, {opacity:1, scale:1}, "<")
.addPause()

let touchstartX = 0
let touchendX = 0


function handleGesture(article) {
  if (touchendX < touchstartX) {
      console.log("swiped left next");
      if(tl.previousLabel() == "paragraph3"){
        tl.play(0);
        let activeCircle = article.querySelector(".active");
        activeCircle.classList.remove("active");
        article.querySelector(".circle[data-label='paragraph1']").classList.add("active");
      } else {
        tl.play();
        let activeCircle = article.querySelector(".active");
        activeCircle.classList.remove("active");
        activeCircle.nextElementSibling.classList.add("active")
      }
  }
  if (touchendX > touchstartX) {
    if(tl.previousLabel() != "paragraph1"){
        tl.reverse()
        let activeCircle = article.querySelector(".active");
        activeCircle.classList.remove("active");
        activeCircle.previousElementSibling.classList.add("active")
      }
  }
}

articles.forEach((article) => {
    if(article.querySelector(".carrouselIcons .next")) {
        article.querySelector(".carrouselIcons .next").addEventListener("click", function() {
            if(tl.previousLabel() == "paragraph3"){
                tl.play(0);
                let activeCircle = article.querySelector(".active");
                activeCircle.classList.remove("active");
                article.querySelector(".circle[data-label='paragraph1']").classList.add("active");
              } else {
                tl.play();
                let activeCircle = article.querySelector(".active");
                activeCircle.classList.remove("active");
                activeCircle.nextElementSibling.classList.add("active")
              }
        });
        article.querySelector(".carrouselIcons .prev").addEventListener("click", function() {
            if(tl.previousLabel() != "paragraph1"){
                tl.reverse()
                let activeCircle = article.querySelector(".active");
                activeCircle.classList.remove("active");
                activeCircle.previousElementSibling.classList.add("active")
              }
        });
        article.querySelectorAll(".circle").forEach((circle) => {
            circle.addEventListener("click", function() {
                tl.play(this.getAttribute("data-label"));
                article.querySelectorAll(".circle").forEach((circle) => {
                    circle.classList.remove("active")
                })
                circle.classList.add("active");
            })
        })
        article.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX
        })

        article.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX
        handleGesture(article)
        })
    }
})

const getLabelsArray = timeline => Object.keys(timeline.labels).map(v => ({name: v, time: timeline.labels[v]})).sort((a,b) => a.time - b.time)
let labels = getLabelsArray(tl)
console.log(labels);

// labels.forEach(function(item, index){
//   console.log(item.name)
//   let dot = document.createElement("div")
//   dot.setAttribute("class", "dot")
//   dot.setAttribute("data-label", item.name)
//   document.querySelector(".dotNav").appendChild(dot)
//   dot.addEventListener("click", function()  {
//     console.log(this.getAttribute("data-label"))
//     tl.play(this.getAttribute("data-label"))
//   })

// })



function startAgain() {
    gsap.delayedCall(0.5, function() {
        tl.play(0)
    })
}






















ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();