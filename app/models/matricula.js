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
 * Matricula:
 * 
 * -> Id: int
 * -> aluno: object
 * -> curso: object
 * 
 */

var MatriculaSchema = new Schema({
    aluno: {type: Schema.Types.ObjectId, ref:'Aluno'},
    curso: {type: Schema.Types.ObjectId, ref:'Curso'}
});

module.exports = mongoose.model('Matricula', MatriculaSchema);