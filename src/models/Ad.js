/*
ads
- _id 
- idUser
- state
- category
- images[{url, default: true}]
- dateCreated
- title
- price
- priceNegociable: true
- description
- views
- status  
*/

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//criando o body model do meu Schema 
const modelSchema = new mongoose.Schema({
    idUser: String,
    state: String,
    category: String,
    images: [Object],
    dateCreated: Date,
    title: String,
    price: Number,
    priceNegociable: Boolean,
    description: String,
    views: Number,
    status: String,
    brand: String,
    km: Number,   
})

/*ele verifica se ja tem conexão e esta disponivel ai ele 
exporta o model direto na conexão e se não tiver cria 
*/
const modelName = 'Ad'

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName]
} else {
    module.exports = mongoose.model(modelName, modelSchema)
}