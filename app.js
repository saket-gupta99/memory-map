const square = [
    {
        name: "doraemon",
        img: 'images/doraemon.png'
    },
    {
        name: "dragon",
        img: 'images/dragon.jpg'
    },
    {
        name: "inosuke",
        img: 'images/inosuke.jpg'
    },
    {
        name: "naruto",
        img: 'images/naruto.png'
    },
    {
        name: "pikachu",
        img: 'images/pikachu.jpg'
    },
    {
        name: "rimuru",
        img: 'images/Rimuru.jpg'
    },
    {
        name: "saitama",
        img: 'images/saitama.png'
    },
    {
        name: "sukuna",
        img: 'images/sukuna.jpg'
    },
    {
        name: "yagami",
        img: 'images/Yagami-Light.jpg'
    },
    {
        name: "doraemon",
        img: 'images/doraemon.png'
    },
    {
        name: "dragon",
        img: 'images/dragon.jpg'
    },
    {
        name: "inosuke",
        img: 'images/inosuke.jpg'
    },
    {
        name: "naruto",
        img: 'images/naruto.png'
    },
    {
        name: "pikachu",
        img: 'images/pikachu.jpg'
    },
    {
        name: "rimuru",
        img: 'images/Rimuru.jpg'
    },
    {
        name: "saitama",
        img: 'images/saitama.png'
    },
    {
        name: "sukuna",
        img: 'images/sukuna.jpg'
    },
    {
        name: "yagami",
        img: 'images/Yagami-Light.jpg'
    }
];

square.sort(() => 0.5 - Math.random());

const board = document.querySelector('.board');
const text = document.querySelector('.text');
const score = document.querySelector('.score');

let chosenCard = [];
let chosenCardId = [];
const rightCard = [];
let result = 0;

function createBoard() {
    for (let i = 0; i < square.length; i++) {
        const img = document.createElement('img');
        img.src = 'images/mushroom.png';
        img.setAttribute('data-id', i);
        img.addEventListener('click', flipCard);
        board.append(img);
    }
}

createBoard();

function flipCard() {
    const card = this.dataset.id;
    chosenCard.push(square[card].name);
    chosenCardId.push(card);

    this.src = square[card].img;

    if (chosenCard.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const image = document.querySelectorAll('img');
    const optionOne = chosenCardId[0];
    const optionTwo = chosenCardId[1];

    
    if (optionOne === optionTwo) {
        image[optionOne].src = 'images/mushroom.png';
        playSound('sounds/wrong-answer.mp3');
        showFlash(document.body, false);
    } else if (chosenCard[0] === chosenCard[1]) {
        result++;
        score.textContent = result;
        rightCard.push(chosenCard);
        image[optionOne].src = '';
        image[optionTwo].src = '';
        image[optionOne].removeEventListener('click', flipCard);
        image[optionTwo].removeEventListener('click', flipCard);
        playSound('sounds/right-answer.mp3');
        showFlash(document.body, true);
    } else {
        image[optionOne].src = 'images/mushroom.png';
        image[optionTwo].src = 'images/mushroom.png';
        playSound('sounds/wrong-answer.mp3');
        showFlash(document.body, false);
    }

    chosenCard = [];
    chosenCardId = [];

    if (square.length/2 === rightCard.length) {
        score.textContent = "Congratulations, You won!";
        playSound('sounds/success_bell.mp3');
        board.remove();
    }
}

function playSound(sound) {
    var music = new Audio(sound);
    music.play();
}

function showFlash(bodyElement, isCorrect) {
    const flash = isCorrect ? 'flash-green' : 'flash-red';
    bodyElement.classList.add(flash);

    setTimeout(()=>{
        bodyElement.classList.remove(flash);
    }, 500);
}