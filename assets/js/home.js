const heroWord = document.querySelector("p strong");
let topi = 0;

typewriter(0);

/*window.addEventListener("wheel", function(e) {
    if(e.deltaY > 0 && e.pageY >= 800 && this.document.querySelector('h2').transform !== 'translateY(50px)') {
        this.document.querySelector('h2').animate([
            {transform: `translateY(0px)`},
            {transform: `translateY(50px)`}
        ], {
            duration: 500,
        });
        this.document.querySelector('h2').style.transform = `translateY(50px)`;
    } else if(e.deltaY < 0 && e.pageY >= 800 && this.document.querySelector('h2').transform !== 'translateY(0px)') {
        let oldTranslate = Number(document.querySelector('h2').style.transform.replace(/[^\d]/g, ""));
        this.document.querySelector('h2').animate([
            {transform: `translateY(50px)`},
            {transform: `translateY(0px)`}
        ], {
            duration: 200,
        });
        this.document.querySelector('h2').style.transform = `translateY(0px)`;
    }
});*/

window.addEventListener("wheel", function(e) {
    if(e.deltaY > 0 && e.pageY >= 700) {
        let H2Array = document.querySelector('h2').textContent.split('');
        writeH2(H2Array, 0, 1);
    };
    if(e.deltaY > 0 && e.pageY >= 1300 && this.document.querySelector('h2').style.filter !== 'blur(8px)') {
        this.document.querySelector('h2').animate([
            {filter:'blur(0px)'},
            {filter:'blur(8px)'},
        ], {
            duration: 700
        });
        this.document.querySelector('h2').style.filter = `blur(8px)`;
    } else if(e.deltaY < 0 && e.pageY <= 2050 && this.document.querySelector('h2').style.filter !== 'blur(0px)') {
        this.document.querySelector('h2').animate([
            {filter:'blur(8px)'},
            {filter:'blur(0px)'}
        ], {
            duration: 700
        });
        this.document.querySelector('h2').style.filter = `blur(0px)`;
    }
})