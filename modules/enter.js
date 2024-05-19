export default function genEnter() {
    let div2 = document.createElement('p')
    div2.innerHTML = "Press ENTER to continue..."
    this.bodyDiv.append(div2)
    document.addEventListener('keydown', (event) => {
        clearDesc(this.bodyDiv)
        this.genDescDef()
    }, { once: true })
}