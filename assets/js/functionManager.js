// Fonction effet machine à écrire (hero)
function typewriter(number) {
    console.log(number);
    const array = ["LOGO.", "SITE WEB.", "EMAILING.", "SEO.", "PROSPECTION"];
    setTimeout(() => {
        writeWord(array[number], 0, number)
    }, 500)
};

function writeWord(word, index, number) {
    if(index < word.length) {
        setTimeout(() => {
            document.querySelector('p strong').innerHTML += `${word[index]}`;
            writeWord(word, index + 1, number)
        }, 80 + 150 * Math.random())
    } else {
        console.log(word);
        console.log(index);
        eraseWord(word, index, number)
    }
}

function eraseWord(word, index, number) {
    console.log(number);
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
        if(number !== 4) {
            number ++;
            typewriter(number)
        } else {
            typewriter(0);
        }
    }
}