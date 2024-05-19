import dataLoad from './dataLoad.js'
import clearDesc from './clearDesc.js'
import audioHandler from './audioPlay.js'
import { Caret } from './caret.js'

export default class DratewkaGame {
    constructor() {
        //gamespeed
        this.ms = 200 //default:200


        this.stats = {
            playerX: 6, //default: 6
            playerY: 3, //default: 3
            viewportImgId: 47, //default: 47
            description: "You are in a frontyard of your house", //default: "You are in a frontyard of your house"
            currColor: 'rgb(255, 190, 99)', //default: 'rgb(255, 190, 99)'
            paths: [0, 1, 2], //default: [0, 1, 2]
            carried: undefined, //default: undefined
            carriedId: 0, //default: undefined // toWin:36
            parts: 0, //default: undefined

            dragonDead: false, //default:false
            dragonLoc: 42, // VIEWPORTIMGID ALIVE:42 DEAD:43
        }

        this.bodyDiv = document.querySelector('#root')

        this.parsingTerm = false
    }

    async init() {
        this.allData = await dataLoad()
        this.gameAudio = new audioHandler
        this.caret = new Caret

        //debug
        // this.genScreenVision()

        this.gameAudio.audioListen()
        this.genTitleScreen()

    }

    genTitleScreen() {
        this.bodyDiv.style.padding = "0px"
        let fillDiv = document.createElement('div')
        fillDiv.style = "height: 100%;width:100%;position:absolute;"
        let textDiv = document.createElement('div')
        textDiv.style = "display:flex;flex-direction:column;justify-content: center;position: relative;top: 50%;transform: translateY(-100%);padding-left:1em;padding-right:1em;"
        let title = document.createElement('p')
        title.style = "font-size: 5em;margin: 0;text-align: center;"
        title.innerHTML = "DRATEWKA"
        let subTitle = document.createElement('p')
        subTitle.style = "text-align: center;"
        subTitle.innerHTML = "the game™ of all time game™"
        let pressAnyDiv = document.createElement('p')
        pressAnyDiv.style = "text-align: center;position: relative;top: calc(50% + 3em);;padding-left:1em;padding-right:1em;color:black;"
        pressAnyDiv.innerHTML = "Press any key to continue"
        textDiv.appendChild(title)
        textDiv.appendChild(subTitle)
        fillDiv.appendChild(pressAnyDiv)

        fillDiv.appendChild(textDiv)

        this.bodyDiv.appendChild(fillDiv)

        let pressKeyTimeout = setTimeout(() => {
            pressAnyDiv.style.color = "white"
        }, 1500)

        window.addEventListener('keydown', () => {
            clearTimeout(pressKeyTimeout)
            fillDiv.innerHTML = ""
            let introTextA = document.createElement('div')
            introTextA.style = "position: relative;top: 50%;transform: translateY(-50%);padding-left:1em;padding-right:1em;"
            introTextA.innerHTML = "<p>This is based on a true story not a legend! ;-) Dratewka the Shoemaker was a boy who lived in a small village close to Cracov in Poland during the Middle ages. One day a terrifying dragon arrived in the town, living in the cave at the foot of the Wawel Castle Mountain. The dragon began terrorizing the people and animals in and around the town. The fearless knights were unable to defeat the beast head on. Dratewka himself had no weapons but he used his skill and cunning to kill the dragon. He proved his feat by making shoes from the dragon's skin!</p>"

            fillDiv.appendChild(introTextA)

            window.addEventListener('keydown', () => {
                fillDiv.innerHTML = ""
                let introTextB = document.createElement('p')
                introTextB.style = "position: relative;top: 50%;transform: translateY(-50%);padding-left:1em;padding-right:1em;"
                introTextB.innerHTML = "<p>Now it is your turn to follow in Dratewka's footsteps... Happy dragon slaying! Later you can visit Cracov city and the famous dragon cave.</p><p> Story by Kaz, design and program by Scalak and Kaz, most pictures stolen from different sources by Kaz. Thanks for support to Tezz, Mono, Larek and Jurgi. Atari rules forever!</p><p>atarionline.pl 2008</p>"
                fillDiv.appendChild(introTextB)
                window.addEventListener('keydown', () => {
                    this.gameAudio.stopIntro()
                    this.bodyDiv.innerHTML = ""
                    this.genScreenVision()
                    this.bodyDiv.style.paddingLeft = "2em"
                    this.bodyDiv.style.paddingRight = "2em"
                }, { once: true })
            }, { once: true })
            // this.clearSite()
            // this.genScreenVision()
        }, { once: true })

    }

