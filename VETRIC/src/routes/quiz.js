var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/inserir_pontuacao", function(req, res) {
    quizController.inserir_pontuacao(req, res)
})

router.post("/mostrar_pontuacao", function(req, res) {
    quizController.mostrar_pontuacao(req, res)
})

module.exports = router