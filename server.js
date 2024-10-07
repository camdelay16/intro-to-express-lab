const express = require('express')
const PORT = process.env.PORT || 3001

const app = express()

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
})


// Question 1

app.get('/greetings/:username', (req, res) =>{
    res.send(`Welcome ${req.params.username}! It is great to see you.`)
})


/// Question 2

app.get('/roll/:number', (req, res) => {

    const numberRoll = Number(req.params.number)

    if (isNaN(numberRoll)) {return res.send(`You must specify a number`)}

    const generatedNum = Math.floor(Math.random() * (numberRoll + 1))

    return res.send(`You rolled a ${generatedNum}`)
})

/// Question 3

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:index', (req, res) => {
    const index = Number(req.params.index)

    if (isNaN(index) || index < 0 || index >= collectibles.length) {res.send(`This item is not yet in stock. Check back soon!`)}

    const item = collectibles[index]
    res.send(`So you want the ${item.name}? For $${item.price}, it can be yours!`)
})

// Question 4

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let allShoes = shoes
    let minPrice = Number(req.query['min-price'])
    let maxPrice = Number(req.query['max-price'])
    let type = req.query.type

    if (!isNaN(minPrice)) {allShoes = allShoes.filter(shoe => shoe.price >= minPrice)}
    if (!isNaN(maxPrice)) {allShoes = allShoes.filter(shoe => shoe.price <= maxPrice)}
    if (type) {allShoes = allShoes.filter(shoe => shoe.type === type)}

    res.send(allShoes)

})