    genScreenVision() {
        window.setTimeout(() => {
            this.genLocation()
            window.setTimeout(() => {
                this.genImg()
                window.setTimeout(() => {
                    this.genCards()
                    window.setTimeout(() => {
                        this.genVision()
                        window.setTimeout(() => {
                            this.genCarried()
                            window.setTimeout(() => {
                                this.genInput()
                            }, this.ms)
                        }, this.ms)
                    }, this.ms)
                }, this.ms)
            }, this.ms)
        }, this.ms)

    }

    clearSite() {
        this.bodyDiv.innerHTML = ''
    }

    genCards() {
        let div = document.createElement('p')
        let cards = [
            'NORTH',
            'WEST',
            'SOUTH',
            'EAST'
        ]
        div.innerHTML = `You can go `
        this.stats.paths.forEach((element, index) => {
            if (this.stats.paths.includes(element)) {
                if (index != 0) {
                    div.innerHTML += ','
                }
                div.innerHTML += cards[element]
            }
        });
        this.bodyDiv.append(div)
    }

    genVision() {
        ;
        let div = document.createElement('p')
        if (this.allData.itemLocations[this.stats.viewportImgId] == '0') {
            div.innerHTML = `You see NOTHING`
        }
        else if (this.allData.itemLocations[this.stats.viewportImgId]) {
            //;

            //;
            ;
            // ;
            let visionText = ''

                ;
            ;
            this.allData.itemLocations[this.stats.viewportImgId][0].forEach((seenItemId, index) => {
                if (index) {
                    visionText += ','
                }
                visionText += this.allData.items[Number(seenItemId) - 10][1]
                    ;
            })
            try {
                this.allData.itemLocations[this.stats.viewportImgId][1].forEach((seenItemId, index) => {
                    if (visionText != '') { visionText += ',' }
                    visionText += this.allData.items[Number(seenItemId) - 10][1]
                        ;
                })
            } catch (error) { }
            // for (let seenItemID = 0; seenItemID <=.length; seenItemID++) {
            //     if (seenItemID >= 1) {
            //         visionText += ', '
            //     }
            //     try { visionText += this.allData.items[this.allData.itemLocations[this.stats.viewportImgId][seenItemID] - 10][1] } catch (error) { }
            // }
            div.innerHTML = `You see ${visionText}`
        }
        else {
            div.innerHTML = `You see NOTHING`
        }
        this.bodyDiv.append(div)
    }

    genCarried() {
        let div = document.createElement('p')
        if (this.stats.carried === undefined) {
            div.innerHTML = `You are carrying NOTHING`
        } else {
            div.innerHTML = `You are carrying ${this.stats.carried}`
        }
        this.bodyDiv.append(div)
    }

    checkCommand(termValue) {
        console.log(termValue);
    }

