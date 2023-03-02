let choices
let correctChoices
let correctChoice
let difficulty
let dragged


let possible_breweries = document.querySelector('#possible_breweries')
let select_difficulty = document.querySelector('select')
let form = document.querySelector('form')
let info_section = document.querySelector('.info_section')
let map_of_brewery = document.querySelector('iframe')


function resetAllChoices() {
    choices = []
    correctChoice = null
    correctChoices = []
}

document.addEventListener('DOMContentLoaded', () => {
    select_difficulty.addEventListener('change', () => {
        resetAllChoices()
        difficulty = select_difficulty.value
        gatherPossibleChoices(difficulty)
    })
    form.addEventListener('submit', (e) => {
        if (difficulty){
            e.preventDefault()
            possible_breweries.innerText = ''
            let city = e.target['city'].value
            let state = e.target['state'].value
            grabCorrectAnswerBrewery(city, state)
            form.reset()
            select_difficulty.selectedIndex = 0
            difficulty = null
        } else {
            alert('Pick a difficulty!')
        }
    })
    info_section.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    info_section.addEventListener("drop", (e) => {
        e.preventDefault()
        populateBreweryInfo(dragged)
    })

})

function gatherPossibleChoices(difficulty) {
    let i = 0
    while(i < (difficulty-1)) {
        let x = Math.floor(Math.random() * 8170)
        fetch(`https://api.openbrewerydb.org/breweries?page=${x}&per_page=1`)
        .then(resp => resp.json())
        .then(data => choices.push(data[0]))
        i++
    }
}

function grabCorrectAnswerBrewery(city, state) {
    fetch(`https://api.openbrewerydb.org/breweries?by_type=micro&by_state=${state}&by_city=${city}&per_page=50`)
    .then(resp => resp.json())
    .then(data => {
        let len = data.length
        if (len === 0) {
            alert('There are no breweries in this city! Try again')
        }
        correctChoices.push(data)
        correctChoice = randomCorrectBrewery(correctChoices, len)
        choices.push(correctChoice)
        choices = shuffleAllPossibleChoices(choices)
        choices.forEach(choice => populateAllPossibleChoices(choice))
        })   
    } 

function randomCorrectBrewery (correctChoices, len) {
    let x = Math.floor(Math.random() * len)
    return correctChoices[0][x]
}

function shuffleAllPossibleChoices(choices) {
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = choices[i];
        choices[i] = choices[j];
        choices[j] = temp;
        }
    return choices
}

function populateAllPossibleChoices(choice) {
    let name = choice.name
    let possible_breweries = document.querySelector('#possible_breweries')
    let p = document.createElement('p')
    p.className = 'choice'
    p.innerText = name
    p.draggable = true
    let checkMark = document.createElement('input')
    checkMark.type = 'checkbox'
    checkMark.addEventListener('click', () => {
        if (name === correctChoice.name) {
            alert('YOU ARE A BEER SNOB!')
        } else {
            alert('try again :(')
        }
    })
    p.prepend(checkMark)
    p.addEventListener('dragstart', () => {
        dragged = choice
    })
    possible_breweries.appendChild(p)
}

function populateBreweryInfo(dragged) {
    info_section.removeChild(info_section.lastChild)
    let card = document.createElement('card')
    let h6 = document.createElement('h6')
    h6.innerText = `Name: ` + dragged.name + `\n` + `Brewery type: ` + dragged.brewery_type + `\n` + `Location: ` + dragged.street + ', ' + dragged.city + `, ` + dragged.state + '\n'
    let a = document.createElement('a')
    a.innerText = `Website: ` + dragged.website_url
    a.href = dragged.website_url
    h6.appendChild(a)
    card.appendChild(h6)
    info_section.appendChild(card)
}


//to do--
//////change the drop site to be the iframe bar and populate the location link on google
//ofer to 'try again'?
//make a scorecard of the correct answers
//better flushout the info provided of the breweries!

//add css everywhere