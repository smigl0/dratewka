export default function clearDesc(bodyDiv) {
    [...bodyDiv.children].forEach((data, index) => {
        if (index > 1) {
            bodyDiv.children[2].remove()
        }
    })
}