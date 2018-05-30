/**
 * Arquivo: Curso.js
 * Author: Julliano Volpato
 * Descrição: arquivo responsável onde trataremos o modelo da classe 'Curso'
 * Data: 18/10/2017
 * obs.: http://mongoosejs.com/docs/schematypes.html
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Aluno:
 * 
 * -> Id: int
 * -> nome: String
 * -> email: String
 * -> nascimento: String
 * 
 */

var AlunoSchema = new Schema({
    nome: String,
    email: String,
    nascimento: String,
    matricula: [{type: Schema.Types.ObjectId, ref:'Matricula'}]
});

module.exports = mongoose.model('Aluno', AlunoSchema);