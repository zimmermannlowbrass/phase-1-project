let choices
let correctChoices
let correctChoice
let difficulty
let possiblePoints
let dragged
let score = 0

const possible_breweries = document.querySelector('#possible_breweries')
const ranking = document.querySelector('#ranking')
const select_difficulty = document.querySelector('select')
const form = document.querySelector('form')
const info_section = document.querySelector('.info_section')
const map_of_brewery = document.querySelector('iframe')
const scoreboard = document.querySelector('#score')
const play_again_prompt = document.querySelector('#play_again_prompt')

function resetAllChoices() {
    choices = []
    correctChoice = null
    correctChoices = []
}

function resetPageInformation() {
    possible_breweries.innerText = ''
    play_again_prompt.innerText = ''
}

document.addEventListener('DOMContentLoaded', () => {
    select_difficulty.addEventListener('change', () => {
        resetAllChoices()
        difficulty = select_difficulty.value
        possiblePoints = parseInt(difficulty)
        gatherPossibleChoices(difficulty)
    })
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (difficulty){
            resetPageInformation()
            let city = e.target['city'].value
            let state = e.target['state'].value
            grabCorrectAnswerBrewery(city, state)
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
    let p = document.createElement('p')
    p.className = 'choice'
    p.innerText = name 
    p.draggable = true
    let checkMark = document.createElement('input')
    checkMark.type = 'checkbox'
    checkMark.addEventListener('click', () => {
        if (name === correctChoice.name) {
            score = possiblePoints + score
            scoreboard.innerText = score
            changeRanking(score)
            checkMark.disabled = true
            p.innerText += ` - CORRECT!!`
            p.style.color = 'green'
            if (!play_again_prompt.hasChildNodes()) {
                let i = document.createElement('i')
                i.innerText = 'NICE JOB! Want to play again? Select a difficulty and hit "Beer (Quiz) Me"!'
                i.style.color = 'blue'
                play_again_prompt.appendChild(i)
            }
        } else {
            score -= 5
            scoreboard.innerText = score
            changeRanking(score)
            checkMark.disabled = true
            p.innerText += ` - INCORRECT.`
            p.style.color = 'red'
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
    card.id = 'breweryInfo'
    let h6 = document.createElement('h6')
    h6.innerText = `Name: ` + dragged.name + `\n` + `Brewery type: ` + dragged.brewery_type + `\n` + `Location: ` + dragged.street + `, ` + dragged.city + `, ` + dragged.state + `, ` + dragged.postal_code + `\n`
    let a = document.createElement('a')
    a.innerText = `Website: ` + dragged.website_url
    a.href = dragged.website_url
    h6.appendChild(a)
    card.appendChild(h6)
    info_section.appendChild(card)
}

function changeRanking(score) {
    switch(true) {
        case score < 0:
            ranking.innerText = `Ranking: designated driver`
            break
        case score < 5:
            ranking.innerText = `Ranking: light-weight`
            break
        case score <= 10:
            ranking.innerText = `Ranking: Beer Enthusiast`
            break
        case score <= 15:
            ranking.innerText = `Ranking: Beer Geek`
            break
        case score <= 20:
            ranking.innerText = `Ranking: Beer Aficionado`
            break
        case score <= 25:
            ranking.innerText = `Ranking: Beer Connoisseur`
            break
        case score <= 30:
            ranking.innerText = `Ranking: HEAD BREWMASTER`
            break
        case score >= 40:
            ranking.innerText = `YOU ARE A BEER SNOB`
            ranking.style.color = 'RED'
            ranking.style.textDecoration = 'underline'
            alert('YOU ARE A BEER SNOB')
            break
    }
}