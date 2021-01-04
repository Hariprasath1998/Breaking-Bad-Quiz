let questionSelector
let optionsSelector = []
let question
let answer
let options = []
let trial


quoteSingle = `https://breaking-bad-quotes.herokuapp.com/v1/quotes`
quoteMultiple = `https://breaking-bad-quotes.herokuapp.com/v1/quotes/15`


onPageLoad()
loadGame()

function onPageLoad() {
    questionSelector = document.getElementById('question')
    var i;
    for (i = 0; i < 4; i++) {
        optionsSelector.push(document.getElementById(`option${i+1}`))
    }
    let submit = document.getElementById('submit');
    submit.addEventListener("click", checkAnswer);
    let change = document.getElementById('change');
    change.addEventListener("click", reset)
}

function clearCheck() {
    for (i = 0; i < 4; i++) {
        optionsSelector[i].childNodes[3].classList.remove('correct')
        optionsSelector[i].childNodes[3].classList.remove('wrong')
        optionsSelector[i].childNodes[1].checked = false
    }
}

function reset(e) {
    e.preventDefault()
    submit.disabled = false;
    clearCheck()
    loadGame()
}

function loadGame() {
    questionFetch()
    optionsFetch()
}

async function questionFetch() {
    options = []
    fetch(quoteSingle).then(response => response.json())
        .then(data => {
            question = data[0].quote;
            options.push(data[0].author);
            answer = data[0].author;
        }).then(applyQuestion)
}

async function optionsFetch() {
    fetch(quoteMultiple).then(response => response.json())
        .then(data => {
            for (let i = 0; i < 10; i++) {
                if (options.length > 3) {
                    break
                } else {
                    if (options.indexOf(data[i].author) == -1) {
                        options.push(data[i].author)
                        shuffle(options)
                    }
                }
            }
        }).then(applyOptions);
}

function applyQuestion() {
    questionSelector.innerText = question
}

function applyOptions() {
    for (i = 0; i < 4; i++) {
        optionsSelector[i].childNodes[3].innerText = options[i];
    }
}



function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

function checkAnswer(e) {
    e.preventDefault()
    for (i = 0; i < 4; i++) {
        if (optionsSelector[i].childNodes[1].checked == true) {
            if (optionsSelector[i].childNodes[3].innerText == answer) {
                optionsSelector[i].childNodes[3].classList += "correct"
                submit.disabled = true;
                change.innerText = 'Give Another'
            } else {
                optionsSelector[i].childNodes[3].classList += "wrong"
            }
        }
    }
}
