const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Model de Usuario
require('../models/Usuarios')
const Usuarios = mongoose.model('usuarios')

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'login'}, (login, pass, done) => {
        
        Usuarios.findOne({login: login}).then((usuario) => {
            
            if(!usuario){
                return done(null, false, {message: 'Login Inexistente'})
            }
            
            bcrypt.compare(pass, usuario.pass, (err, ok) => {
                if(ok){
                    return done(null, login)
                }else{
                    return done(null, false, {message: 'usuario ou senha invalidos'})
                }
            })
        })
    }))



}