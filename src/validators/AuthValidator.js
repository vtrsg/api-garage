//funcao do validator em que coloco regras para cada campo dos models
const { checkSchema } = require('express-validator')

module.exports = {
    signup: checkSchema({
        name: {
            trim: true,
            notEmpty: true,
            isLength: {
                options: { min: 4 }
            },
            errorMessage: 'Nome precisa ter pelo menos 4 caracteres'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'Email inválido'
        },
        password: {
            isLength: {
                options: { min: 6 }
            },
            errorMessage: 'Senha precisa ter pelo menos 6 caracteres'
        },
        state: {
            notEmpty: true,
            errorMessage: 'Estado não preenchido'
        }
    }),
    signin: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'Email inválido'
        },
        password: {
            isLength: {
                options: { min: 6 }
            },
            errorMessage: 'Senha precisa ter pelo menos 6 caracteres'
        }
    })
}