    genInput() {
        this.parsingTerm = false

        this.caret.caret.innerHTML = ""
        this.caret.preCar.innerHTML = "WYD?:"
        this.caret.postCar.innerHTML = ""
        this.caret.termValue = ""

        this.bodyDiv.append(this.caret.termDiv)

        window.addEventListener('keypress', (event) => {
            if (event.key == "Enter" && !this.parsingTerm) {
                this.parsingTerm = true
                event.preventDefault()

                let caretValueArr = Array.from(this.caret.termValue)

                let wydLike = 0
                let wydRemoveFlag = true
                let wydArr = Array.from("WYD?:")
                wydArr.forEach((ele, index) => {
                    console.log(caretValueArr[index], ele);
                    if (wydRemoveFlag) {
                        if (caretValueArr[index] == ele) {
                            wydLike++
                        } else {
                            wydRemoveFlag = !wydRemoveFlag
                        }
                    }
                })

                console.log(this.caret.termValue);

                let command = this.caret.termValue.substring(wydLike, this.caret.termValue.length)

                switch (command.toUpperCase().split(' ')[0]) {
                    case 'N':
                    case 'NORTH':
                        this.setPlayerXY(0, -1, this.stats, this.allData.locData)
                        break
                    case 'S':
                    case 'SOUTH':
                        this.setPlayerXY(0, 1, this.stats, this.allData.locData)
                        break
                    case 'E':
                    case 'EAST':
                        this.setPlayerXY(1, 0, this.stats, this.allData.locData)
                        break
                    case 'W':
                    case 'WEST':
                        this.setPlayerXY(-1, 0, this.stats, this.allData.locData)
                        break
                    case "G":
                    case "GOSSIPS":
                        clearDesc(this.bodyDiv)
                        this.genDescGossip()
                        break
                    case "T":
                    case "TAKE":
                        clearDesc(this.bodyDiv)
                        this.take(this.caret.termValue)
                        break
                    case "D":
                    case "DROP":
                        clearDesc(this.bodyDiv)
                        this.drop()
                        break
                    case "U":
                    case "USE":
                        clearDesc(this.bodyDiv)
                        this.use()
                        break
                    // case "Z":
                    //     clearDesc(this.bodyDiv)
                    //     console.log(this.stats);
                    //     this.genDescDef()
                    // break
                    case "G":
                        clearDesc(this.bodyDiv)
                        this.genDescGossip()
                        break
                    // GOKU TELEPORT
                    case "C":
                        let goX = 0
                        let goY = 0

                        goX = Number(this.caret.termValue.split(' ')[1])
                        goY = Number(this.caret.termValue.split(' ')[2])

                        if (this.caret.termValue.split(' ')[1] === undefined) { goX = 2 }
                        if (this.caret.termValue.split(' ')[2] === undefined) { goY = 3 }

                        this.setPlayerPos(goX, goY)
                        this.clearSite(this.bodyDiv)
                        this.genScreenVision()
                        break
                    // case "F":
                    // case "GIVE":

                    //     try {
                    //         if (this.caret.termValue.toUpperCase().split(' ')[1]) {
                    //             ;
                    //             if (this.allData.items.map(ele => ele[3]).indexOf(this.caret.termValue.toUpperCase().split(' ')[1]) != -1) {
                    //                 this.stats.carried = this.allData.items[this.allData.items.map(ele => ele[3]).indexOf(this.caret.termValue.split(' ')[1].toUpperCase())][1]
                    //                 this.stats.carriedId = this.allData.items.map(ele => ele[3]).indexOf(this.caret.termValue.split(' ')[1].toUpperCase()) + 10
                    //             }
                    //         }
                    //     } catch (error) { }
                    //     this.clearSite(this.bodyDiv)
                    //     this.genScreenVision()
                    //     break
                    case "V":
                    case "VOCABULARY":
                        clearDesc(this.bodyDiv)
                        this.genDescVocab()
                        break
                    default:
                        clearDesc(this.bodyDiv)
                        this.genDescUnknownComm()
                        break
                }
            }
        })
    }

    genImg() {
        let dispDivs = document.createElement('div')
        dispDivs.style = "display:flex;flex-direction:row;width:100%;align-items: flex-start;align-items:center;justify-content:center;flex-wrap:wrap;gap:2em;"
        let viewP = document.createElement('img')
        if (this.stats.viewportImgId == 43 && this.stats.dragonDead == true) {
            viewP.src = `src/img/${this.stats.viewportImgId}d.gif`
        } else {
            viewP.src = `src/img/${this.stats.viewportImgId}.gif`
        }
        viewP.className = 'overlay'
        viewP.style.backgroundColor = this.stats.currColor
        dispDivs.append(viewP)
        let compassDiv = document.createElement('div')
        let compass = document.createElement('img')
        compass.src = "src/img/kompas.gif"
        compass.className = "kompas"
        compassDiv.style.position = "relative"
        compassDiv.append(compass)
            ;
        let cardsToCover = [0, 1, 2, 3].filter(n => !this.stats.paths.includes(n))
            ;
        cardsToCover.forEach(cards => {
            let card = document.createElement('div')
            switch (cards) {
                case 0:
                    card.className = "cov-N"
                    break
                case 2:
                    card.className = "cov-S"
                    break
                case 1:
                    card.className = "cov-W"
                    break
                case 3:
                    card.className = "cov-E"
                    break
            }
            compassDiv.append(card)
        })
        // this.stats.paths.forEach((path, index) => {

        // })
        dispDivs.append(compassDiv)
        this.bodyDiv.append(dispDivs)
    }


