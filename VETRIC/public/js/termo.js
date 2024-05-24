const tiles = document.querySelector(".tile-container");
const espaco = document.querySelector("#espaco");
const primeira_linha = document.querySelector("#primeira_linha");
const segunda_linha = document.querySelector("#segunda_linha");
const terceira_linha = document.querySelector("#terceira_linha");

const primeira_coluna = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const segunda_coluna = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const terceira_coluna = ["Z", "X", "C", "V", "B", "N", "M"];

const linha = 5;
const colunas = 5;
var currentRow = 0;
var coluna_atual = 0;
var varreco = "EXITO";
var varrecoMap = {};

for (var index = 0; index < varreco.length; index++) {
  varrecoMap[varreco[index]] = index;
}
const guesses = [];

for (var indice_linha = 0; indice_linha < linha; indice_linha++) {
  guesses[indice_linha] = new Array(colunas);
  const tileRow = document.createElement("div");
  tileRow.setAttribute("id", "row" + indice_linha);
  tileRow.setAttribute("class", "tile-row");
  for (var indice_coluna = 0; indice_coluna < colunas; indice_coluna++) {
    const tileColumn = document.createElement("div");
    tileColumn.setAttribute("id", "row" + indice_linha + "column" + indice_coluna);
    tileColumn.setAttribute(
      "class",
      indice_linha == 0 ? "tile-column typing" : "tile-column disabled"
    );
    tileRow.append(tileColumn);
    guesses[indice_linha][indice_coluna] = "";
  }
  tiles.append(tileRow);
}

const checkGuess = () => {
  const guess = guesses[currentRow].join("");
  if (guess.length !== colunas) {
    return;
  }

  var posicao_atual = document.querySelectorAll(".typing");
  for (var index = 0; index < colunas; index++) {
    const varter = guess[index];
    if (varrecoMap[varter] === undefined) {
        posicao_atual[index].classList.add("wrong")
    } else {
        if(varrecoMap[varter] === index) {
            posicao_atual[index].classList.add("right")
        } else {
            posicao_atual[index].classList.add("displaced")
        }
    }
  }

  if(guess === varreco) {
      window.alert("Você acertou a palavra!")
      return
  } {
      if(currentRow === linha -1) {
          window.alert("Errou!")
      } else {
          nova_rodada()
      }
  }
};

const nova_rodada = () => {
    var typingColumns = document.querySelectorAll(".typing")
    for (var index = 0; index < typingColumns.length; index++) {
        typingColumns[index].classList.remove("typing")
        typingColumns[index].classList.add("disabled")
    }
    currentRow++
    coluna_atual=0

    const linha_atual = document.querySelector("#row"+currentRow)
    var posicao_atual = linha_atual.querySelectorAll(".tile-column")
    for (var index = 0; index < posicao_atual.length; index++) {
        posicao_atual[index].classList.remove("disabled")
        posicao_atual[index].classList.add("typing")
    }
}

const indice_teclado = (key) => {
  if (coluna_atual === colunas) {
    return;
  }
  const currentTile = document.querySelector(
    "#row" + currentRow + "column" + coluna_atual
  );
  currentTile.textContent = key;
  guesses[currentRow][coluna_atual] = key;
  coluna_atual++;
};

const criar_linha_teclado = (keys, keyboardRow) => {
  keys.forEach((key) => {
    var botao_enter = document.createElement("button");
    botao_enter.textContent = key;
    botao_enter.setAttribute("id", key);
    botao_enter.addEventListener("click", () => indice_teclado(key));
    keyboardRow.append(botao_enter);
  });
};

criar_linha_teclado(primeira_coluna, primeira_linha);
criar_linha_teclado(segunda_coluna, segunda_linha);
criar_linha_teclado(terceira_coluna, terceira_linha);

const espaco_lidar = () => {
  if(coluna_atual === 0){
      return
  }

  coluna_atual--
  guesses[currentRow][coluna_atual] = ""
  const tile = document.querySelector("#row"+currentRow+"column"+coluna_atual)
  tile.textContent = ""
};

const botao_espaco = document.createElement("button");
botao_espaco.addEventListener("click", espaco_lidar);
botao_espaco.textContent = "APAGAR";
espaco.append(botao_espaco);

const enterButton = document.createElement("button");
enterButton.addEventListener("click", checkGuess);
enterButton.textContent = "ENTER";
espaco.append(enterButton);

document.onkeydown = function (evt) {
    evt = evt || window.evt
    if(evt.key === "Enter"){
        checkGuess();
    } else if (evt.key === "Backspace") {
        espaco_lidar()
    } else {
        indice_teclado(evt.key.toUpperCase())
    }
}
