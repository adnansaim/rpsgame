//global
let score = 0;
window.onload = function () {
    showrule()
    dynamicAdd2()
}
const rpsContainer = document.querySelector('.rps-container')
//dynamic property adding
// const elements = {
//     rock:{
//         names:'rock',
//         src:'/images/icon-rock.svg'
//     },
//     paper:{
//         names:'paper',
//         src:'/images/icon-paper.svg'
//     },
//     scissors:{
//         names:'scissors',
//         src:'/images/icon-scissors.svg'
//     }
// }
const els = ['rock', 'paper', 'scissors']

function dynamicAdd(inp) {
    //     return `<div class="rps ${inp}">
    //     <img src="/images/icon-${inp}.svg" alt=${inp}>
    //   </div>`
    const div = document.createElement('div')
    div.classList.add('rps', inp)
    div.innerHTML = `<img src="/images/icon-${inp}.svg" alt=${inp}>`
    return div
}
let appendingEl;
function dynamicAdd2() {
    for (let i = 0; i < 3; i++) {
        // appendingEl = dynamicAdd(els[i])
        // rpsContainer.innerHTML += appendingEl
        rpsContainer.appendChild(dynamicAdd(els[i]))
    }
}



//show rules
const ruleImgSec = document.querySelector('.rulesimgsec')
curton = document.querySelector('.fularea')
closeBtn = document.querySelector('.close')
rulesBtn = document.querySelector('.rules')




let stoptime;
function showrule() {
    curton.classList.remove('hide')
    ruleImgSec.classList.remove('hide')
    stoptime = setTimeout(() => {
        curton.classList.add('hide')
        ruleImgSec.classList.add('hide')
    }, 6000);
}
closeBtn.addEventListener('click', function () {
    this.parentElement.classList.add('hide')
    curton.classList.add('hide')
})
rulesBtn.addEventListener('click', function () {
    if (stoptime) {
        clearTimeout(stoptime)
    }
    showrule()
})

//picking rps

const pickedIcon = document.querySelector('.yours')
pick = document.querySelector('.pick')
trioImg = document.getElementById('trio')
rpsIcons = document.querySelector('.rps-icons')
houseIconSelect = document.querySelector('.the-house')
blackDiv = document.querySelector('.black')

function appending(value) {
    pickedIcon.appendChild(value)
    pick.classList.remove('hide')
    rpsContainer.classList.add('hide')
    trioImg.classList.add('hide')
}

function picking() {
    rpsIcons.classList.add('hide');
    pick.classList.remove('hide')
}

function afterPick() {
    picking();

    setTimeout(() => {
        houseSelect();
        winloseValid()
    }, 1000);
    setTimeout(() => {

        winloseAnimate()
    }, 2000);
}

rpsContainer.addEventListener('click', function (e) {
    let el = e.target
    // const res = el.parentElement.classList

    if (el.alt == 'rock' || el.classList[1] == 'rock') {
        pickedIcon.appendChild(dynamicAdd('rock'));
        afterPick()
    }
    else if (el.alt == 'paper' || el.classList[1] == 'paper') {
        pickedIcon.appendChild(dynamicAdd('paper'))
        afterPick()
    }
    else if (el.alt == 'scissors' || el.classList[1] == 'scissors') {
        pickedIcon.appendChild(dynamicAdd('scissors'))
        afterPick()
        tprobsolve(pickedIcon)
    }

})
function houseSelect() {
    const tim = Math.floor(Math.random() * 3)
    houseIconSelect.lastElementChild.classList.add('hide')

    houseIconSelect.appendChild(dynamicAdd(els[tim]))
    if (houseIconSelect.lastChild.classList[1] == 'scissors') {
        tprobsolve(houseIconSelect)
    }
}
function tprobsolve(parentDiv) {
    const div = parentDiv.querySelector('.scissors')
    div.style.transform = 'translate(0)'
}

//win or loose define
const winlose = document.querySelector('.winlose')
winloseText = document.querySelector('.winlosetext')
againplayBtn = document.querySelector('.againplayBtn')
scoreDisplay = document.querySelector('.scoreNum')

function winloseAnimate() {
    winlose.style.opacity = '1'
    winlose.style.bottom = '10%'
}

function winloseValid() {
    const yourPick = pickedIcon.children[1].classList[1];
    const computerPick = houseIconSelect.children[2].classList[1]

    if (yourPick == computerPick) {
        winloseText.textContent = 'Draw!'
    }
    else if (yourPick == 'rock') {
        if (computerPick == 'paper') {
            winloseText.textContent = 'you lose'
            score -= 1
        }
        else if (computerPick == 'scissors') {
            winloseText.textContent = 'you win!'
            score += 1
        }
    }
    else if (yourPick == 'paper') {
        if (computerPick == 'scissors') {
            winloseText.textContent = 'you lose!'
            score -= 1
        }
        else if (computerPick == 'rock') {
            winloseText.textContent = 'you win!'
            score += 1
        }
    }
    else if (yourPick == 'scissors') {
        if (computerPick == 'rock') {
            winloseText.textContent = 'you lose!'
            score -= 1
        }
        else if (computerPick == 'paper') {
            winloseText.textContent = 'you win!'
            score += 1
        }
    }
    if (score < 10 && score > -1) {
        scoreDisplay.textContent = '0' + score
    } else {
        scoreDisplay.textContent = score
    }

}

function winloseReverse() {
    winlose.style.opacity = '0'
    winlose.style.bottom = '-10%'
}

againplayBtn.addEventListener('click', function () {
    pick.classList.add('hide')
    rpsIcons.classList.remove('hide')
    houseIconSelect.children[2].remove()
    pickedIcon.children[1].remove()
    blackDiv.classList.remove('hide')
    winloseReverse()

})