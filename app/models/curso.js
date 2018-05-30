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
 * Curso:
 * 
 * -> Id: int
 * -> Titulo: String
 * -> Descricao: String
 * 
 */

var CursoSchema = new Schema({
    titulo: String,
    descricao: String
});

module.exports = mongoose.model('Curso', CursoSchema);