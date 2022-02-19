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
