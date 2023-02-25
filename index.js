let choices
let ready = false
let correctChoices
let difficulty
// let correctChoice = correctChoices[correctChoices.length - 2]

//
//ideas for cleaning this up is to make the 'check my city' a form
//and then make the quiz just a button that populates the breweries
//


document.addEventListener('DOMContentLoaded', () => {
    let select_difficulty = document.querySelector('select')
    select_difficulty.addEventListener('change', () => {
        difficulty = select_difficulty.value
        gatherPossibleWrongChoices(difficulty)
    })
})



function gatherPossibleWrongChoices(difficulty) {
    let i = 0
    while(i < (difficulty-1)) {
        let x = Math.floor(Math.random() * 8170)
        fetch(`https://api.openbrewerydb.org/breweries?page=${x}&per_page=1`)
        .then(resp => resp.json())
        .then(data => choices.push(data[0]))
        i++
    }
}





//CLEAN THIS UP//

document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form')
    correctChoices = []
    choices = []
    // let submit = document.querySelector('#submitter')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let city = e.target['city'].value
        let state = e.target['state'].value
        
        grabCorrectAnswerBrewery(city, state)
        
        // let possible_breweries = document.querySelector('#possible_breweries')
        // possible_breweries.innerText = ''
        
        // if (ready === true && e.submitter === submit) {
        //     choices = suffleChoices(choices)
        //     choices.forEach(choice => populatePossibleChoices(choice))
        // }
        // choices = gatherPossibleWrongChoices(difficulty)
    })
})




function grabCorrectAnswerBrewery(city, state) {
    //
    fetch(`https://api.openbrewerydb.org/breweries?by_type=micro&by_state=${state}&by_city=${city}&per_page=50`)
    .then(resp => resp.json())
    .then(data => {
        let len = data.length
        if (len === 0) {
            alert('There are no breweries in this city! Try again')
        }
        correctChoices.push(data)
        let correctChoice = randomCorrectBrewery(correctChoices, len)
        
        

        // .then(resp => resp.json())
        // .then(data => {
        //     correctChoices.push(data[0])
        //     choices.push(data[0])})
        })   
    } 

function randomCorrectBrewery (correctChoices, len) {
    let x = Math.floor(Math.random() * len)
    console.log(correctChoices[0][x])
    return correctChoices[x]
}






function suffleChoices(choices) {
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = choices[i];
        choices[i] = choices[j];
        choices[j] = temp;
        }
    return choices
}



function populatePossibleChoices(choice) {
    let name = choice.name
    //need to add a click event listener as well as drag/drop feature!
    let possible_breweries = document.querySelector('#possible_breweries')
    let p = document.createElement('p')
    p.className = 'choice'
    p.innerText = name
    p.addEventListener('click', () => {
        if (name === correctChoices[correctChoices.length - 2].name) {
            alert('YOU ARE A BEER SNOB!')
        } else {
            alert('try again :(')
        }
    })
    possible_breweries.appendChild(p)


}


/////////////////////
function checkForDuplicates(choice) {
    if((city !== choice[0].city) && (state !== choice[0].state)) {
        console.log('hi')
    }
}