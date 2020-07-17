function obterPosicaoDaBarra(campo) {
  var posicao = 0;
  if (campo.selectionStart || campo.selectionStart == 0) {
    posicao = campo.selectionStart;
  }
  return posicao;
}

function definirPosicaoDaBarra(campo, pos) {
  if (campo.setSelectionRange) {
    campo.focus();
    if (pos < 0) {
      campo.setSelectionRange(0, 0);
    } else {
      campo.setSelectionRange(pos, pos);
    }
  }
}

function lidarComInput(event) {
  var valorAtual = event.target.value;
  var tamanhoAtual = valorAtual.length;
  var posicaoAtual = obterPosicaoDaBarra(event.target);
  var comeco = null,
    resto = null,
    novaData = null;

  if (!!event.data) {
    comeco = valorAtual.substring(0, posicaoAtual - 1);
    if (posicaoAtual === 3 || posicaoAtual === 6) {
      resto = valorAtual.substring(posicaoAtual + 2, tamanhoAtual);
      novaData = comeco + '/' + event.data + resto;
    } else {
      resto = valorAtual.substring(posicaoAtual + 1, tamanhoAtual);
      novaData = comeco + event.data + resto;
    }
    event.target.value = novaData;
    if (
      posicaoAtual === 2 ||
      posicaoAtual === 3 ||
      posicaoAtual === 5 ||
      posicaoAtual === 6
    ) {
      definirPosicaoDaBarra(event.target, posicaoAtual + 1);
    } else {
      definirPosicaoDaBarra(event.target, posicaoAtual);
    }
  } else {
    resto = valorAtual.substring(posicaoAtual, tamanhoAtual);
    if (posicaoAtual === 2 || posicaoAtual === 5) {
      comeco = valorAtual.substring(0, posicaoAtual - 1);
      novaData = comeco + '_/' + resto;
      event.target.value = novaData;
      definirPosicaoDaBarra(event.target, posicaoAtual - 1);
    } else {
      comeco = valorAtual.substring(0, posicaoAtual);
      novaData = comeco + '_' + resto;
      event.target.value = novaData;
      definirPosicaoDaBarra(event.target, posicaoAtual);
    }
  }
}

function teclaPressionada(event) {
  if (
    pressionada ||
    (event.key !== '0' &&
      event.key !== '1' &&
      event.key !== '2' &&
      event.key !== '3' &&
      event.key !== '4' &&
      event.key !== '5' &&
      event.key !== '6' &&
      event.key !== '7' &&
      event.key !== '8' &&
      event.key !== '9') ||
    obterPosicaoDaBarra(event.target) == 10
  ) {
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'Backspace'
    ) {
      return;
    }
    event.preventDefault();
  }
  pressionada = true;
}

function teclaLiberada() {
  pressionada = false;
}

function lidarComColagem(event) {
  event.preventDefault();
}

var campo = document.querySelector('#campo');
var pressionada = false;
campo.addEventListener('input', lidarComInput);
campo.addEventListener('keydown', teclaPressionada);
campo.addEventListener('keyup', teclaLiberada);
campo.addEventListener('paste', lidarComColagem);
campo.focus();
