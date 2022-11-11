require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileupload = require('express-fileupload')

//importando as rotas 
const apiRoutes = require('./src/routes')


//conectando ao banco de dados 
mongoose.connect(process.env.DATABASE)
mongoose.Promise = global.Promise
mongoose.connection.on('error', (error) =>{
    console.log('Erro:', error.message)
})

//configurando o servidor 
const server = express()
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(fileupload())

server.use(express.static(`${__dirname}/public`))


server.use('/', apiRoutes)

server.listen(process.env.PORT, ()=>{
    console.log(`Rodando no endereço: ${process.env.BASE}`)
})
