const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const admin = require('./routes/admin')
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const path = require('path')
const Postagens = mongoose.model('postagem')

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
    
    app.get('/', (req, res) => {
      Postagens.find().populate('categorias').sort({data: "desc"}).then((postagens) => {
        res.render('index', {postagens: postagens})
      })
      
    })

    app.get('/postagem/:slug', (req, res) => {
      Postagens.findOne({slug: req.params.slug}).then((postagem) => {
        if(postagem){
          res.render('postagem/index', {postagem: postagem})
        } else {
          req.flash('error_msg', 'Erro Interno #23')
          res.redirect('/')
        }
      }).catch((err) => {
        req.flash('error_msg', 'Erro Interno #24')
          res.redirect('/')
      })
    })


      
      

//outros
app.listen(80, () => {
    console.log('servidor rodando')
})