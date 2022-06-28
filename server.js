console.log('helloworld');

const express = require("express");

const app = express();

const path = require("path")

app.set('view engine', 'ejs');


app.get("/", (request,result,next) =>{
    result.render('index');
})
app.get("/views/assets/CUI_Logo.png", (request,result,next)=>{
    result.sendFile(path.join(__dirname+'/views/assets/CUI_Logo.png'));
})
app.get("/views/styles.css", (request,result,next)=>{
    result.sendFile(path.join(__dirname + "/views/styles.css"));
})
app.get("/CUI.js", (request,result,next)=>{
    result.sendFile(path.join(__dirname + "/CUI.js"));
})

app.listen(3000);
