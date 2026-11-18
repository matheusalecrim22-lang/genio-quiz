const telaInicial = document.getElementById("tela-inicio");
const telaPergunta = document.getElementById("tela-pergunta");
const telaVitoria = document.getElementById("tela-vitoria");
const telaDerrota = document.getElementById("tela-derrota");
const telaSobre = document.getElementById("tela-sobre");
const telaInstrucao = document.getElementById("tela-instrucao");

const btnSobre = document.getElementById("btn-sobre");
const btnInstrucao = document.getElementById("btn-instrucao");
const btnVoltarSobre = document.getElementById("btn-voltar-sobre");
const btnVoltarInstrucao = document.getElementById("btn-voltar-instrucao");
const btnRecomecar = document.getElementById("btn-recomecar");
const btnComecar = document.getElementById("btn-comecar");
const btnJogarnovamente = document.getElementById("btn-jogar-novamente");
const palavraTodos = document.getElementById("palavra-todos");

const opcao1 = document.getElementById("opcao-1");
const opcao2 = document.getElementById("opcao-2");
const opcao3 = document.getElementById("opcao-3");
const opcao4 = document.getElementById("opcao-4");

const tituloPergunta = document.getElementById("titulo-pergunta");  
const numeroPergunta = document.getElementById("numero-pergunta"); 

const perguntas = [
  {
    titulo: "Qual meu refrigerante favorito",
    opcoes: ["fanta laranja", "coca cola", "guarana", "sprit"],
    correta: 0
  },
  {
    titulo: "Qual cantor mais gosto hoje em dia",
    opcoes: ["Teto", "WIU", "Brandao", "Matue"],
    correta: 2
  },
  {
    titulo: "Quais desses filmes está mo meu top 4 do letterboxd",
    opcoes: ["Vingadores", "Diario de uma paixão", "whiplash", "Homem-Aranha 3"],
    correta: 1
  },
  {
    titulo: "Qual meu estilo de musica favorito?",
    opcoes: ["Trap", "MPB", "Funk", "Pop internacional"],
    correta: -1,
    alvo: "todos"
  },
  {
    titulo: "Qual desses apelidos sou chamado?",
    opcoes: ["macholas", "bolochas", "teteu", "marolas"],
    correta: -1,
    alvo: "todos"
  },
  {
    titulo: "Qual meu anime favorito?",
    opcoes: ["Hunter x Hunter", "Naruto", "Bleach", "AOT"],
    correta: 2
  },
  {
    titulo: "Qual desenho mais gostava quando era criança?",
    opcoes: ["Jovens Titans", "Apenas um show", "Hora de aventura", "Ben 10"],
    correta: 3
  },
  {
    titulo: "Quantos bits tem 1 byte",
    opcoes: ["4", "6", "10", "124"],
    correta: -1,
    alvo: "numero"
  },
]

let indiceAtual = 0;

// ================================================================
// trocarTela: faz UMA tela sumir e OUTRA aparecer
// Recebe duas telas: quem sai e quem entra
// Exemplo de uso: trocarTela(telaInicial, telaSobre)
// ================================================================

function trocarTela(quemSai, quemEntra){
  // coloca a classe "escondida" em quem sai (o CSS faz ela sumir)
  quemSai.classList.add("escondida");

  // tira a classe "escondida" de quem entra (ela aparece)
  quemEntra.classList.remove("escondida");
}

palavraTodos.addEventListener("click", function(){
  verificarAlvo("todos");
});


// ================================================================
// acertou: o que acontece DEPOIS de uma resposta certa
// Serve pra qualquer jeito de acertar (botão ou alvo escondido)
// ================================================================
function acertou(){
  // avança pra próxima pergunta: pega o valor atual, soma 1 e guarda de volta
  // (só funciona porque indiceAtual foi criado com let, e não const)
  indiceAtual = indiceAtual + 1;

  // perguntas.length é a quantidade de perguntas da lista
  // se o índice chegou nesse número, não existe mais pergunta pra mostrar
  if (indiceAtual === perguntas.length){
    // acabaram as perguntas: o jogador venceu
    trocarTela(telaPergunta, telaVitoria);
  } else {
    // ainda tem pergunta: só escreve a próxima na mesma tela
    mostrarPergunta();
  }
}

