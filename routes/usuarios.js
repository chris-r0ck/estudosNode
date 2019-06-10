const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuarios')
const Usuarios = mongoose.model('usuarios')
const bcrypt = require('bcryptjs')


//Adiciona Usuario
router.post('/useradd', (req, res) => {
    erros = []
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Erro: Campo nome Vazio"})
    }

    if(!req.body.login || typeof req.body.login == undefined || req.body.login == null){
        erros.push({texto: 'Erro: Campo Login Vazio'})
    }

    if(!req.body.pass || typeof req.body.pass == undefined || req.body.pass == null){
        erros.push({texto: 'Erro: Campo Senha Vazio'})
    }
    
    if(req.body.pass != req.body.pass2){
        erros.push({texto: "Erro: As senhas não são iguais"})
    }
   
    
    Usuarios.findOne({login: req.body.login}).then((query) => {
    console.log(erros)
    
    }).catch((err) => {})


   if(erros.length > 0){
        res.render('usuarios/add', {erros: erros})
    } else {
        
        var hash = bcrypt.hashSync(req.body.pass, bcrypt.genSaltSync(10))
        var formLogin = {
            nome: req.body.nome,
            login: req.body.login,
            pass: hash
        }
        new Usuarios(formLogin).save().then(() => {
            req.flash('success_msg', "Usuario Cadastrado com sucesso")
            res.redirect('/usuarios')    
        }).catch((err) => {
            req.flash('error_msg', 'Erro interno ao criar usuario')
        })
        
    }
    
})



router.get('/', (req, res) => {
    res.render('usuarios/add')
})

router.get('/login', (req, res) => {
    res.render('usuarios/login')
})



module.exports = router