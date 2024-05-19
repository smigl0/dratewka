export default class audioHandler {
    constructor() {
        this.intro = new Audio('src/audio/intro.mp3')
        this.introPlaying = false
    }
    audioListen() {
        window.addEventListener('click', () => {
            if (!this.introPlaying) {
                this.introPlaying = true
                let intro = new Audio('src/audio/intro.mp3')
                this.intro.play()
            }
        }, { once: true })
        window.addEventListener('keydown', () => {
            if (!this.introPlaying) {
                this.introPlaying = true
                this.intro.play()
            }
        }, { once: true })
    }

    stopIntro() {
        this.intro.pause()
    }

    playSfx(sfx) {
        switch (sfx) {
            case 'miau':
                let miau = new Audio('src/audio/miau.mp3')
                miau.volume = 0.01
                miau.play()
                break
        }
    }
}