    genLocation() {
        let div = document.createElement('p')
        let parts = document.createElement('p')
        let fBox = document.createElement('div')

        parts.id = "partsDiv"
        parts.style = "display:flex;align-items:center;"
        parts.innerHTML = `${this.stats.parts}/6`
        parts.backgroundColor = this.stats.currColor

        div.innerHTML = this.stats.description

        fBox.style.width = "100%"
        fBox.style = "width:100%;display:flex;flex-direction:row;gap:1em;justify-content: space-between;"

            ;
        fBox.append(div)
        fBox.append(parts)
        this.bodyDiv.append(fBox)
    }

    // MOVE POSITION
    setPlayerXY(x, y) {
        let dir = Math.abs(x) * (x + 2) + Math.abs(y) * (y + 1)
        let newX = this.stats.playerX + x
        let newY = this.stats.playerY + y
        if (!this.allData.locData[this.stats.playerY][this.stats.playerX][3].includes(dir)) {
        } else {
            this.stats.playerX = newX
            this.stats.playerY = newY
            this.stats.viewportImgId = newY * 10 + newX + 11
            this.stats.description = this.allData.locData[newY][newX][0]
            this.stats.currColor = this.allData.locData[newY][newX][2]
            this.stats.paths = this.allData.locData[newY][newX][3]
        }
        if (!this.stats.dragonDead && this.stats.viewportImgId == 42) {
            this.clearSite(this.bodyDiv)
            window.setTimeout(() => {
                this.genLocation()
                window.setTimeout(() => {
                    this.genImg()
                    window.setTimeout(() => {
                        let p1 = document.createElement('p')
                        p1.innerHTML = "You hear the beast approaching..."
                        this.bodyDiv.append(p1)
                        window.setTimeout(() => {
                            let p2 = document.createElement('p')
                            document.querySelector('.overlay').src = 'src/img/theBeast.gif'
                            p2.innerHTML = "AAAAH! The beast is hideous! RUN!!!"
                            this.bodyDiv.append(p2)
                            window.setTimeout(() => {
                                let p3 = document.createElement('p')
                                p3.innerHTML = "Press ENTER to continue..."
                                this.bodyDiv.append(p3)
                                document.addEventListener('keydown', (event) => {
                                    console.log('RUN');
                                    this.setPlayerPos(2, 3)
                                    this.clearSite()
                                    this.genScreenVision()
                                }, { once: true })
                            }, 1000)
                        }, 1000)
                    }, this.ms)
                }, this.ms)
            })
        } else {
            this.clearSite(this.bodyDiv)
            this.genScreenVision()
        }
    }

    // ABSOLUTE POSITION
    setPlayerPos(x, y) {
        this.stats.playerX = x
        this.stats.playerY = y
        this.stats.viewportImgId = y * 10 + x + 11
        this.stats.description = this.allData.locData[y][x][0]
        this.stats.currColor = this.allData.locData[y][x][2]
        this.stats.paths = this.allData.locData[y][x][3]
    }

    // DESCRIPTION GENERATOR FUNCTIONS BELOW
    // DESCRIPTION CLEARER FUNCTION IS IMPORTED SO DON'T ADD THIS
    //
    // CTRL + F KEYWORDS: genDescKi,genDesc, 

    genDescDef() {
        this.genCards()
        window.setTimeout(() => {
            this.genVision()
            window.setTimeout(() => {
                this.genCarried()
                window.setTimeout(() => {
                    this.genInput()
                }, this.ms)
            }, this.ms)
        }, this.ms)
    }

    genDescGossip() {
        this.allData.gossips.forEach(element => {
            let div = document.createElement('p')
            div.innerHTML = element
            this.bodyDiv.append(div)
        });
        document.addEventListener('keydown', (event) => {
            ;
            if (event.key == "Enter") {
                clearDesc(this.bodyDiv)
                this.genDescDef()
            };
        }, { once: true })
    }

