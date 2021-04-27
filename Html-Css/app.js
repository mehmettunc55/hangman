const hiddenWord = document.querySelector('.word');
const wrongLetter = document.querySelector('#wrong-letters');
const tryAgainBtn = document.querySelector('#play-button');
const popup = document.querySelector('#popup-container');
const notification = document.querySelector('.notification-container');
const finalMessage = document.querySelector('#final-message');
const figurePart = document.querySelectorAll('.figure-part');
const words = ['hangman', 'clarusway', 'project', 'linux', 'react', 'python', 'babel'];

let luckyWord = words[Math.floor(Math.random() * words.length)];
const letterCorrect = [];
const letterWrong = [];

//display word function

function displayWord(){
    hiddenWord.innerHTML =
 `${luckyWord
    .split('')
    .map(
        (letter) => 
        `<span class='letter'>${
            letterCorrect.includes(letter)
             ? letter 
             : ''
            }</span>`
    )
    .join('')
}`;

const innerWord = hiddenWord.innerText.replace(/\n/g,'');

if(innerWord === luckyWord){
    finalMessage.innerHTML = '&#9786; !!Congragulations!! &#9786;'
    popup.style.display = 'flex';
}
}

//Wrong Letter Function

function updateWrongLetter(){
    wrongLetter.innerHTML = `
    ${letterWrong.length >0 ? '<p>Wrong</p>' : ''}
    ${letterWrong.map(letter =>`<span>${letter}</span>`)}
    `;
    //display body figureParts
figurePart.forEach((part,index)=>{
    const errors = letterWrong.length;
    if(index < errors){
        part.style.display= 'block';
    }else{
        part.style.display= 'none';
    }
});

//check if lost

if(letterWrong.length === figurePart.length){
    finalMessage.innerText = `Unfortunately You Lost!!! 
     The word is --${luckyWord}`
    popup.style.display = 'flex';
};
};


//show notification

function showNotification(){
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show')
    },3000)
}




//Keydown Letter Press
window.addEventListener('keydown', (e) => {
    //console.log(e.keyCode);
    if(e.keyCode >=65 && e.keyCode <=90){
        const letter = e.key;
        //console.log(letter);
        if(luckyWord.includes(letter)){
            if(!letterCorrect.includes(letter)){
                letterCorrect.push(letter);
                displayWord();
            }else{
                showNotification();
            }
        }else{
            if(!letterWrong.includes(letter)){
                letterWrong.push(letter);
                updateWrongLetter();
            }else{
                showNotification();
            }
        }
        
    }
});

// try/play again

tryAgainBtn.addEventListener('click', () => {
    letterCorrect.splice(0);
    letterWrong.splice(0);
    luckyWord = 
     words[
        Math.floor(Math.random() * words.length)
    ]; 
    displayWord();
    updateWrongLetter();
    popup.style.display = 'none';
});

displayWord();