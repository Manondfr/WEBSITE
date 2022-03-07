gsap.registerPlugin(TextPlugin, ScrollTrigger);

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
.to("h2:after", {scaleX:0}, {scaleX:1})
.fromTo("h2", { text:"" },
    { text: document.querySelector('h2').textContent, duration:1, ease:"power.InOut"})


ScrollTrigger.create({
    trigger:"h2",
    animation:h2Typewriting,
    start:"top 30%",
    end:"+=600",
    markers:true,
    toggleActions: "restart none none reverse",
    // scrub:true,
    pin:true,
    // pinSpacing:true
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
window.addEventListener("mousemove", function(e) {
    positionUpdate(e);
})
  
    function positionUpdate(event) { 
      var x_cursor = event.pageX;
      var y_cursor = event.pageY;
      var x_box = document.querySelector("#cube").getBoundingClientRect().left;
      var y_box = document.querySelector("#cube").getBoundingClientRect().top;
  
      document.querySelector("#cube").animate({
        left: event.pageX + "px",
        top: event.pageY + "px"
      }, {
        duration: 300
    });
    document.querySelector("#cube").style.left = event.pageX + "px";
    document.querySelector("#cube").style.top =  event.pageY + "px";
    };


// // Stop scroll
// var keys = {37: 1, 38: 1, 39: 1, 40: 1};

// function preventDefault(e) {
//   e.preventDefault();
// }

// function preventDefaultForScrollKeys(e) {
//   if (keys[e.keyCode]) {
//     preventDefault(e);
//     return false;
//   }
// }

// // modern Chrome requires { passive: false } when adding event
// var supportsPassive = false;
// try {
//   window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
//     get: function () { supportsPassive = true; } 
//   }));
// } catch(e) {}

// var wheelOpt = supportsPassive ? { passive: false } : false;
// var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// // call this to Disable
// function disableScroll() {
//   window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
//   window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
//   window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
//   window.addEventListener('keydown', preventDefaultForScrollKeys, false);
// }

// // call this to Enable
// function enableScroll() {
//   window.removeEventListener('DOMMouseScroll', preventDefault, false);
//   window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
//   window.removeEventListener('touchmove', preventDefault, wheelOpt);
//   window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
// }



// window.addEventListener("wheel", function(e) {
//     disableScroll();
//     if(e.deltaY > 0 && e.pageY > 0 & e.pageY < 3000) {
//         // window.scrollTo({
//         //     top:this.window.pageYOffset + this.window.innerHeight,
//         //     behavior: 'smooth'
//         //   });
//     let H2 = "#servicesSection h2";
//     let H2Array = document.querySelector(H2).textContent.split('');
//     this.setTimeout(() => {
//         writeH2(H2,H2Array,0,1);
//     }, 500)
//     }
//     if(e.deltaY > 0 && this.document.querySelector('#commercialSection').getBoundingClientRect().top + this.document.querySelector('#commercialSection').offsetHeight < 250) {
//         let H2 = "#servicesSection h2";        
//         let H2Array = document.querySelector(H2).textContent.split('');
//         eraseH2(H2,H2Array.length,H2Array.length);
//         let H2_2 = "#about h2";
//         let H2_2Array = document.querySelector(H2_2).textContent.split('');
//         this.setTimeout(() => {
//             writeH2(H2_2,H2_2Array,0,1);
//         }, 1000)
//     } else if(e.deltaY < 0 && this.document.querySelector('#commercialSection').getBoundingClientRect().top + this.document.querySelector('#commercialSection').offsetHeight > 250) {
//         let H2 = "#about h2";        
//         let H2Array = document.querySelector(H2).textContent.split('');
//         eraseH2(H2,H2Array.length,H2Array.length);
//         let H2_2 = "#servicesSection h2";
//         let H2_2Array = document.querySelector(H2_2).textContent.split('');
//         this.setTimeout(() => {
//             writeH2(H2_2,H2_2Array,0,1);
//         }, 1000)
//     }
//      this.document.querySelector(".pageY p").textContent = this.document.querySelector('#commercialSection').getBoundingClientRect().top + this.document.querySelector('#commercialSection').offsetHeight + " / " + e.pageY;
     
//      // if(e.deltaY > 0 && e.pageY >)
//     enableScroll(); 
    
    
//     /*else {
//         if(e.deltaY > 0) {
//             this.window.scrollTo({
//                 top:this.window.pageYOffset + this.window.innerHeight,
//                 behavior:"smooth",
//             })
//         } else {
//             this.window.scrollTo({
//                 top:this.window.pageYOffset - this.window.innerHeight,
//                 behavior:"smooth"
//             })            
//         }
//     }*/
// })

// // Blur H2
// // window.addEventListener("wheel", function(e) {
// //     if(e.deltaY > 0 && e.pageY >= 1300 && this.document.querySelector('h2:nth-child(1)').style.filter !== 'blur(2px)') {
// //         this.document.querySelector('h2:nth-child(1)').animate([
// //             {filter:'blur(0px)'},
// //             {filter:'blur(2px)'},
// //         ], {
// //             duration: 700
// //         });
// //         this.document.querySelector('h2:nth-child(1)').style.filter = `blur(2px)`;
// //     } else if(e.deltaY < 0 && e.pageY <= 2150 && this.document.querySelector('h2:nth-child(1)').style.filter !== 'blur(0px)') {
// //         this.document.querySelector('h2:nth-child(1)').animate([
// //             {filter:'blur(2px)'},
// //             {filter:'blur(0px)'}
// //         ], {
// //             duration: 700
// //         });
// //         this.document.querySelector('h2:nth-child(1)').style.filter = `blur(0px)`;
// //     }
// // });


// // Apparition visual Identity
// window.addEventListener('wheel', function(e) {
//     if(e.deltaY > 0 && e.pageY >= 900 && this.document.querySelector('#visualIdentity').style.visibility !== "visible" && !this.document.querySelector('#visualIdentityBlock__AppearanceDiv').style.transform) {
//         let animation = this.document.querySelector('#visualIdentityBlock__AppearanceDiv').animate([
//             {transform:'scale(0,0)', opacity:1},
//             {transform: 'scale(0.05, 1)', opacity:1},
//            {transform: 'scale(1,1)', opacity:1},
//        ], {
//            duration: 500
//        });
//        animation;
//        this.document.querySelector('#visualIdentityBlock__AppearanceDiv').style.transform = "scale(1,1)";
//        animation.onfinish = event => {
//         this.setTimeout(() => {
//             this.document.querySelector('#visualIdentityBlock__AppearanceDiv').animate([
//                 {opacity:1},
//                 {opacity:0}
//             ], {
//                 duration: 200,
//             });
//             this.document.querySelector('#visualIdentity').style.visibility = "visible";
//             this.document.querySelector('#visualIdentityBlock__AppearanceDiv').style.opacity = 0;
//         }, 300);
//        }
       
//     }
// })
