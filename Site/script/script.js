const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const span_quantidade = document.querySelector(".spnQtd");
const textofinal = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

import questions from "./questao.js";

let indice_atual = 0;
let questao_correta = 0;

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  indice_atual = 0;
  questao_correta = 0;
  carregar_questao();
};

function proxima_questao(e) {
  if (e.target.getAttribute("data-correct") === "true") {
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

  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function carregar_questao() {
  span_quantidade.innerHTML = `${indice_atual + 1}/${questions.length}`;
  const item = questions[indice_atual];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", proxima_questao);
  });
}

carregar_questao();
