const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const admin = require('./routes/admin')
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const path = require('path')

//Configurações
    //Sessões
        app.use(session({
          secret: "qualquercoisabemsegura",
          resave: true,
          saveUninitialized: true
        }))
        app.use(flash())
    //Midldleware
        app.use((req, res, next) => {
          res.locals.success_msg = req.flash("success_msg") //cria variavel global com flash
          res.locals.error_msg = req.flash("error_msg")
          next()
        });

    //BodyParser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/posts')
          .then(() => {
            console.log('Conexão OK')})
          .catch((err) =>  
            {console.log(err)})
            
    //Arquivos Estaticos
    app.use(express.static(path.join(__dirname, "public")))
    
//Rotas
    app.use('/admin', admin) //cria um prefixo de rotas, nesse caso, /admin chama as rotas do admin

//outros
app.listen(80, () => {
    console.log('servidor rodando')
})