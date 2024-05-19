export class Caret {
    constructor() {
        let term = document.createElement('div')
        term.style = "width: 100%;display:flex;height:24px;"

        this.preCar = document.createElement('pre')
        this.postCar = document.createElement('pre')
        this.caret = document.createElement('pre')
        this.termDiv = term
        this.termValue = this.preCar.innerHTML + this.caret.innerHTML + this.postCar.innerHTML

        this.caret.className = "caret"
        this.preCar.className = "termText"
        this.postCar.className = "termText"

        this.caret.style = ""

        term.append(this.preCar)
        term.append(this.caret)
        term.append(this.postCar)

        this.listener = window.addEventListener('keydown', (key) => {
            if ((key.keyCode > 64 && key.keyCode < 91)) {
                if (this.caret.innerHTML === "") {
                    this.preCar.innerHTML += key.key.toUpperCase()
                    this.termValue = this.preCar.innerHTML + this.caret.innerHTML + this.postCar.innerHTML
                }
            }
            else if (key.key === " ") {
                this.preCar.innerHTML += ' '
                this.termValue = this.preCar.innerHTML + this.caret.innerHTML + this.postCar.innerHTML
            }
            else if (key.key == "Backspace") {
                if (this.caret.innerHTML === "") {
                    this.preCar.innerHTML = this.preCar.innerHTML.substring(0, this.preCar.innerHTML.length - 1)
                    this.termValue = this.preCar.innerHTML + this.caret.innerHTML + this.postCar.innerHTML
                } else {
                    this.caret.innerHTML = this.preCar.innerHTML.substring(this.preCar.innerHTML.length - 1, this.preCar.innerHTML.length)
                    this.preCar.innerHTML = this.preCar.innerHTML.substring(0, this.preCar.innerHTML.length - 1)
                    this.termValue = this.preCar.innerHTML + this.caret.innerHTML + this.postCar.innerHTML
                }
            } else if (key.key == "ArrowLeft") {
                this.postCar.innerHTML = this.caret.innerHTML + this.postCar.innerHTML
                this.caret.innerHTML = this.preCar.innerHTML.substring(this.preCar.innerHTML.length - 1, this.preCar.innerHTML.length)
                this.preCar.innerHTML = this.preCar.innerHTML.substring(0, this.preCar.innerHTML.length - 1)
            } else if (key.key == "ArrowRight") {
                this.preCar.innerHTML += this.caret.innerHTML
                this.caret.innerHTML = this.postCar.innerHTML.substring(0, 1)
                this.postCar.innerHTML = this.postCar.innerHTML.substring(1, this.postCar.innerHTML.length)
            }
        })
    }
}