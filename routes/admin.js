const express = require('express');
const router = express.Router();
const mongoose = require('mongoose') //importa o mongoose

require("../models/Postagem") //Chama o Model
const Postagem = mongoose.model('postagem') 

require("../models/Categoria") // chama o arquivo do model
const Categoria = mongoose.model('categoria') //chama o metodo que está no arquivo de model



router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/categorias', (req, res) => {
    Categoria.find().then((cats) => {
        res.render('admin/categorias', {cats: cats})
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao listar as categorias')
        res.redirect('/admin')
    })
})

router.get('/editCategoria/:id', (req, res) => {
    Categoria.findOne({_id:req.params.id})
    .then((categoria) => {
        res.render('admin/editCategoria', {categoria: categoria})
    })
    .catch((err) => {
        req.flash('error_msg', 'Houve um erro ao atualizar a Categoria')
        res.render('/admin')
    })
})

//EU QUE FIZ SOZINHO
//Deleta a categoria pegando o id passado por parametro na url
router.get('/categoria/del/:id', (req,res) => {
    Categoria.deleteOne({_id: req.params.id}).then(() => {
        req.flash('success_msg',"Categoria excluida com sucesso")
        res.redirect('/admin/categorias')
    }).catch((err) => {
        req.flash('error_msg', "Houve um erro ao excluir a Categoria")
        res.redirect('/admin')
    })
})



router.post('/categoria/edit', (req, res) => {
    Categoria.findOne({_id: req.body.id}).then((categoria) => {
            categoria.nome = req.body.nome
            categoria.slug = req.body.slug

            categoria.save().then(() => {
                req.flash('success_msg', 'Categoria atualizada com Sucesso !')
                res.redirect('/admin/categorias')
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro ao atualizar')
                res.redirect('/admin/categorias')
            })
    })
})

router.get('/addCategoria', (req, res) => {
    res.render('admin/addCategorias')
})

//O Populate usa o nome do CAMPO A PESQUISAR
router.get('/posts', (req, res) => {
    Postagem.find().populate("categoria").sort({data: "desc"}).then((postagens) => {
        res.render('admin/posts', {postagens: postagens})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar postagens")
        res.redirect('/admin')
    })
    
})

router.get('/addPostagem', (req,res) => {
    Categoria.find().then((categorias) => {
        res.render('admin/addPostagem', {categorias: categorias})
    }).catch((err) => {
        req.flash('error_msg', 'houve um erro ao carregar o Formulário')
        res.redirect('/admin')
    })
})

router.get('/editPostagem/:id', (req, res) => {
    Postagem.findOne({_id: req.params.id}).then((postagem) => {
        Categoria.find().then((categorias) => {
            res.render('admin/editPostagem', {postagem: postagem, categorias: categorias})
        }).catch((err) => {
            req.flash("error_msg", "Erro ao carregar categorias")
            res.redirect('/admin/posts')
        })
    })
})

router.post('/postagem/edit', (req, res) => {
    Postagem.findOne({_id: req.body.id}).then((postagem) => {
        postagem.titulo = req.body.titulo,
        postagem.descricao = req.body.desc,
        postagem.slug = req.body.slug,
        postagem.categoria = req.body.categoria,
        postagem.texto = req.body.texto

        postagem.save().then(() =>{
            req.flash("success_msg", "Postagem Atualizada com Sucesso")
            res.redirect('/admin/posts')
            console.log(postagem)
        }).catch((err) => {
            req.flash('error_msg', "Houve um erro ao Atualizar a Postagem")
            res.redirect('/admin/posts')
        })
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao Atualizar o post')
        res.redirect('/admin/posts')

    })
})        

router.get('/postagem/delete/:id', (req, res) => {
    Postagem.deleteOne({_id: req.params.id}).then(() => {
        req.flash('success_msg', "Postagem Deletada com sucesso")
        res.redirect('/admin/posts')
    }).catch((err) => {
        req.flash('error_msg', 'Erro Interno')
        res.redirect('/admin')
    })
})


router.post('/postagem/add', (req,res) => {
    var novaPostagem = {
        titulo: req.body.titulo,
        conteudo: req.body.texto,
        categoria: req.body.categoria,
        slug: req.body.slug,
        descricao: req.body.desc
    }

    new Postagem(novaPostagem).save().then(() => {
        req.flash('success_msg', 'Postagem Salva com sucesso')
        res.redirect('/admin/addPostagem')
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao salvar a postagem')
        res.redirect('/admin')
    })
})



router.post('/categoria/add', (req, res) => {
//validação de formulário
    var erro = []
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erro.push({texto: "Erro: Nome da categoria vazia"})
    }
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erro.push({texto: "Erro: Nome do slug Vazio"})
    }
//--------------------------

    if(erro.length > 0){
        res.render("admin/addCategorias", {erros: erro}) //caso tenha erros, envia para o templt o array de erros
    } else {
        var novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        } //aqui salva os dados vindos do form em um objeto
        
        new Categoria(novaCategoria).save() // <-- aqui pega o metodo vindo do model e passa como param o objeto com dados do form
            .then(() => {
                req.flash('success_msg', 'Categoria criada com Sucesso');
                res.redirect('/admin/categorias');
            })
            .catch((err) => {
                req.flash('error_msg', 'Houve um erro ao salvar');
                res.redirect('/admin');
            })
    }
})



module.exports = router