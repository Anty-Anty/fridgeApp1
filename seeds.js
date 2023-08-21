const mongoose = require('mongoose');
const Product = require('./models/product');

// mongoose.connect('mongodb://127.0.0.1:27017/fridgeApp', { 'useNewUrlParser': true, 'useUnifiedTopology': true })
//     .then(() => {
//         console.log("MONGO CONNECTION OPEN!!!")
//     })
//     .catch(err => {
//         console.log("MONGO CONNECTION ERROR!!!")
//     })

mongoose.connect('mongodb+srv://ibeliev:atfLicGREvkJx5qq@fridgeapp1.xlbonny.mongodb.net/?retryWrites=true&w=majority/fridgeApp', { 'useNewUrlParser': true, 'useUnifiedTopology': true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR!!!")
    })

const seedProducts = [
    {
        name: 'Apples',
        none: 'true',
        some: 'false',
        enough: 'false',
        date: '230809',
        category: 'vegetable/fruit',
        img: 'apple-whole-solid.svg'
    },
    {
        name: 'Watermelon',
        none: 'true',
        some: 'false',
        enough: 'false',
        date: '230809',
        category: 'vegetable/fruit',
        img: 'circle-half-stroke-solid.svg'
    },
    {
        name: 'Chicken',
        none: 'true',
        some: 'false',
        enough: 'false',
        date: '230809',
        category: 'poultry/meat/fish',
        img: ''
    }]

Product.insertMany(seedProducts)
    .then(p => {
        console.log(p)
    })
    .catch(e => {
        console.log(e)
    })