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

let leavesMoving = gsap.timeline()
.to(".leaf2", {rotation:2.5, yoyo:true, repeat:-1, duration:7,ease: "sine.inOut", transformOrigin:"left"})
.to(".leafdim2", {rotation:3, yoyo:true, repeat:-1, duration:6.5,ease: "sine.inOut", transformOrigin:"left"}, 0.5)
.to("#leaves", {rotation:1.5, yoyo:true, repeat:-1, duration:6.5,ease: "sine.inOut", transformOrigin:"right"}, 0.5)

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
    if (window.matchMedia("(min-width: 1024px)").matches) {
        const serviceRound = service.querySelector(".roundService__circle");
        const hoverService = gsap.timeline({paused:true})
        .to(serviceRound, {scale:1.1, border: "dashed 2px rgba(255,179,179,0.6)", backgroundColor: "rgba(253,249,249,0.5)", duration:0.2})
        .to(serviceRound.querySelector("img"), {"filter": "grayscale(0%)", "-webkit-filter": "grayscale(100%)", duration:0.2}, 0.1)
        .fromTo(service.querySelector("p"), {opacity:0, scale:0.9}, {opacity:1, scale:1, duration:0.5}, 0.2)

        service.addEventListener("mouseenter", () => hoverService.play());
        service.addEventListener("mouseleave", () => hoverService.reverse());
      }

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
    start:"top 80%",
    end:"+=900",
    scroller:"#scrollContainer",
    pinSpacing:true,
    toggleActions: "restart none none reverse",
})
})


const buttons = {
	prev: document.querySelector(".btn--left"),
	next: document.querySelector(".btn--right"),
};


// TRY CARROUSEL

// function initCardEvents() {
// 	const currentCardEl = document.querySelector(".current--card");
//     console.log(currentCardEl);
// 	currentCardEl.addEventListener("mouseover", updateCard);
// 	currentCardEl.addEventListener("pointerout", (e) => {
// 		resetCardTransforms(e);
// 	});
// }

// function updateCard(e) {
// 	console.log("hey");
//     const card = e.currentTarget.parentElement;
// 	const box = card.getBoundingClientRect();
// 	const centerPosition = {
// 		x: box.left + box.width / 2,
// 		y: box.top + box.height / 2,
// 	};
//     console.log(card);
//     console.log(centerPosition);
// 	let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
//     console.log(angle);
// 	gsap.to(card, {
// 			// "--current-card-rotation-offset": `${angle}deg`,
//             rotateY:`${angle/2}deg`,
//             duration:1.5,
//             ease: "back.out(1.7)"
// 	});
//     console.log(card);
// 	// const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
// 	// gsap.set(currentInfoEl, {
// 	// 	rotateY: `${angle}deg`,
// 	// });
// }

// function resetCardTransforms(e) {
// 	const card = e.currentTarget.parentElement;
// 	// const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
// 	gsap.to(card, {
//         rotateY:0,
//         duration:1,
//         ease: "back.out(1.7)"
// 	});
// 	// gsap.set(currentInfoEl, {
// 	// 	rotateY: 0,
// 	// });
// }

// initCardEvents();

class parallaxTiltEffect {

    constructor({element, tiltEffect}) {
  
      this.element = element;
      this.container = this.element.querySelector(".container");
      this.size = [300, 360];
      [this.w, this.h] = this.size;
  
      this.tiltEffect = tiltEffect;
  
      this.mouseOnComponent = false;
  
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
      this.defaultStates = this.defaultStates.bind(this);
      this.setProperty = this.setProperty.bind(this);
      this.init = this.init.bind(this);
  
      this.init();
    }
  
    handleMouseMove(event) {
      const {offsetX, offsetY} = event;
  
      let X;
      let Y;
  
      if (this.tiltEffect === "reverse") {
        X = ((offsetX - (this.w/2)) / 3) / 8;
        Y = (-(offsetY - (this.h/2)) / 3) / 8;
      }
  
      else if (this.tiltEffect === "normal") {
        X = (-(offsetX - (this.w/2)) / 3) / 8;
        Y = ((offsetY - (this.h/2)) / 3) / 8;
      }
      
      gsap.timeline()
      .to(this.element, {rotateY : X.toFixed(2), rotateX: Y.toFixed(2)})

      this.setProperty('--bY', (80 - (X/4).toFixed(2)) + '%');
      this.setProperty('--bX', (50 - (Y/4).toFixed(2)) + '%');
      this.setProperty("filter", "drop-shadow(20px 20px 20px #000);")
    }
  
    handleMouseEnter() {
      this.mouseOnComponent = true;
      gsap.to(this.element, {scale:1.05, filter:"drop-shadow(10px 10px 10px rgba(0,0,0,0.2))"})
      this.container.classList.add("container--active");
    }
  
    handleMouseLeave() {
      this.mouseOnComponent = false;
      gsap.to(this.element, {scale:1})
      this.defaultStates();
    }
  
    defaultStates() {
      gsap.timeline()
      .to(this.element, {rotateY : 0, rotateX: 0, filter:"none"})
    //   this.setProperty('--bY', '80%');
    //   this.setProperty('--bX', '50%');
    //   this.classList.remove("container--active");
    }
  
    setProperty(p, v) {
      return this.container.style.setProperty(p, v);
    }
  
    init() {
      this.element.addEventListener('mousemove', this.handleMouseMove);
      this.element.addEventListener('mouseenter', this.handleMouseEnter);
      this.element.addEventListener('mouseleave', this.handleMouseLeave);
    }
  
  }
  
  const $ = e => document.querySelector(e);
  
  const wrap1 = new parallaxTiltEffect({
    element: $('.wrap--1'),
    tiltEffect: 'reverse'
  });
  
  const wrap2 = new parallaxTiltEffect({
    element: $('.wrap--2'),
    tiltEffect: 'normal'
  });
  
  const wrap3 = new parallaxTiltEffect({
    element: $('.wrap--3'),
    tiltEffect: 'reverse'
  });

  const wrap4 = new parallaxTiltEffect({
    element: $('.wrap--4'),
    tiltEffect: 'reverse'
  });
  
  const wrap5 = new parallaxTiltEffect({
    element: $('.wrap--5'),
    tiltEffect: 'normal'
  });
  
  const wrap6 = new parallaxTiltEffect({
    element: $('.wrap--6'),
    tiltEffect: 'reverse'
  });


ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh(); 

