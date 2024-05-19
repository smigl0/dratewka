import { genCards, genVision, genCarried, genInput } from "./gen.js";

function clearDesc(bodyDiv) {
    [...bodyDiv.children].forEach((data, index) => {
        if (index > 1) {
            bodyDiv.children[2].remove()
        }
    })
}

function genDescDef(stats, allData, bodyDiv) {
    genCards(stats, bodyDiv)
    window.setTimeout(() => {
        genVision(stats, allData, bodyDiv)
        window.setTimeout(() => {
            genCarried(stats, bodyDiv)
            window.setTimeout(() => {
                genInput(stats, allData, bodyDiv)
            }, 5)
        }, 5)
    }, 5)
}

function genDescGossip(stats, allData, bodyDiv) {
    console.log(allData);
    allData.gossips.forEach(element => {
        let div = document.createElement('p')
        div.innerHTML = element
        bodyDiv.append(div)
    });
    document.addEventListener('keydown', (event) => {
        console.log(event.key);
        if (event.key == "Enter") {
            clearDesc(bodyDiv)
            genDescDef(stats, allData, bodyDiv)
        };
    }, { once: true })
}

function genDescTake(stats, allData, bodyDiv) {
    console.log(allData.itemLocations);
    let div = document.createElement('p')
    if (allData.itemLocations[stats.viewportImgId]) {
        allData.itemLocations[stats.viewportImgId]
        div.innerHTML = `You take the ${allData.items[allData.itemLocations[stats.viewportImgId] - 10][3]}`
        stats.carriedId = allData.items[allData.itemLocations[stats.viewportImgId] - 10][0]
        stats.carried = allData.items[allData.itemLocations[stats.viewportImgId] - 10][1]
        allData.itemLocations[stats.viewportImgId] = "0"

    } else {
        div.innerHTML = `You can't take that!`
    }
    let div2 = document.createElement('p')
    div2.innerHTML = "Press ENTER to continue..."
    bodyDiv.append(div)
    bodyDiv.append(div2)
    document.addEventListener('keydown', (event) => {
        // console.log(event.key);
        if (event.key == "Enter") {
            clearDesc(bodyDiv)
            genDescDef(stats, allData, bodyDiv)
        };
    }, { once: true })
    console.log(allData.itemLocations);
}

function genDescDrop(stats, allData, bodyDiv) {
    let div = document.createElement('p')
    if (stats.carried === undefined) {
        div.innerHTML = `You arent carrying anything!`
    }
    else if (!allData.itemLocations[stats.viewportImgId]) {
        // allData.itemLocations[stats.viewportImgId]
        // stats.carried = allData.items[allData.itemLocations[stats.viewportImgId] - 10][1]
        // allData.itemLocations[stats.viewportImgId] = 0
        allData.itemLocations[stats.viewportImgId] = stats.carriedId
        div.innerHTML = `You drop the ${stats.carried}`
        stats.carriedId = undefined
        stats.carried = undefined
    } else {
        div.innerHTML = `You can't drop here!`
    }
    let div2 = document.createElement('p')
    div2.innerHTML = "Press ENTER to continue..."
    bodyDiv.append(div)
    bodyDiv.append(div2)
    console.log(stats);
    document.addEventListener('keydown', (event) => {
        console.log(event.key);
        if (event.key == "Enter") {
            clearDesc(bodyDiv)
            genDescDef(stats, allData, bodyDiv)
        };
    }, { once: true })
}

export { clearDesc, genDescGossip, genDescTake, genDescDrop }