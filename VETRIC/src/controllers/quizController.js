var quizModel = require("../models/quizModel");

function inserir_pontuacao(req, res) {
    var idUsuario = req.body.idUsuarioServer
    var pontuacao = req.body.pontuacaoServer
    quizModel.inserir_pontuacao(idUsuario, pontuacao)
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.error("Não inseriu", erro)
        })
}

function mostrar_pontuacao(req, res) {

    var idUsuario = req.body.idUsuarioServer

    quizModel.mostrar_pontuacao(idUsuario)
        .then(function (resultado) {
            if (resultado.length >= 1) {
                var lista_pontuacao = []
                var lista_horario = []
                for (var index = 0; index < resultado.length; index++) {
                    lista_pontuacao.push(resultado[index].pontuacao)
                    lista_horario.push(resultado[index].dt)
                }
                res.json({
                    pontuacoes:lista_pontuacao,
                    horario:lista_horario
                 })

            } else {
                res.status(403).send("Sem pontuações disponíveis");
            }
        }).catch(function (erro) {
            console.error("Não mostrou", erro)
        })
}

module.exports = {
    inserir_pontuacao,
    mostrar_pontuacao
}