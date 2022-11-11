const { validationResult, matchedData } = require('express-validator')
//criar hash do usuario
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const State = require('../models/State')
//importando usuarios para verificar se existe
const User = require('../models/User')

module.exports = {
    signin: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() })
            return
        }
        const data = matchedData(req)

        //validando o email
        const user = await User.findOne({ email: data.email })
        if (!user) {
            res.json({ error: 'E-mail ou senha invalidos' })
            return
        }
        //validando senha 
        const match = await bcrypt.compare(data.password, user.passwordHash)
        if (!match) {
            res.json({ error: 'E-mail ou senha invalidos' })
            return
        }
        //gerando hash aleatório
        const payload = (Date.now() + Math.random()).toString()
        //criptografando a senha
        const token = await bcrypt.hash(payload, 10)

        user.token = token
        await user.save()
        res.json({ token, email: data.email })
    },
    signup: async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() })
            return
        }
        const data = matchedData(req)

        //verificando se email existe
        const user = await User.findOne({
            email: data.email
        })
        if (user) {
            res.json({
                error: { email: { msg: 'Email já existe' } }
            })
            return
        }
        if (mongoose.Types.ObjectId.isValid(data.state)) {
            //verificando se o estado existe
            const stateItem = await State.findById(data.state)
            if (!stateItem) {
                res.json({
                    error: { state: { msg: 'Estado não existe' } }
                })
                return
            }
        } else {
            res.json({
                error: { state: { msg: 'Código de estado não existe' } }
            })
            return
        }

        const passwordHash = await bcrypt.hash(data.password, 10)

        //gerando hash aleatório
        const payload = (Date.now() + Math.random()).toString()
        //criptografando a senha
        const token = await bcrypt.hash(payload, 10)
        //criando usuário 
        const newUser = new User({
            name: data.name,
            email: data.email,
            passwordHash,
            token,
            state: data.state
        })
        await newUser.save()

        res.json({ token })
    }
}