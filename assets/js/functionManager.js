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


// Ecriture et suppression des H2
function writeH2(whichH2, array, index, number) {
        if(index < array.length) {
        setTimeout(() => {
            document.querySelector("#about H2 span:nth-child(1)");
            document.querySelector(`${whichH2} span:nth-child(${number})`).style.visibility = "visible";
            writeH2(whichH2, array, index + 1, number + 1)
        }, 100)
}};


function eraseH2(whichH2, index, number) {
    if(index !== 0) {
        setTimeout(() => {
            // document.querySelector(`${whichH2}`).innerHTML = `${document.querySelector(`${whichH2}`).innerHTML.slice(0, index - 1)}`;
            document.querySelector(`${whichH2} span:nth-child(${number})`).style.visibility = "hidden";
            eraseH2(whichH2, index - 1, number - 1)
        }, 100)
    }
}
