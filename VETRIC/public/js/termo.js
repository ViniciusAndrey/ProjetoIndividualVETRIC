const tiles = document.querySelector(".tile-container");
const espaco = document.querySelector("#espaco");
const primeira_linha = document.querySelector("#primeira_linha");
const segunda_linha = document.querySelector("#segunda_linha");
const terceira_linha = document.querySelector("#terceira_linha");

const primeira_coluna = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const segunda_coluna = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const terceira_coluna = ["Z", "X", "C", "V", "B", "N", "M"];

const linha = 6;
const colunas = 5;
let currentRow = 0;
let currentColumn = 0;
let letreco = "VASC";
let letrecoMap = {};
for (let index = 0; index < letreco.length; index++) {
  letrecoMap[letreco[index]] = index;
}
const guesses = [];

for (let rowIndex = 0; rowIndex < linha; rowIndex++) {
  guesses[rowIndex] = new Array(colunas);
  const tileRow = document.createElement("div");
  tileRow.setAttribute("id", "row" + rowIndex);
  tileRow.setAttribute("class", "tile-row");
  for (let columnIndex = 0; columnIndex < colunas; columnIndex++) {
    const tileColumn = document.createElement("div");
    tileColumn.setAttribute("id", "row" + rowIndex + "column" + columnIndex);
    tileColumn.setAttribute(
      "class",
      rowIndex === 0 ? "tile-column typing" : "tile-column disabled"
    );
    tileRow.append(tileColumn);
    guesses[rowIndex][columnIndex] = "";
  }
  tiles.append(tileRow);
}

const checkGuess = () => {
  const guess = guesses[currentRow].join("");
  if (guess.length !== colunas) {
    return;
  }

  var posicao_atual = document.querySelectorAll(".typing");
  for (let index = 0; index < colunas; index++) {
    const letter = guess[index];
    if (letrecoMap[letter] === undefined) {
        posicao_atual[index].classList.add("wrong")
    } else {
        if(letrecoMap[letter] === index) {
            posicao_atual[index].classList.add("right")
        } else {
            posicao_atual[index].classList.add("displaced")
        }
    }
  }

  if(guess === letreco) {
      window.alert("tu é demais, simplesmente o detetivao do entreterimento!")
      return
  } {
      if(currentRow === linha -1) {
          window.alert("Errrrrrou!")
      } else {
          moveToNextRow()
      }
  }
};

const moveToNextRow = () => {
    var typingColumns = document.querySelectorAll(".typing")
    for (let index = 0; index < typingColumns.length; index++) {
        typingColumns[index].classList.remove("typing")
        typingColumns[index].classList.add("disabled")
    }
    currentRow++
    currentColumn=0

    const currentRowEl = document.querySelector("#row"+currentRow)
    var posicao_atual = currentRowEl.querySelectorAll(".tile-column")
    for (let index = 0; index < posicao_atual.length; index++) {
        posicao_atual[index].classList.remove("disabled")
        posicao_atual[index].classList.add("typing")
    }
}

const handleKeyboardOnClick = (key) => {
  if (currentColumn === colunas) {
    return;
  }
  const currentTile = document.querySelector(
    "#row" + currentRow + "column" + currentColumn
  );
  currentTile.textContent = key;
  guesses[currentRow][currentColumn] = key;
  currentColumn++;
};

const createKeyboardRow = (keys, keyboardRow) => {
  keys.forEach((key) => {
    var botao_enter = document.createElement("button");
    botao_enter.textContent = key;
    botao_enter.setAttribute("id", key);
    botao_enter.addEventListener("click", () => handleKeyboardOnClick(key));
    keyboardRow.append(botao_enter);
  });
};

createKeyboardRow(primeira_coluna, primeira_linha);
createKeyboardRow(segunda_coluna, segunda_linha);
createKeyboardRow(terceira_coluna, terceira_linha);

const handleBackspace = () => {
  if(currentColumn === 0){
      return
  }

  currentColumn--
  guesses[currentRow][currentColumn] = ""
  const tile = document.querySelector("#row"+currentRow+"column"+currentColumn)
  tile.textContent = ""
};

const botao_espaco = document.createElement("button");
botao_espaco.addEventListener("click", handleBackspace);
botao_espaco.textContent = "<";
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
        handleBackspace()
    } else {
        handleKeyboardOnClick(evt.key.toUpperCase())
    }
}
