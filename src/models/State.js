/*
states
- _id
- name
*/

const mongoose = require('mongoose')
mongoose.Promise = global.Promise 

//criando o body model do meu Schema 
const modelSchema = new mongoose.Schema({
    name: String
})

/*ele verifica se ja tem conexão e esta disponivel ai ele 
exporta o model direto na conexão e se não tiver cria 
*/
const modelName = 'State'

if(mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName]
} else {
    module.exports = mongoose.model(modelName, modelSchema)
}