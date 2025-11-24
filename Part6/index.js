const express = require('express')
const app = express();
const Path = require('path');
const fs = require('fs')

app.use(express.json()); //Form handling
app.use(express.urlencoded({extended : true})); //Form handling
app.use(express.static(Path.join(__dirname, 'public'))); //access data from public folder
app.set('view engine', 'ejs'); //Helps us render forms

app.get("/", function(req,res){
    fs.readdir('./files', function(err, files){
        res.render('index',{files : files})
    })
});

app.get("/files/:filename", function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,file){
        res.render('show', {filename : req.params.filename, filedata : file});
    })
});

app.get('/edit/:filename', function(req, res) {
    res.render('edit', { filename: req.params.filename });
});

app.post('/edit', function(req, res) {
    fs.rename(`./files/${req.body.prev}`,  `./files/${req.body.new}`, function(err){
        res.redirect("/");
    })
});


app.post("/create", function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.content, function(err){
        res.redirect("/");
    })
});



app.listen(3000, function(){
    console.log("Running");
});