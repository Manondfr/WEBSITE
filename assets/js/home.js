const heroWord = document.querySelector("p strong");
let topi = 0;

typewriter(0);

window.addEventListener("wheel", function(e) {
    /*if(e.deltaY >= 0 && e.pageY >= 860){
        let blurNumber = 2;
        document.querySelector('h2').style.filter = `blur(${blurNumber}px)`;
        document.querySelector('h2').offsetTop = e.pageY + 100;
        blurNumber++
        //document.querySelector('h2').style.top = `${topi + 100}px`;
    } else {
        console.log('no')
    }*/
    if(e.deltaY > 0 && e.pageY >= 800) {
        let oldTranslate = Number(document.querySelector('h2').style.transform.replace(/[^\d]/g, ""));
        this.document.querySelector('h2').animate([
            {transform: `translateY(${oldTranslate}px)`},
            {transform: `translateY(${oldTranslate + 50}px)`}
        ], {
            duration: 200,
        });
        this.document.querySelector('h2').style.transform = `translateY(${oldTranslate + 50}px)`;
    } else if(e.deltaY < 0 && e.pageY >= 800) {
        let oldTranslate = Number(document.querySelector('h2').style.transform.replace(/[^\d]/g, ""));
        this.document.querySelector('h2').animate([
            {transform: `translateY(${oldTranslate}px)`},
            {transform: `translateY(${oldTranslate - 50}px)`}
        ], {
            duration: 200,
        });
        this.document.querySelector('h2').style.transform = `translateY(${oldTranslate - 50}px)`;
    }
});



