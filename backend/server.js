const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors());

app.use(express.static(path.join(__dirname, '/../build')));

app.use('/static', express.static(path.join(__dirname, 'build//static')));

const myConnectioString = 'mongodb+srv://admin:pass@cluster0.a3fkb.mongodb.net/recipes?retryWrites=true&w=majority';
mongoose.connect(myConnectioString, { useNewUrlParser: true });

const Schema = mongoose.Schema;

var recipeSchema = new Schema({
    name: String,
    ingredients: Array,
    complexity: String,
    summary: String,
    time: String,
    instructions: String,
    image: String
});

var RecipeModel = mongoose.model("recipe", recipeSchema);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/recipes', (req, res) => {
    RecipeModel.find((err, data) => {
        res.json(data);
    });
})

app.get('/api/recipes/:id', (req, res) => {
    console.log(req.params.id);

    RecipeModel.findById(req.params.id, (err, data) => {
        res.json(data);
    });
});

app.put('/api/recipes/:id', (req, res) => {
    console.log("Update recipe: " + req.params.id);
    console.log(req.body);

    RecipeModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, data) => {
            res.send(data);
        })
})

app.delete('/api/recipes/:id', (req, res) => {
    console.log("Delete recipe: " + req.params.id);

    RecipeModel.findByIdAndDelete(req.params.id, (err, data) => {
        res.send(data);
    })
})

app.post('/api/recipes', (req, res) => {
    console.log('recipe received');
    console.log('name: ' + req.body.name);
    console.log('list: ' + req.body.list);
    console.log('summary: ' + req.body.summary);
    console.log('time: ' + req.body.time);
    console.log('complexity: ' + req.body.complexity);
    console.log('image: ' + req.body.image);
    console.log('instructions: ' + req.body.instructions);

    RecipeModel.create({
        name: req.body.name,
        ingredients: req.body.list,
        complexity: req.body.complexity,
        summary: req.body.summary,
        time: req.body.time,
        instructions: req.body.instructions,
        image: req.body.image
    });

    res.send('Item Added');
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})