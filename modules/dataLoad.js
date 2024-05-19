export default async function dataLoad() {
    let allData = {}
    allData.locData = await fetch('src/data/locData.json').then(response => response.json()).then(data => {
        return data
    })
    allData.gossips = await fetch('src/data/gossips.json').then(response => response.json()).then(data => {
        return data
    })
    allData.vocabulary = await fetch('src/data/vocabulary.json').then(response => response.json()).then(data => {
        return data
    })
    allData.itemLocations = await fetch('src/data/itemLocations.json').then(response => response.json()).then(data => {
        return data
    })
    allData.items = await fetch('src/data/items.json').then(response => response.json()).then(data => {
        return data
    })
    // ItemReq, Location(Y,X), ItemGot, Description,
    allData.events = await fetch('src/data/events.json').then(response => response.json()).then(data => {
        return data
    })
    return allData;
}