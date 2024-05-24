const question = document.querySelector(".question");
const respostas = document.querySelector(".respostas");
const span_quantidade = document.querySelector(".spanQtd");
const textofinal = document.querySelector(".finish span");
const conteudo = document.querySelector(".content");
const conteudoFinish = document.querySelector(".finish");
const btnReiniciar = document.querySelector(".finish button");

import questions from "./questao.js";

var indice_atual = 0;
var questao_correta = 0;

btnReiniciar.onclick = () => {
  conteudo.style.display = "flex";
  conteudoFinish.style.display = "none";

  indice_atual = 0;
  questao_correta = 0;
  carregar_questao();
};

function proxima_questao(atributo) {
  if (atributo.target.getAttribute("dados-corretos") == "true") {
    questao_correta++;
  }

  if (indice_atual < questions.length - 1) {
    indice_atual++;
    carregar_questao();
  } else {
    finish();
  }
}

function finish() {

  if(questao_correta <= 1) {
    textofinal.innerHTML = `Tem como melhorar :( <br>
      ${questao_correta} de ${questions.length}`;
  } else if(questao_correta <= 2) {
    textofinal.innerHTML = `Você está no meio do caminho :( <br>
      ${questao_correta} de ${questions.length}`;
  } else if(questao_correta == 3) {
    textofinal.innerHTML = `Parabens! <br> Você acertou
    ${questao_correta} de ${questions.length}`;
  }

  conteudo.style.display = "none";
  conteudoFinish.style.display = "flex";
}

function carregar_questao() {
  span_quantidade.innerHTML = `${indice_atual + 1}/${questions.length}`;
  const item = questions[indice_atual];
  respostas.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" dados-corretos="${answer.correct}">
      ${answer.option}
    </button>
    `;

    respostas.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", proxima_questao);
  });
}

carregar_questao();
