//variables
let choices
let correctChoices
let correctChoice
let difficulty
let possiblePoints
let dragged
let score = 0

//grabbed sections of html
let possible_breweries = document.querySelector('#possible_breweries')
let ranking = document.querySelector('#ranking')
let select_difficulty = document.querySelector('select')
let form = document.querySelector('form')
let info_section = document.querySelector('.info_section')
let map_of_brewery = document.querySelector('iframe')
let scoreboard = document.querySelector('#score')
let play_again_prompt = document.querySelector('#play_again_prompt')

//reset fetched choices
function resetAllChoices() {
    choices = []
    correctChoice = null
    correctChoices = []
}
//reset page
function resetPageInformation() {
    possible_breweries.innerText = ''
    play_again_prompt.innerText = ''
}


document.addEventListener('DOMContentLoaded', () => {
    //select difficulty
    select_difficulty.addEventListener('change', () => {
        resetAllChoices()
        difficulty = select_difficulty.value
        possiblePoints = parseInt(difficulty)
        gatherPossibleChoices(difficulty)
    })
    //submit form
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (difficulty){
            resetPageInformation()
            let city = e.target['city'].value
            let state = e.target['state'].value
            grabCorrectAnswerBrewery(city, state)
            //reset difficulty to ensure new choices
            select_difficulty.selectedIndex = 0
            difficulty = null
        } else {
            alert('Pick a difficulty!')
        }
    })
    //allow dragover
    info_section.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    //provide brewery info
    info_section.addEventListener("drop", (e) => {
        e.preventDefault()
        populateBreweryInfo(dragged)
    })
})


//fetch possible choices that are incorrect
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

//fetch possible choices that are correct
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
//      vvv    forEach used here   vvv
        choices.forEach(choice => populateAllPossibleChoices(choice))
//      ^^^    forEach used here   ^^^

        })   
    } 
//randomly grab one correct choice
function randomCorrectBrewery (correctChoices, len) {
    let x = Math.floor(Math.random() * len)
    return correctChoices[0][x]
}

//randomly shuffle all choices so correct choice is not at the end
// *Fisher-Yates Shuffle*
function shuffleAllPossibleChoices(choices) {
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = choices[i];
        choices[i] = choices[j];
        choices[j] = temp;
        }
    return choices
}

//populate all choices to the document
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
            checkMark.disabled = true
            changeRanking(score)
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
            checkMark.disabled = true
            changeRanking(score)
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

//populate information of dragged brewery name
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

//determine the rank of user
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
            ranking.innerText = `Ranking: Head Brewmaster`
            break
        case score >= 40:
            ranking.innerText = `YOU ARE A BEER SNOB.`
            ranking.style.color = 'RED'
            alert('YOU ARE A BEER SNOB.')
            break
    }
}




//check for BEST label names of functions

//better describe the rules of the game on the html page