    genDescVocab() {
        this.allData.vocabulary.forEach(element => {
            let div = document.createElement('p')
            div.innerHTML = element
            this.bodyDiv.append(div)
        });
        document.addEventListener('keydown', (event) => {
            ;
            if (event.key == "Enter") {
                clearDesc(this.bodyDiv)
                this.genDescDef()
            };
        }, { once: true })
    }

    genDescUnknownComm() {
        let div = document.createElement('p')
        div.innerHTML = "Try another word or V for vocabulary"
        this.bodyDiv.append(div)
        setTimeout(() => {
            let div2 = document.createElement('p')
            div2.innerHTML = "Press ENTER to continue..."
            this.bodyDiv.append(div2)
            document.addEventListener('keydown', (event) => {
                ;
                if (event.key == "Enter") {
                    clearDesc(this.bodyDiv)
                    this.genDescDef()
                };
            }, { once: true })
        }, 1000)
    }

    genDescSheep() {
        let div = document.createElement('p')
        this.bodyDiv.append(div)
        div.innerHTML = "Your fake sheep is full of poison and ready to be eaten by the dragon"

        setTimeout(() => {
            let div2 = document.createElement('p')
            div2.innerHTML = "Press ENTER to continue..."
            this.bodyDiv.append(div2)
            document.addEventListener('keydown', (event) => {
                ;
                if (event.key == "Enter") {
                    clearDesc(this.bodyDiv)
                    this.genDescDef()
                };
            }, { once: true })
        }, 1000)
    }

    // ITEM MANIPULATION FUNCTIONS BELOW
    //
    // CTRL + F KEYWORDS: itemKi, take, drop

    take(req) {
        let div = document.createElement('p')
        if (this.stats.carried == undefined) {
            try {
                this.allData.itemLocations[this.stats.viewportImgId][0]
                // singular item
                if (this.allData.itemLocations[this.stats.viewportImgId][0].length == 1) {
                    let indexOfChosenItem = Number(this.allData.itemLocations[this.stats.viewportImgId][0][0]) - 10
                    let pickedItem = this.allData.items[indexOfChosenItem]

                    div.innerHTML = `You take the ${pickedItem[3]}`
                    console.log(this.allData.itemLocations[this.stats.viewportImgId][0]);

                    this.stats.carried = pickedItem[1]
                    this.stats.carriedId = pickedItem[0]
                    delete this.allData.itemLocations[this.stats.viewportImgId]
                } else {
                    //multiple items
                    let reqArr = req.toUpperCase().split(' ')
                    if (reqArr.length > 1) {
                        let itemArr = this.allData.items.map(item => item[3])
                        let pickedItemArrId = itemArr.indexOf(reqArr[1])

                        let pickedItem = this.allData.items[pickedItemArrId]

                        div.innerHTML = `You take the ${pickedItem[3]}`

                        this.stats.carried = pickedItem[1]
                        this.stats.carriedId = pickedItem[0]

                        let selectedItemId = String(Number(pickedItemArrId) + 10)

                        // .___. <(too long and nonsensical to explain)
                        this.allData.itemLocations[this.stats.viewportImgId][0].splice(this.allData.itemLocations[this.stats.viewportImgId][0].indexOf(selectedItemId), 1)

                    } else {
                        div.innerHTML = `Please specify what!`
                    }
                }
            } catch {
                div.innerHTML = `You there's nothing there!`
            }
        } else {
            div.innerHTML = `Your hands are full!`
        }

        let div2 = document.createElement('p')
        div2.innerHTML = "Press ENTER to continue..."
        this.bodyDiv.append(div)
        this.bodyDiv.append(div2)
        document.addEventListener('keydown', (event) => {
            clearDesc(this.bodyDiv)
            this.genDescDef()
        }, { once: true })
    }

