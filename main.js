import dataLoad from './modules/dataLoad.js'
import DratewkaGame from './modules/dratewkaGame.js'

let term = document.querySelector('#terminal')
let bodyDiv = document.querySelector('body')

let allData = await dataLoad()

let game = new DratewkaGame
game.init()