// ================================================================
// verificarAlvo: confere se o jogador clicou no lugar escondido certo
// Recebe o NOME do que foi clicado, por exemplo "todos"
// Tem 3 "portas": só passa por todas quem deve
// ================================================================

function verificarAlvo(nomeDoAlvo){
  // PORTA 1: o jogador está jogando?
  // se a tela de pergunta está escondida, ele está no menu, na derrota...
  // return encerra a função na hora, sem fazer nada
  if (telaPergunta.classList.contains("escondida")){
    return;
  }

  // PORTA 2: esta pergunta tem um alvo?
  // nas perguntas normais o campo alvo não existe e vale undefined
  const alvoCerto = perguntas[indiceAtual].alvo;

  // o ! inverte: "se NÃO tem alvo, sai sem fazer nada"
  if (!alvoCerto) {
    return;
  }

  // PORTA 3: o que o jogador clicou é o alvo certo?
  if (nomeDoAlvo === alvoCerto) {
    acertou();                                  // clicou no lugar certo
  } else {
    trocarTela(telaPergunta, telaDerrota);      // clicou no lugar errado
  }
}

// ================================================================
// mostrarPergunta: escreve na tela a pergunta da vez
// Não recebe nada: ela olha a variável indiceAtual pra saber qual é
// Só DESENHA a pergunta. Não decide acerto nem erro
// ================================================================

function mostrarPergunta() {
  //pega da lista a pergunta da vez e guarda no apelido "p"
  //(se indiceAtual vale 0, é a primeira pergunta; se vale 1, a segunda...)
  const p = perguntas[indiceAtual];

  //troca o texto do titulo pelo titulo dessa pergunta
  tituloPergunta.textContent = p.titulo;
  
  //troca o numero do circulo
  //soma 1 porque a lista começa no 0, mas o jogador ve "1."
  numeroPergunta.textContent = (indiceAtual + 1) + ".";

  //escreve o texto de cada botão com as opções dessa pergunta
  //p.opcoes[0] é a primeira opção da lista, [1] a segunda, e assim por diante
  opcao1.textContent = p.opcoes[0];
  opcao2.textContent = p.opcoes[1];
  opcao3.textContent = p.opcoes[2];
  opcao4.textContent = p.opcoes[3];
}

// ================================================================
// verificar: confere se o botão clicado é a resposta certa
// Recebe a POSIÇÃO do botão clicado: 0, 1, 2 ou 3
// ================================================================

function verificar(posicao) {
  // compara a posição clicada com a posição certa da pergunta atual
  // (=== pergunta "é exatamente igual?"; já o = so guarada valor)
  if (posicao === perguntas[indiceAtual].correta) {
    //era a certa: chama a fução que avança o jogo
    acertou();
  } else {
    // era errada: vai pra tela de derrota
    // (se correta vale -1, nenhuma posição bate, então todas caem aqui)
    trocarTela(telaPergunta, telaDerrota);
  }
}

numeroPergunta.addEventListener("click", function(){
  verificarAlvo("numero");
});


btnSobre.addEventListener("click", function (){
  trocarTela(telaInicial, telaSobre);
});

btnVoltarSobre.addEventListener("click", function(){
  trocarTela(telaSobre, telaInicial);
})

btnInstrucao.addEventListener("click", function (){
  trocarTela(telaInicial, telaInstrucao);
});

btnVoltarInstrucao.addEventListener("click", function(){
  trocarTela(telaInstrucao, telaInicial);
})

btnComecar.addEventListener("click", function () {
  indiceAtual = 0;
  mostrarPergunta();
  trocarTela(telaInicial, telaPergunta);
});

opcao1.addEventListener("click", function(){
   verificar(0);
});

opcao2.addEventListener("click", function(){
    verificar(1);
});

opcao3.addEventListener("click", function(){
    verificar(2);
});

opcao4.addEventListener("click", function(){
    verificar(3);
});

btnRecomecar.addEventListener("click", function(){
    trocarTela(telaDerrota, telaInicial);
});

btnJogarnovamente.addEventListener("click", function(){
    trocarTela(telaVitoria, telaInicial);
})