    drop() {
        // ;
        let div = document.createElement('p')
        if (this.stats.carried != undefined) {

            // create array at place with no array
            if (this.allData.itemLocations[this.stats.viewportImgId] === undefined) {
                this.allData.itemLocations[this.stats.viewportImgId] = []
                this.allData.itemLocations[this.stats.viewportImgId][0] = []
            }

            if (this.allData.itemLocations[this.stats.viewportImgId][0].length < 3) {
                div.innerHTML = `You drop the ${this.allData.items[Number(this.stats.carriedId) - 10][3]}`
                this.allData.itemLocations[this.stats.viewportImgId][0].push(this.allData.items[Number(this.stats.carriedId) - 10][0])
                this.stats.carriedId = undefined
                this.stats.carried = undefined
            } else {
                div.innerHTML = `There's too much laying here!`
            }
        } else {
            div.innerHTML = `You're not carrying anything!`
        }

        let div2 = document.createElement('p')
        div2.innerHTML = "Press ENTER to continue..."
        this.bodyDiv.append(div)
        this.bodyDiv.append(div2)
        document.addEventListener('keydown', (event) => {
            clearDesc(this.bodyDiv)
            this.genDescDef()
        }, { once: true })
    }

    async use() {
        // FIND ITEM EVENT ASSOCIATED WITH ITEM
        // ;
        let currEvent = this.allData.events[this.allData.events.map(vent => vent[0]).indexOf(this.stats.carriedId)]

        console.log("CURRENT EVENT", currEvent);

        // ASYNC ANIMATION FLAG
        let animated = false
        // SHEEP FLAG
        let sheep = false
        // KILL DRAGON FLAG ::::: if set to true, change dragon state to dead and change current sprite
        let killDragon = false
        // WIN FLAG
        let win = false

        try {
            if (currEvent[0] == 37) {
                killDragon = true
            }
        } catch (error) { }

        //HARDCODED WIN EVENT \('u')/
        if (this.stats.carriedId == 36) {
            this.win()
            win = true
        }
        //HARDCODED CONDITIONAL SKINNING EVENT
        else if (this.stats.carriedId == 33) {
            if (this.stats.dragonDead == true) {
                if (this.stats.viewportImgId == 43) {
                    let pline = document.createElement('p')
                    pline.innerHTML = `You skin the dragon`

                    this.stats.carried = "a DRAGONSKIN"
                    this.statse.carriedId = 34
                    delete this.allData.itemLocations['43']

                    this.bodyDiv.append(pline)
                } else {
                    let pline = document.createElement('p')
                    pline.innerHTML = `Can't use this here!`
                    this.bodyDiv.append(pline)
                }
            } else {
                let pline = document.createElement('p')
                pline.innerHTML = `Can't use this here!`
                this.bodyDiv.append(pline)
            }
        }
        else
            try {
                this.stats.carriedId != undefined
                if (currEvent[1] == this.stats.viewportImgId) {
                    let splitEventText = currEvent[3].split(';')
                    if (splitEventText.length == 1) {

                        if (!this.allData.items[currEvent[2] - 10][2]) {
                            //KEY ITEM CRAFTED
                            if (this.allData.itemLocations[this.stats.viewportImgId] === undefined) {
                                this.allData.itemLocations[this.stats.viewportImgId] = []
                                this.allData.itemLocations[this.stats.viewportImgId].push([])
                                this.allData.itemLocations[this.stats.viewportImgId].push([])
                            } else if (this.allData.itemLocations[this.stats.viewportImgId][1] === undefined) {
                                this.allData.itemLocations[this.stats.viewportImgId].push([])
                            }

                            let pline = document.createElement('p')
                            pline.innerHTML = currEvent[3]
                            this.bodyDiv.append(pline)

                            console.log(pline.innerHTML);

                            this.allData.itemLocations[this.stats.viewportImgId][1].push(this.allData.items[currEvent[2] - 10][0])
                            this.stats.parts++

                            this.stats.carried = undefined
                            this.stats.carriedId = undefined

                            if (this.stats.parts < 6) {
                                document.querySelector('#partsDiv').innerHTML = `${this.stats.parts}/6`
                            } else {
                                document.querySelector('#partsDiv').innerHTML = `!SHEEP TIME!`
                                // GIVE ME THE SHEEP
                                this.stats.carried = this.allData.items[27][1]
                                this.stats.carriedId = this.allData.items[27][0]
                                // REMOVE SHEEP PARTS
                                delete this.allData.itemLocations["43"]
                                // SHEEP FLAG
                                sheep = true
                            }
                        } else {
                            let pline = document.createElement('p')
                            pline.innerHTML = currEvent[3]
                            this.bodyDiv.append(pline)

                            this.stats.carried = this.allData.items[currEvent[2] - 10][1]
                            this.stats.carriedId = currEvent[2]
                        }
                    } else {
                        // ANIMATED TEXT
                        animated = true

                        splitEventText.push("Press ENTER to continue...")

                        splitEventText.forEach(async (splitText, index) => {
                            console.log(await new Promise(async (res) => {
                                if (index == splitEventText.length - 1) {
                                    setTimeout(() => {
                                        let pline = document.createElement('p')
                                        pline.innerHTML = splitText
                                        this.bodyDiv.append(pline)
                                        document.addEventListener('keydown', (event) => {
                                            clearDesc(this.bodyDiv)
                                            this.genDescDef()
                                        }, { once: true })
                                        res(splitText)
                                    }, index * 1000)
                                } else {
                                    setTimeout(() => {
                                        // SPECIAL ANIMATOION ON DRAGON KILL
                                        if (killDragon == true && index == 1) {
                                            document.querySelector('.overlay').src = 'src/img/43d.gif'
                                            this.stats.dragonDead = true
                                        }
                                        let pline = document.createElement('p')
                                        pline.innerHTML = splitText
                                        this.bodyDiv.append(pline)
                                        res(splitText)
                                    }, index * 1000)
                                }
                            }))
                        })

                        if (this.allData.items[currEvent[2] - 10][2] == 0) {
                            this.stats.carried = undefined
                            this.stats.carriedId = undefined

                            //KEY ITEM CRAFTED
                            if (this.allData.itemLocations[this.stats.viewportImgId] === undefined) {
                                this.allData.itemLocations[this.stats.viewportImgId] = []
                                this.allData.itemLocations[this.stats.viewportImgId].push([])
                                this.allData.itemLocations[this.stats.viewportImgId].push([])
                            } else if (this.allData.itemLocations[this.stats.viewportImgId][1] === undefined) {
                                this.allData.itemLocations[this.stats.viewportImgId].push([])
                            }

                            this.allData.itemLocations[String(this.stats.viewportImgId)][1].push(currEvent[2])
                            console.log(this.allData.itemLocations);
                            console.log(this.stats);
                        } else {
                            this.stats.carried = this.allData.items[currEvent[2] - 10][1]
                            this.stats.carriedId = currEvent[2]

                        }
                    }
                } else {
                    let pline = document.createElement('p')
                    pline.innerHTML = `Can't use this here!`
                    this.bodyDiv.append(pline)
                }
            } catch {
                let pline = document.createElement('p')
                pline.innerHTML = `You're hands are empty!`
                this.bodyDiv.append(pline)
            }

        if (sheep) {
            setTimeout(() => {
                let div2 = document.createElement('p')
                div2.innerHTML = "Press ENTER to continue..."
                this.bodyDiv.append(div2)
                document.addEventListener('keydown', (event) => {
                    clearDesc(this.bodyDiv)
                    this.genDescSheep()
                }, { once: true })
            }, 1000)
        }
        else if (win) {

        }
        else
            if (!animated) {
                setTimeout(() => {
                    let div2 = document.createElement('p')
                    div2.innerHTML = "Press ENTER to continue..."
                    this.bodyDiv.append(div2)
                    document.addEventListener('keydown', (event) => {
                        clearDesc(this.bodyDiv)
                        this.genDescDef()
                    }, { once: true })
                }, 1000)
            }
    }

    win() {
        this.clearSite()
        let winText = document.createElement('p')
        winText.innerHTML = "!!!YOU WON!!!"
        this.bodyDiv.append(winText)

        let winImg = document.createElement('img')
        winImg.className = "miau"
        winImg.src = 'src/img/win.jpg'
        this.bodyDiv.append(winImg)

        let thanks = document.createElement('p')
        thanks.innerHTML = "Thank you so much for playing my game"
        this.bodyDiv.append(thanks)

        setTimeout(() => {
            this.gameAudio.playSfx('miau')
        }, 300)
    }
}