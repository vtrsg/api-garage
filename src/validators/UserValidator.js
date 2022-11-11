//funcao do validator em que coloco regras para cada campo dos models
const {checkSchema} = require('express-validator')

module.exports = {
    editAction: checkSchema({
        token: {
            notEmpty: true,
        },
        name: {
            optional: true,
            trim: true,
            notEmpty: true,
            isLength: {
                options: {min: 4}
            },
            errorMessage:'Nome precisa ter pelo menos 4 caracteres'
        },
        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'Email inválido'
        },
        password: {
            optional: true,
            isLength: {
                options: {min: 6}
            },
            errorMessage: 'Senha precisa ter pelo menos 6 caracteres'
        },
        state: {
            optional: true,
            notEmpty: true,
            errorMessage: 'Estado não preenchido'
        }
    })
}