const heroWord = document.querySelector("p strong");
let topi = 0;

typewriter(0);

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

window.addEventListener("wheel", function(e) {
    //disableScroll();
})

window.addEventListener("wheel", function(e) {
    if(e.deltaY > 0 && e.pageY > 0 && e.pageY < 1300) {
        window.scrollTo({
            top:this.window.pageYOffset + this.window.innerHeight,
            behavior: 'smooth'
          });
    let H2Array = document.querySelector('h2').textContent.split('');
    this.setTimeout(() => {
        writeH2(H2Array, 0, 1);
    }, 500)
    } else {
        if(e.deltaY > 0) {
            this.window.scrollTo({
                top:this.window.pageYOffset + this.window.innerHeight,
                behavior:"smooth",
            })
        } else {
            this.window.scrollTo({
                top:this.window.pageYOffset - this.window.innerHeight,
                behavior:"smooth"
            })            
        }
    }
})

window.addEventListener("wheel", function(e) {
    if(e.deltaY > 0 && e.pageY >= 700) {
        let H2Array = document.querySelector('h2').textContent.split('');
        writeH2(H2Array, 0, 1);
        console.log(e.pageY);
        console.log(e.pageX);
    };
    if(e.deltaY > 0 && e.pageY >= 1300 && this.document.querySelector('h2').style.filter !== 'blur(8px)') {
        this.document.querySelector('h2').animate([
            {filter:'blur(0px)'},
            {filter:'blur(8px)'},
        ], {
            duration: 700
        });
        this.document.querySelector('h2').style.filter = `blur(8px)`;
    } else if(e.deltaY < 0 && e.pageY <= 2150 && this.document.querySelector('h2').style.filter !== 'blur(0px)') {
        this.document.querySelector('h2').animate([
            {filter:'blur(8px)'},
            {filter:'blur(0px)'}
        ], {
            duration: 700
        });
        this.document.querySelector('h2').style.filter = `blur(0px)`;
    }
});


window.addEventListener('wheel', function(e) {
    if(e.deltaY > 0 && e.pageY >= 900 && this.document.querySelector('#visualIdentity').style.visibility !== "visible" && !this.document.querySelector('#visualIdentityBlock__AppearanceDiv').style.transform) {
        let animation = this.document.querySelector('#visualIdentityBlock__AppearanceDiv').animate([
            {transform:'scale(0,0)', opacity:1},
            {transform: 'scale(0.05, 1)', opacity:1},
           {transform: 'scale(1,1)', opacity:1},
       ], {
           duration: 500
       });
       animation;
       this.document.querySelector('#visualIdentityBlock__AppearanceDiv').style.transform = "scale(1,1)";
       animation.onfinish = event => {
        this.setTimeout(() => {
            this.document.querySelector('#visualIdentityBlock__AppearanceDiv').animate([
                {opacity:1},
                {opacity:0}
            ], {
                duration: 200,
            });
            this.document.querySelector('#visualIdentity').style.visibility = "visible";
            this.document.querySelector('#visualIdentityBlock__AppearanceDiv').style.opacity = 0;
        }, 300);
       }
       
    }
})

window.addEventListener("wheel", function(e) {
    if(e.deltaY > 0 && e.pageY > 2000 && this.document.querySelector('#webDevelopementSection').style.visibility !== "visible") {
        this.document.querySelector('#webDevelopementSection video').style.visibility = "visible";
        this.document.querySelector('#webDevelopementSection video').play();
        this.setTimeout(() => {
            this.document.querySelector('#webDevelopementSection').style.visibility = "visible";
        }, 1200)
    }
})