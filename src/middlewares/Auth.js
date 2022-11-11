//importando o modulo de usuarios para ver se é um token valido 
const User = require('../models/User')


//é um middleware ou seja ele roda antes do destino final 
//next -> vai ser uma função em que coloco para rodar só se cumprir os requisitos
module.exports = {
    private: async (req, res, next) => {
        if (!req.query.token && !req.body.token) {
            res.json({ notallowed: true })
            return
        }
        let token = ''
        if (req.query.token) {
            token = req.query.token
        }
        if (req.body.token) {
            token = req.body.token
        }
        if (token == '') {
            res.json({ notallowed: true })
            return
        }
        const user = await User.findOne({ token });
        if (!user) {
            res.json({ notallowed: true })
            return
        }

        next()
    }
}