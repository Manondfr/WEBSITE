
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


const services = document.querySelectorAll(".roundService");


let articles = document.querySelectorAll("article");

articles.forEach((article) => {
    let heading = article.querySelector("h2");
    let h2Typewriting = gsap.timeline()
    // .fromTo(article.querySelector(".h2Container"), {x:-100}, {x:0, transformOrigin:"left", duration:0.5}, "<")
    .fromTo(heading, {text:""}, {text:heading.textContent, duration:1, ease:"power.InOut"})
    .fromTo(article.querySelectorAll(".wrap"), {y:50, opacity:0}, {y:0, opacity:1, duration:2, ease:"back", stagger:0.1}, "<0.2")


    ScrollTrigger.create({
    trigger:article,
    animation:h2Typewriting,
    start:"top 80%",
    end:"+=900",
    pinSpacing:true,
    toggleActions: "restart none none reverse",
})

    article.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", function() {
            let number = button.getAttribute("data-id");
            console.log(number);
            // gsap.to(`.wrap--${number}`, {rotationY:180, duration:3, ease:"power1.inOut"})
            gsap.to(`.faces[data-id="${number}"]`, {rotationY:180, duration:3, ease:"power1.inOut"})
        })
    })
})


const buttons = {
	prev: document.querySelector(".btn--left"),
	next: document.querySelector(".btn--right"),
};


