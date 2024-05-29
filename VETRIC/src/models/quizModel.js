var database = require("../database/config");

function inserir_pontuacao(idUsuario, pontuacao) {
    var instrucaoSql = `insert into ranking values (default, ${pontuacao}, default, ${idUsuario})`
    return database.executar(instrucaoSql)
} 

function mostrar_pontuacao(idUsuario) {
    var instrucaoSql = `select * from ranking where fk_usuario = ${idUsuario}`
    return database.executar(instrucaoSql)
}

module.exports = {
    inserir_pontuacao,
    mostrar_pontuacao
  }