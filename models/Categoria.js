//CRIAR ARQUIVO DE MODEL INICIANDO COM LETRA MAIUSCULA

const mongoose = require('mongoose');
const Schema = mongoose.Schema

Categoria = new Schema({
    nome: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

//cria o model, pega uma middleware function mongoose.model(), o primeiro
//parametro é o nome do model, e o segundo é o objeto Categoria da classe Schema
mongoose.model('categoria', Categoria)