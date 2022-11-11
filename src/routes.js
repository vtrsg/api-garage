const express = require('express')
//criando o roteador ROUTER
const router = express.Router()


const Auth = require('./middlewares/Auth')

//usando o validator 
const AuthValidator = require('./validators/AuthValidator')
const UserValidator = require('./validators/UserValidator')

//importando controllers no routes para poder usar 
const AuthController = require('./controllers/AuthController')
const AdsController = require('./controllers/AdsController')
const UserController = require('./controllers/UserController')



//rota de teste para ver se esta funcionando 
router.get('/ping',(req, res)=>{
    res.json({pong: true})
})
//cadastro para listar os estados do usuario 
router.get('/states', UserController.getStates)

//processo de login
router.post('/user/signin',AuthValidator.signin, AuthController.signin)
//fazer cadastro
router.post('/user/signup', AuthValidator.signup, AuthController.signup)

//pegar informações do usuário 
//Auth.private vai ser um parametro para ver se usuario ta logado
router.get('/user/me', Auth.private, UserController.info)
//trocar informações do usuario 
router.put('/user/me', UserValidator.editAction, Auth.private, UserController.editAction)

//informações do anuncio listar categorias
router.get('/categories', AdsController.getCategories)

//adicionar um anuncio
router.post('/ad/add', Auth.private, AdsController.addAction)
//listar os anuncios 
router.get('/ad/list', AdsController.getList)
//pegar info de um anuncio especifico
router.get('/ad/item', AdsController.getItem)
//alterar informações de um anuncio 
router.post('/ad/:id', Auth.private, AdsController.editAction)


module.exports = router