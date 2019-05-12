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

mongoose.model('categoria', Categoria)