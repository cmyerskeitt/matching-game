let cardArray = [
   {'name': "Free", "img": "https://images.pexels.com/photos/3746226/pexels-photo-3746226.jpeg?auto=compress&cs=tinysrgb&w=1600", },
   {'name': "Blue", "img": "https://images.pexels.com/photos/14263355/pexels-photo-14263355.jpeg?auto=compress&cs=tinysrgb&w=1600", },
   {'name': "Fierce", "img": "https://images.pexels.com/photos/9899348/pexels-photo-9899348.jpeg?auto=compress&cs=tinysrgb&w=1600", },
   {'name': "Loved", "img": "https://images.pexels.com/photos/11191614/pexels-photo-11191614.jpeg?auto=compress&cs=tinysrgb&w=1600", },
    {'name': "Solid", "img": "https://images.pexels.com/photos/11489857/pexels-photo-11489857.jpeg?auto=compress&cs=tinysrgb&w=1600", },
    {'name': "Puff", "img": "https://images.pexels.com/photos/14162172/pexels-photo-14162172.jpeg?auto=compress&cs=tinysrgb&w=1600", },
    {'name': "Original ", "img": "https://images.pexels.com/photos/10555641/pexels-photo-10555641.jpeg?auto=compress&cs=tinysrgb&w=1600", },
    {'name': "Serve", "img": "https://images.pexels.com/photos/718978/pexels-photo-718978.jpeg?auto=compress&cs=tinysrgb&w=1600", },
    {'name': "Swan", "img": "https://images.pexels.com/photos/1164674/pexels-photo-1164674.jpeg?auto=compress&cs=tinysrgb&w=1600", },
    {'name': "Sunshine", "img": "https://images.pexels.com/photos/2395921/pexels-photo-2395921.jpeg?auto=compress&cs=tinysrgb&w=1600", },
    {'name': "Body", "img": "https://images.pexels.com/photos/1903611/pexels-photo-1903611.jpeg?auto=compress&cs=tinysrgb&w=1600", },
    {'name': "Exodus", "img": "https://images.pexels.com/photos/1432238/pexels-photo-1432238.jpeg?auto=compress&cs=tinysrgb&w=1600", },
]

//Duplicate cardArray to create a match for each card
let gameGrid = cardArray.concat(cardArray)

//sort cards randomly within the grid
gameGrid.sort(() => {return .5 - Math.random()})

//Grab the div with an id of game-board and assign to a variable game 
let game = document.getElementById('game-board')

//Create a section element and assign it to variable grid 
let grid = document.createElement('section')

//Give section element a class of grid.
grid.setAttribute("class", "grid")

//Append the grid section to the game-board div
game.appendChild(grid)

//loop through ach item in our cards array
for (let i = 0; i< gameGrid.length; i++){
    // create a div element and assign it to the variable card
    let card = document.createElement('div')

    //apply a card class to that div 
    card.classList.add("card")

    //set the data-name attribute of the div to the cardArray name
    card.dataset.name = gameGrid[i].name

    //create front of card
    let front = document.createElement('div')
    front.classList.add('front')
    
    //create back of card 
    let back = document.createElement('div')
    back.classList.add('back')
    back.style.backgroundImage = `url(${gameGrid[i].img})`

    //Append the card to the grid section  
    grid.appendChild(card)
    card.appendChild(front)
    card.appendChild(back)
}

// Set count to 0
let count = 0 
let previousTarget = null
let delay = 1200;

//Store the first  adn second guess
let firstGuess = ""
let secondGuess = ""

//create a function to flag matched cards
let match = function(){
    //grab all cliecked cards
    let selected = document.querySelectorAll(".selected")
    //loop through cards and add the macth className
    for (let i = 0; i < selected.length; i++){
        selected[i].classList.add("match")
    }
}

///reset guesses after two attempts 
let resetGuesses = function(){
    firstGuess = ""
    secondGuess = ""
    count = 0 
    previousTarget = null

    let selected = document.querySelectorAll('.selected')
    for (i = 0; i < selected.length;i++){
        selected[i].classList.remove('selected')
    }
}

//Select the style cards
grid.addEventListener("click", (event) => {  
    let clicked = event.target
    //do not allow the grid to be selected
    if (clicked.nodeName === 'SECTION'|| clicked === previousTarget || clicked.parentNode.classList.contains("match") || clicked.parentNode.classList.contains("selected")){
        return
    }
    //only add slected card if the current count it less than 2
    if (count < 2){
        count++
        //
        if(count === 1){
            firstGuess = clicked.parentNode.dataset.name
            clicked.parentNode.classList.add("selected")
        } else {
            secondGuess = clicked.parentNode.dataset.name
            clicked.parentNode.classList.add("selected")
        }
        if( firstGuess !== "" && secondGuess !== ""){
            if(firstGuess === secondGuess){
                setTimeout(match, delay)
                setTimeout(resetGuesses, delay)
            } else {
                setTimeout(resetGuesses, delay)
            }
        }
        previousTarget = clicked
    }
    
})

