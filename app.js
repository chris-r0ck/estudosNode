const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const admin = require('./routes/admin')
const app = express();
const path = require('path'
)
//Configurações
    //BodyParser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //Mongoose

    //Arquivos Estaticos
    app.use(express.static(path.join(__dirname, "public")))
    
//Rotas
    app.use('/admin', admin) //cria um prefixo de rotas, nesse caso, /admin chama as rotas do admin

//outros
app.listen(80, () => {
    console.log('servidor rodando')
})