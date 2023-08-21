const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Product = require('./models/product');

// mongoose.connect('mongodb://127.0.0.1:27017/fridgeApp', { 'useNewUrlParser': true, 'useUnifiedTopology': true })
//     .then(() => {
//         console.log("MONGO CONNECTION OPEN!!!")
//     })
//     .catch(err => {
//         console.log("MONGO CONNECTION ERROR!!!")
//     })


mongoose.connect('mongodb+srv://ibeliev:atfLicGREvkJx5qq@fridgeapp1.xlbonny.mongodb.net/?retryWrites=true&w=majority', { 'useNewUrlParser': true, 'useUnifiedTopology': true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR!!!")
    })

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const categories = ['fruit/vegetable','poultry/meat/fish'];

app.get('/', async (req, res) => {
    const products = await Product.find({})

    res.render('index', { products, categories })
});

app.get('/new', (req, res)=>{
    res.render('new')
});

app.post('/new', async (req, res)=>{
    const newProduct = new Product (req.body)
    await newProduct.save()
    console.log(newProduct)
    res.redirect('/')
});

app.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('edit', { product });
});

app.delete('/:id/delete', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/');
});

// ****** sends patch request when click qty button ******

app.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const product1 = await Product.findById(id);

    if (req.body.button == "none") {
        none = 'grey';
        some = 'false';
        enough = 'false';
        formattedToday = product1.date

    } else if (req.body.button == "some") {
        none = 'false';
        some = 'orange';
        enough = 'false';
        formattedToday = product1.date

    } else if (req.body.button == "enough") {
        none = 'false';
        some = 'false';
        enough = 'green';

        //date
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        formattedToday = dd + '.' + mm + '.' + yyyy.toString().slice(2, 4);

    }

    // console.log(none, some, enough)
    const product = await Product.findOneAndUpdate({ _id: id }, { none: none, some: some, enough: enough, date: formattedToday })
    // console.log(product, formattedToday)
    res.redirect('/')

})

// ****** sends patch request from edit form ******
app.patch('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOneAndUpdate({ _id: id }, { name: req.body.name, date: req.body.date, category: req.body.category, img:req.body.img })
    console.log(product)
    res.redirect('/')

})

// const port = process.env.PORT || 3001;
// const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})