// TILT EFFECT


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
        X = ((offsetX - (this.w/2)) / 3) / 20;
        Y = (-(offsetY - (this.h/2)) / 3) / 20;
      }
  
      else if (this.tiltEffect === "normal") {
        X = (-(offsetX - (this.w/2)) / 3) / 20;
        Y = ((offsetY - (this.h/2)) / 3) / 20;
      }
      
      gsap.timeline()
      .to(this.element, {rotateY : X.toFixed(2), rotateX: Y.toFixed(2)})

      // this.setProperty('--bY', (80 - (X/4).toFixed(2)) + '%');
      // this.setProperty('--bX', (50 - (Y/4).toFixed(2)) + '%');
      this.setProperty("filter", "drop-shadow(20px 20px 20px #000);")
    }
  
    handleMouseEnter() {
      this.mouseOnComponent = true;
      gsap.to(this.element, {scale:1.05, filter:"drop-shadow(0px 10px 10px rgba(0,0,0,1))"})
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



  let touchstartX = 0
  let touchendX = 0
  
  
  function handleGesture(article, tl) {
    if ((touchstartX - touchendX) > 50) {
      if(article.querySelector(".serviceArticle__paragraph3")) {
          if(tl.previousLabel() == "paragraph3"){
              tl.play("paragraph1");
              let activeCircle = article.querySelector(".active");
              activeCircle.classList.remove("active");
              article.querySelector(".circle[data-label='paragraph1']").classList.add("active");
            } else {
              tl.play(tl.nextLabel());
              let activeCircle = article.querySelector(".active");
              activeCircle.classList.remove("active");
              activeCircle.nextElementSibling.classList.add("active")
            }
      } else {
          if(tl.previousLabel() == "paragraph2"){
              tl.play("paragraph1");
              let activeCircle = article.querySelector(".active");
              activeCircle.classList.remove("active");
              article.querySelector(".circle[data-label='paragraph1']").classList.add("active");
            } else {
              tl.play(tl.nextLabel());
              let activeCircle = article.querySelector(".active");
              activeCircle.classList.remove("active");
              activeCircle.nextElementSibling.classList.add("active")
            } 
      }
    }
    if ((touchendX - touchstartX) > 50) {
      if(tl.previousLabel() != "paragraph1"){
          tl.reverse(tl.previousLabel())
          let activeCircle = article.querySelector(".active");
          activeCircle.classList.remove("active");
          activeCircle.previousElementSibling.classList.add("active")
        }
    }
  }
  
  articles.forEach((article) => {
      let tl = gsap.timeline();
      tl.add("paragraph1")
      .fromTo(article.querySelector(".serviceArticle__paragraph1"), {opacity:0, scale:0.9}, {opacity:1, scale:1})
      .fromTo(article.querySelector(".serviceArticle__h4_1 h4"), {opacity:0, scale:0.9}, {opacity:1, scale:1}, "<")
      .fromTo(article.querySelector(".serviceArticle__h4_1 .number"), {opacity:0, scale:0.9}, {opacity:1, scale:1}, "<")
      .fromTo(article.querySelector(".serviceArticle__h4_1 hr:nth-child(1)"), {opacity:0, scale:0.8}, {opacity:1, scale:1, transformOrigin:"left"}, "<")
      .fromTo(article.querySelector(".serviceArticle__h4_1 hr:last-child"), {opacity:0,scale:0.8}, {opacity:1, scale:1, transformOrigin:"right"}, "<")
      .addPause()
      .to(article.querySelector(".serviceArticle__paragraph1"), {opacity:0, scale:0.9})
      .to(article.querySelector(".serviceArticle__h4_1 .number"), {opacity:0, scale:0.9}, "<")
      .to(article.querySelector(".serviceArticle__h4_1 h4"), {opacity:0, scale:0.9}, "<")
      .to(article.querySelectorAll(".serviceArticle__h4_1 hr"), {opacity:0}, "<")
      .add("paragraph2")
      .fromTo(article.querySelector(".serviceArticle__paragraph2"), {opacity:0, scale:0.9}, {opacity:1, scale:1})
      .fromTo(article.querySelector(".serviceArticle__h4_2 h4"), {opacity:0, scale:0.9}, {opacity:1, scale:1}, "<")
      .fromTo(article.querySelector(".serviceArticle__h4_2 .number"), {opacity:0, scale:0.9}, {opacity:1, scale:1}, "<")
      .fromTo(article.querySelector(".serviceArticle__h4_2 hr:nth-child(1)"), {opacity:0, scale:0.8}, {opacity:1, scale:1, transformOrigin:"left"}, "<")
      .fromTo(article.querySelector(".serviceArticle__h4_2 hr:last-child"), {opacity:0, scale:0.8}, {opacity:1, scale:1, transformOrigin:"right"}, "<")
      .addPause()
      .to(article.querySelector(".serviceArticle__paragraph2"), {opacity:0, scale:0.9})
      .to(article.querySelector(".serviceArticle__h4_2 .number"), {opacity:0, scale:0.9}, "<")
      .to(article.querySelector(".serviceArticle__h4_2 h4"), {opacity:0, scale:0.9}, "<") 
      .to(article.querySelectorAll(".serviceArticle__h4_2 hr"), {opacity:0}, "<")
      .add("paragraph3")
      .fromTo(article.querySelector(".serviceArticle__paragraph3"), {opacity:0, scale:0.9}, {opacity:1, scale:1})
      .fromTo(article.querySelector(".serviceArticle__h4_3 h4"), {opacity:0, scale:0.9}, {opacity:1, scale:1}, "<")
      .fromTo(article.querySelector(".serviceArticle__h4_3 .number"), {opacity:0, scale:0.9}, {opacity:1, scale:1}, "<")
      .fromTo(article.querySelector(".serviceArticle__h4_3 hr:nth-child(1)"), {opacity:0, scale:0.8}, {opacity:1, scale:1, transformOrigin:"left"}, "<")
      .fromTo(article.querySelector(".serviceArticle__h4_3 hr:last-child"), {opacity:0, scale:0.8}, {opacity:1, scale:1, transformOrigin:"right"}, "<")
      .addPause()
      .to(article.querySelector(".serviceArticle__paragraph3"), {opacity:0, scale:0.9})
      .to(article.querySelector(".serviceArticle__h4_3 .number"), {opacity:0, scale:0.9}, "<")
      .to(article.querySelector(".serviceArticle__h4_3 h4"), {opacity:0, scale:0.9}, "<") 
      .to(article.querySelectorAll(".serviceArticle__h4_3 hr"), {opacity:0}, "<")
      .add("paragraph4")
      .fromTo(article.querySelector(".serviceArticle__paragraph4"), {opacity:0, scale:0.9}, {opacity:1, scale:1})
      .fromTo(article.querySelector(".serviceArticle__h4_4 h4"), {opacity:0, scale:0.9}, {opacity:1, scale:1}, "<")
      .fromTo(article.querySelector(".serviceArticle__h4_4 .number"), {opacity:0, scale:0.9}, {opacity:1, scale:1}, "<")
      .fromTo(article.querySelector(".serviceArticle__h4_4 hr:nth-child(1)"), {opacity:0, scale:0.8}, {opacity:1, scale:1, transformOrigin:"left"}, "<")
      .fromTo(article.querySelector(".serviceArticle__h4_4 hr:last-child"), {opacity:0, scale:0.8}, {opacity:1, scale:1, transformOrigin:"right"}, "<")
      .addPause()
  
      if(article.querySelector(".carrouselIcons .next")) {
          article.querySelector(".carrouselIcons .next").addEventListener("click", function() {
              if(article.querySelector(".serviceArticle__paragraph4")) {
                  if(tl.previousLabel() == "paragraph4"){
                      tl.play("paragraph1");
                      let activeCircle = article.querySelector(".active");
                      activeCircle.classList.remove("active");
                      article.querySelector(".circle[data-label='paragraph1']").classList.add("active");
                    } else {
                      tl.play(tl.nextLabel());
                      let activeCircle = article.querySelector(".active");
                      activeCircle.classList.remove("active");
                      activeCircle.nextElementSibling.classList.add("active")
                    }
              } else if(!article.querySelector(".serviceArticle__paragraph4") && article.querySelector(".serviceArticle__paragraph3") ) {
                if(tl.previousLabel() == "paragraph3"){
                    tl.play("paragraph1");
                    let activeCircle = article.querySelector(".active");
                    activeCircle.classList.remove("active");
                    article.querySelector(".circle[data-label='paragraph1']").classList.add("active");
                  } else {
                    tl.play(tl.nextLabel());
                    let activeCircle = article.querySelector(".active");
                    activeCircle.classList.remove("active");
                    activeCircle.nextElementSibling.classList.add("active")
                  }
              }
              
              
              else {
                  if(tl.previousLabel() == "paragraph2"){
                      tl.play("paragraph1");
                      let activeCircle = article.querySelector(".active");
                      activeCircle.classList.remove("active");
                      article.querySelector(".circle[data-label='paragraph1']").classList.add("active");
                    } else {
                      tl.play(tl.nextLabel());
                      let activeCircle = article.querySelector(".active");
                      activeCircle.classList.remove("active");
                      activeCircle.nextElementSibling.classList.add("active")
                    } 
              }
          });
          article.querySelector(".carrouselIcons .prev").addEventListener("click", function() {
              if(tl.previousLabel() != "paragraph1"){
                  tl.reverse(tl.previousLabel())
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
          console.log(touchstartX);
          })
  
          article.addEventListener('touchend', e => {
          touchendX = e.changedTouches[0].screenX
          console.log(touchendX);
          handleGesture(article, tl)
          })
      }
  })


  
  ScrollTrigger.create({
    trigger:"body",
    start:"top top",
    end:"bottom bottom",
    pin:"header",
    pinSpacing:false,
  })

  // Survol boutons Know More
const items = document.querySelectorAll(".callToAction");

items.forEach((item) => {
    const tl = gsap
    .timeline({ paused: true })
    // .to(item, {color:"#464646", duration:0.1})
    .fromTo(item, {
        "--opacity": 0,
    }, {"--opacity": 1, color:"black", y:-3, duration:0.2}, "<")

  item.addEventListener("mouseenter", () => tl.play());
  item.addEventListener("mouseleave", () => tl.reverse());
})



