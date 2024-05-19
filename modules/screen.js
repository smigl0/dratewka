
function genScreenVision() {

    let pLine = document.createElement('p')
    let visObj = undefined
    let carObj = undefined
    window.setTimeout(() => {
        genLocation('in the wawel castle')
        window.setTimeout(() => {
            genImg()
            window.setTimeout(() => {
                genCards([0, 1, 2, 3])
                window.setTimeout(() => {
                    genVision(visObj)
                    window.setTimeout(() => {
                        genCarried(carObj)
                        window.setTimeout(() => {
                            genInput()
                        }, 500)
                    }, 500)
                }, 500)
            }, 500)
        }, 500)
    }, 500)

}

function clearSite() {
    body.innerHTML = ''
}

function genCards(paths) {
    let div = document.createElement('p')
    let cards = [
        'NORTH',
        'WEST',
        'EAST',
        'SOUTH'
    ]
    div.innerHTML = `You can go `
    paths.forEach((element, index) => {
        if (paths.includes(element)) {
            if (index != 0) {
                div.innerHTML += ','
            }
            div.innerHTML += cards[element]
        }
    });
    body.append(div)
}

function genVision(visObj) {
    let div = document.createElement('p')
    if (visObj === undefined) {
        visObj = 'NOTHING'
    }
    div.innerHTML = `You see ${visObj}`
    body.append(div)
}

function genCarried(carObj) {
    let div = document.createElement('p')
    if (carObj === undefined) {
        carObj = 'NOTHING'
    }
    div.innerHTML = `You are carrying ${carObj}`
    body.append(div)
}

function genInput() {
    let term = document.createElement('input')
    let pLine = document.createElement('p')
    pLine.innerHTML = 'WYD?:'
    term.type = 'text'
    pLine.append(term)
    term.autofocus = 'true'


    body.append(pLine)



    term.addEventListener('keypress', (event) => {
        if (event.key == "Enter") {
            event.preventDefault()
            clearSite()
            genScreenVision()
        }
    })
}

function genImg() {
    let viewP = document.createElement('img')
    viewP.src = 'static/img/11.gif'
    viewP.className = 'overlay'
    viewP.style.backgroundColor = "red"
    body.append(viewP)
}

function genLocation(location) {
    let div = document.createElement('p')
    div.innerHTML = `You are ${location}`
    body.append(div)
}


export { genScreenVision }