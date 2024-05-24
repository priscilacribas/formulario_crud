const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let Formulario = new Schema({
  nome: {
    type: String
  },
  email: {
    type: String
  },
  telefone: {
    type: String
  },
  cep: {
    type: String
  },
  rua: {
    type: String
  }
 
},{collection: 'formulario'
 
});
 
module.exports = mongoose.model ('Formulario', Formulario);