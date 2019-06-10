const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const Usuarios = new Schema({
    nome: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('usuarios', Usuarios)