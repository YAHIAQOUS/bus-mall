/* eslint-disable indent */
'use strict';


let attempts = 10;
let userAttempCounter = 0;
let productsArray = [];

let leftImageElement = document.getElementById('leftImage');
let midImageElement = document.getElementById('midImage');
let rightImageElement = document.getElementById('rightImage');

// console.log(leftImageElement, midImageElement, rightImageElement);


// Function for products
function Product(name, image) {
    this.name = name;
    this.image = image;
    this.votes = 0;
    this.display = 0;

    productsArray.push(this);
}

new Product('bag', 'images/bag.jpg');
new Product('banana', 'images/banana.jpg');
new Product('bathroom', 'images/bathroom.jpg');
new Product('boots', 'images/boots.jpg');
new Product('breakfast', 'images/breakfast.jpg');
new Product('bubblegum', 'images/bubblegum.jpg');
new Product('chair', 'images/chair.jpg');
new Product('cthulhu', 'images/cthulhu.jpg');
new Product('dog-duck', 'images/dog-duck.jpg');
new Product('dragon', 'images/dragon.jpg');
new Product('pen', 'images/pen.jpg');
new Product('pet-sweep', 'images/pet-sweep.jpg');
new Product('scissors', 'images/scissors.jpg');
new Product('shark', 'images/shark.jpg');
new Product('sweep', 'images/sweep.png');
new Product('tauntaun', 'images/tauntaun.jpg');
new Product('unicorn', 'images/unicorn.jpg');
new Product('usb', 'images/usb.gif');
new Product('water-can', 'images/water-can.jpg');
new Product('wine-glass', 'images/wine-glass.jpg');

console.log(productsArray);



// Function to generate random numbers
function randomNumber() {
    return Math.floor(Math.random() * productsArray.length);
}
randomNumber();



let leftImageIndex;
let midImageIndex;
let rightImageIndex;


// Function to render images
function renderImages() {
    leftImageIndex = randomNumber();
    midImageIndex = randomNumber();
    rightImageIndex = randomNumber();

    console.log('Before while', leftImageIndex, midImageIndex, rightImageIndex);

    while (leftImageIndex === midImageIndex || leftImageIndex === rightImageIndex || midImageIndex === rightImageIndex) {
        midImageIndex = randomNumber();
        rightImageIndex = randomNumber();
    }

    console.log('After while', leftImageIndex, midImageIndex, rightImageIndex);

    productsArray[leftImageIndex].display++;
    productsArray[midImageIndex].display++;
    productsArray[rightImageIndex].display++;

    leftImageElement.src = productsArray[leftImageIndex].image;
    midImageElement.src = productsArray[midImageIndex].image;
    rightImageElement.src = productsArray[rightImageIndex].image;
}
renderImages();



let imagesContainer = document.getElementById('imagesContainer');
// console.log(imagesContainer);


// Function for voting by click
imagesContainer.addEventListener('click', userClick);

function userClick(event) {
    // console.log(event.target.id);

    if (userAttempCounter < attempts-1) {

        if (event.target.id === 'leftImage') {
            productsArray[leftImageIndex].votes++;
            renderImages();
            userAttempCounter++;
        } else if (event.target.id === 'midImage') {
            productsArray[midImageIndex].votes++;
            renderImages();
            userAttempCounter++;
        } else if (event.target.id === 'rightImage') {
            productsArray[rightImageIndex].votes++;
            renderImages();
            userAttempCounter++;
        }

        console.log(productsArray);
        console.log(userAttempCounter);

    } else {

        if (event.target.id === 'leftImage') {
            productsArray[leftImageIndex].votes++;
            userAttempCounter++;
        } else if (event.target.id === 'midImage') {
            productsArray[midImageIndex].votes++;
            userAttempCounter++;
        } else if (event.target.id === 'rightImage') {
            productsArray[rightImageIndex].votes++;
            userAttempCounter++;
        }

        imagesContainer.removeEventListener('click', userClick);
        let resultsButton = document.createElement('button');
        let parent = document.getElementById('results');
        parent.appendChild(resultsButton);

        // console.log(parent);

        // from https://codepen.io/davidcochran/pen/WbWXoa
        resultsButton.innerHTML = 'View Results';

        resultsButton.addEventListener('click', renderResults);
    }


    // Function to render list of results
    function renderResults() {
        let resultsList = document.createElement('ul');
        let parent = document.getElementById('results');
        parent.appendChild(resultsList);


        for (let i = 0; i < productsArray.length; i++) {
            let result = document.createElement('li');
            resultsList.appendChild(result);
            result.textContent = `${productsArray[i].name} had ${productsArray[i].votes} votes, and was seen ${productsArray[i].display} times`;
        }
    }
}
