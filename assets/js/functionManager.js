// Fonction effet machine à écrire (hero)
function typewriter(number) {
    const array = ["LOGO.", "SITE WEB.", "EMAILING.", "SEO.", "PROSPECTION.", "SOCIAL MEDIA."];
    setTimeout(() => {
        writeWord(array[number], 0, number)
    }, 500)
};

function writeWord(word, index, number) {
    if(word.length > 9 && window.matchMedia("(max-width: 442px)").matches) {
        document.querySelector('p strong').style.fontSize = "2.2em";
        //document.querySelector('p strong').style.fontSize = "2.5em"
    }
    if(index < word.length) {
        setTimeout(() => {
            document.querySelector('p strong').innerHTML += `${word[index]}`;
            writeWord(word, index + 1, number)
        }, 80 + 150 * Math.random())
    } else {
        eraseWord(word, index, number)
    }
}


function eraseWord(word, index, number) {
    if(index == word.length) {
        setTimeout(() => {
            document.querySelector('p strong').innerHTML = `${word.slice(0, index - 1)}`;
            eraseWord(word, index - 1, number)
        }, 1200)
    }
    else if(index < word.length && index !== 0) {
        setTimeout(() => {
            document.querySelector('p strong').innerHTML = `${word.slice(0, index - 1)}`;
            eraseWord(word, index - 1, number)
        }, 100)
    } else {
        if(number !== 5) {
            number ++;
            typewriter(number)
        } else {
            typewriter(0);
        }
    }
}

function interactWithHamburgerMenu() {
    let hamburgerMenu = document.querySelector("nav button");
    let dropDownMenu = document.querySelector(".dropdownMenu");
    let tl = gsap.timeline({paused:true})
    .to("#line3", {opacity:0,duration:0.01})
    .to(".dropdownMenu", {yPercent:100, duration:0.5, ease:"linear"}, "<")
    .to("#line1", {y:35, transformOrigin:"top", duration:0.3, ease:"linear"}, "<")
    .to("#line2", {y:35, transformOrigin:"top", duration:0.3, ease:"linear"}, "<")
    .to("#line1", {rotate:45, scale:0.8, transformOrigin:"top", duration:0.3, ease:"linear"}, ">0.1")
    .to("#line2", {rotate:-45, scale:0.8, transformOrigin:"top", duration:0.3, ease:"linear"}, "<")
    .to("#navCircle circle", {opacity:1}, "<")
    .fromTo("#navCircle circle", {drawSVG:"0%"}, {drawSVG:"100%", duration:1}, "<0.2")
    .fromTo(".dropdownMenu li", {opacity:0}, {opacity:1, stagger:0.1}, "<0.1")
    hamburgerMenu.addEventListener("click", function() {
        if(dropDownMenu.classList.contains ("inactive")) {
            dropDownMenu.classList.replace("inactive", "active");
            tl.play();
        } else {
            tl.reverse();
            dropDownMenu.classList.replace("active", "inactive");
    };
})
}