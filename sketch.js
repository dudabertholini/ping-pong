//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let raqueteOponenteComprimento = 10;
let raqueteOponenteAltura = 90;
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//chance de errar
let chanceDeErrar = 0;
let erroOponente = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  //movimentaRaqueteOponente();
  movimentaRaqueteOponenteBot();
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
    xBolinha = constrain(xBolinha, raio, width - raio);
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
    yBolinha = constrain(yBolinha, raio, height - raio);
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente(){
    if (keyIsDown(87)){
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(83)){
        yRaqueteOponente += 10;
    }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, diametro);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
    // Ajuste a posição da bolinha após a colisão para evitar que ela fique presa
    if (xBolinha < width / 2) {
      xBolinha = x + raqueteComprimento + raio;
    } else {
      xBolinha = x - raio;
    }
  }
}

function movimentaRaqueteOponenteBot() {
  let centroRaqueteOponente = yRaqueteOponente + raqueteOponenteAltura / 2;
  let velocidadeY = (yBolinha - centroRaqueteOponente) * 0.1;
  yRaqueteOponente += velocidadeY + erroOponente;
  calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    erroOponente = (pontosDoOponente - meusPontos) * random(-1, 1);
  } else {
    erroOponente = random(-0.5, 0.5);
  }
  erroOponente = constrain(erroOponente, -5, 5);
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
    resetBolinha();
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
    resetBolinha();
  }
}

function resetBolinha() {
  xBolinha = width / 2;
  yBolinha = height / 2;
  // Alterna a direção inicial da bolinha de forma aleatória
  velocidadeXBolinha = 6 * (Math.random() > 0.5 ? 1 : -1);
  velocidadeYBolinha = 6 * (Math.random() > 0.5 ? 1 : -1);
  // Não resetar a posição das raquetes
}