/* ──────────────────────────────────────────────────────────
   CONFIGURAÇÃO DA API.BIBLE
   Cadastre-se gratuitamente em https://scripture.api.bible
   e substitua pela sua chave abaixo.
   ──────────────────────────────────────────────────────────*/
   const BIBLE_API_KEY = ""; // não precisa mais

/* ── Remove aspas tipográficas da API ── */
function stripQuotes(text) {
  return text.replace(/[“”„‟‘’]/g, "");
}

/* ──────────────────────────────────────────────────────────
   CACHE LOCAL (localStorage)
   Evita chamadas repetidas à API — limite de 5k/mês
   Chave: URL completa da requisição
   TTL: 30 dias (em ms)
   ──────────────────────────────────────────────────────────*/
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 dias
const CACHE_PREFIX = "bibleCache:";

function cacheGet(url) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + url);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) {
      localStorage.removeItem(CACHE_PREFIX + url);
      return null;
    }
    return data;
  } catch { return null; }
}

function cacheSet(url, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + url, JSON.stringify({ ts: Date.now(), data }));
  } catch (e) {
    // localStorage cheio — limpa entradas antigas e tenta de novo
    clearOldCache();
    try { localStorage.setItem(CACHE_PREFIX + url, JSON.stringify({ ts: Date.now(), data })); } catch {}
  }
}

function clearOldCache() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith(CACHE_PREFIX));
  // Remove os 20% mais antigos
  const entries = keys.map(k => {
    try { return { k, ts: JSON.parse(localStorage.getItem(k)).ts }; } catch { return { k, ts: 0 }; }
  }).sort((a, b) => a.ts - b.ts);
  entries.slice(0, Math.max(1, Math.floor(entries.length * 0.2))).forEach(e => localStorage.removeItem(e.k));
}

async function cachedFetch(url) {
  const cached = cacheGet(url);
  if (cached) return cached;
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.status);
  const json = await res.json();
  cacheSet(url, json);
  return json;
}


   /* IDs de versões disponíveis na API.Bible */
   const BIBLE_VERSIONS = [
    { id: "41a6caa722a21d88-01", name: "NVT — Nova Versão Transformadora", lang: "pt" },
    { id: "78a9f6124f344018-01", name: "NIV — New International Version", lang: "en" },
  ];
  
   
   /* ──────────────────────────────────────────────────────────
      MAPEAMENTO DE REFERÊNCIAS → ID DA API.BIBLE
      Formato: "BOOK.CHAPTER.VERSE"  (padrão USFM da API)
      Para versículos compostos (ex: Rom 8:38-39), usamos
      passages endpoint: "ROM.8.38-ROM.8.39"
      ──────────────────────────────────────────────────────────*/
   const verses = [
   
     /* ── 01. AMOR (12) ── */
     { apiId:"JHN.3.16",         theme:"Amor",      ref:"João 3:16",
       ctx:"Jesus estava conversando com Nicodemos, um líder religioso que foi até Ele de noite. E foi nessa conversa que Jesus proferiu as palavras mais poderosas já ditas sobre o amor de Deus. Não um amor sentimental — um amor que custou o Filho Unigênito. Deus não enviou um anjo. Não enviou um profeta. Enviou o Seu próprio Filho. É isso que faz esse amor ser diferente de tudo o que o mundo conhece." },
   
     { apiId:"1JN.4.8",          theme:"Amor",      ref:"1 João 4:8",
       ctx:"João escrevia para pessoas que estavam sendo confundidas por falsos mestres. E ele aponta direto para o coração da questão: se você não ama, você simplesmente não conhece Deus. Porque Deus não apenas tem amor — Ele é amor. Isso não é poesia. É a natureza mais profunda de quem Ele é." },
   
     { apiId:"ROM.8.38-ROM.8.39", theme:"Amor",     ref:"Romanos 8:38-39",
       ctx:"Paulo escreveu isso de dentro de uma prisão, sabendo que podia ser executado. E ainda assim declarou com total certeza: nada pode me separar do amor de Deus. Nem morte, nem vida, nem coisa alguma nesta criação. Essa não é uma esperança frágil — é uma convicção inabalável baseada em quem Cristo é." },
   
     { apiId:"1CO.13.4",          theme:"Amor",     ref:"1 Coríntios 13:4",
       ctx:"A igreja de Corinto estava dividida, ciosa e orgulhosa. E Paulo os para no meio do caminho e diz: sem amor, tudo o que vocês fazem não vale nada. O amor que Deus pede não é um sentimento — é uma decisão. É paciência quando você quer explodir. É bondade quando você quer se fechar. É a marca de quem realmente foi transformado." },
   
     { apiId:"1PE.4.8",           theme:"Amor",     ref:"1 Pedro 4:8",
       ctx:"Pedro escrevia para cristãos que estavam sendo perseguidos. E ele diz: acima de tudo, amem com intensidade uns aos outros. O amor cobre uma multidão de pecados — não porque você faz vista grossa, mas porque o amor escolhe não manter um registro de ofensas. É o que mantém a comunidade de pé nos momentos mais difíceis." },
   
     { apiId:"DEU.6.5",           theme:"Amor",     ref:"Deuteronômio 6:5",
       ctx:"Esse mandamento é o centro da fé de Israel, repetido todos os dias por milênios. Jesus o chamou de o maior de todos os mandamentos. Amar a Deus de todo o coração, toda a alma e toda a força — isso não é um ritual. É uma entrega total. É quando Deus deixa de ser uma obrigação e se torna o centro de tudo na sua vida." },
   
     { apiId:"EPH.3.17-EPH.3.18", theme:"Amor",     ref:"Efésios 3:17-18",
       ctx:"Paulo estava preso quando escreveu essa oração. E o que ele pede para os crentes não é saúde, nem prosperidade — ele pede que eles compreendam a dimensão do amor de Cristo. Largura, comprimento, altura, profundidade. Ele quer dizer: esse amor é maior do que você consegue imaginar. Mas você pode começar a experimentá-lo." },
   
     { apiId:"SNG.8.6",           theme:"Amor",     ref:"Cantares 8:6",
       ctx:"O amor descrito aqui não é fraco nem passageiro. É forte como a morte — e quem já perdeu alguém sabe que a morte não recua. Esse é o amor de Deus por você. Firme. Inabalável. Que nenhuma circunstância consegue apagar. É fogo sagrado — não consome para destruir, mas para purificar e guardar." },
   
     { apiId:"LUK.15.20",         theme:"Amor",     ref:"Lucas 15:20",
       ctx:"Na parábola do filho pródigo, o pai vê o filho chegando de longe e corre para encontrá-lo. No mundo daquela época, homens de respeito não corriam em público. Mas o pai corre — porque o amor de Deus não espera você chegar até Ele por conta própria. Ele vem ao seu encontro quando você ainda está no caminho de volta." },
   
     { apiId:"ZEC.2.8",           theme:"Amor",     ref:"Zacarias 2:8",
       ctx:"Deus usa uma das imagens mais delicadas que existem: a pupila do olho. A parte mais sensível, mais protegida do seu corpo. É assim que Deus te vê. Quem toca no Seu povo, toca nessa parte mais sensível d'Ele. Isso faz você entender o quanto você importa para Deus." },
   
     { apiId:"1CO.13.13",         theme:"Amor",     ref:"1 Coríntios 13:13",
       ctx:"Paulo lista as três maiores virtudes da vida cristã e declara: o amor é o maior. A fé um dia se tornará visão. A esperança se tornará realidade. Mas o amor permanece — porque Deus é amor, e a eternidade é a vida com Ele. De tudo o que você pode cultivar hoje, o amor é o único que nunca vai caducar." },
   
     { apiId:"ROM.13.10",         theme:"Amor",     ref:"Romanos 13:10",
       ctx:"Paulo vai direto ao ponto: o amor não faz mal ao próximo. Por isso, ele é o cumprimento de toda a lei. Não é que a lei não importa — é que quando você genuinamente ama, você obedece por dentro, não por fora. Não é regra que você segue com medo; é um coração que foi transformado." },
   
     /* ── 02. FÉ (12) ── */
     { apiId:"HEB.11.1",          theme:"Fé",       ref:"Hebreus 11:1",
       ctx:"Essa é a definição mais clara de fé nas Escrituras. Fé não é achismo, não é esperança vaga — é certeza de coisas que você ainda não vê com os olhos físicos, mas que são tão reais quanto o que você toca. É a convicção que ancora sua vida no que Deus prometeu, mesmo quando as circunstâncias gritam o contrário." },
   
     { apiId:"GAL.2.20",          theme:"Fé",       ref:"Gálatas 2:20",
       ctx:"Paulo descreve aqui a maior transformação que pode acontecer na vida de um ser humano. O 'eu' velho — o que vivia para si, para seus próprios planos e orgulhos — foi crucificado com Cristo. E agora é Cristo que vive por dentro. A fé que salva não apenas muda o comportamento. Ela muda quem você é." },
   
     { apiId:"MRK.9.24",          theme:"Fé",       ref:"Marcos 9:24",
       ctx:"Esse homem tinha um filho sofrendo, e foi honesto com Jesus: eu creio, mas tenho dúvida. E Jesus curou o filho assim mesmo. Essa confissão é uma das mais sinceras de toda a Bíblia — e Jesus não rejeitou ele por ter dúvidas. Se você tiver fé do tamanho de um grão, mas for genuína, isso é suficiente para Deus agir." },
   
     { apiId:"ROM.1.17",          theme:"Fé",       ref:"Romanos 1:17",
       ctx:"Esse versículo foi o que mudou a história da Igreja. Martinho Lutero leu 'o justo viverá pela fé' e compreendeu que a salvação não se ganha por esforço humano — ela vem de Deus, pela fé. Não é o que você faz que te salva. É o que Cristo já fez. E a fé é a mão que recebe esse presente." },
   
     { apiId:"MAT.17.20",         theme:"Fé",       ref:"Mateus 17:20",
       ctx:"Jesus não disse que você precisa de uma fé enorme. Ele disse que uma fé pequenininha — como o menor de todos os grãos — já é capaz de mover montanhas. A questão não é o tamanho da sua fé. É em quem você está colocando ela. Uma fé pequena em um Deus grande move o impossível." },
   
     { apiId:"JAS.2.17",          theme:"Fé",       ref:"Tiago 2:17",
       ctx:"Tiago está respondendo a pessoas que diziam crer mas não viviam como crentes. A fé que salva não é apenas concordar com doutrinas. Ela transforma o que você faz. Fé morta é fé que não mudou nada em você. A fé verdadeira sempre produz fruto — não para ganhar a salvação, mas porque você realmente foi transformado." },
   
     { apiId:"PHP.1.29",          theme:"Fé",       ref:"Filipenses 1:29",
       ctx:"Paulo diz uma coisa que o mundo acha absurda: sofrer por Cristo é uma graça. Não é punição, não é abandono — é privilégio. Porque no sofrimento por causa do evangelho, você compartilha algo com o próprio Jesus. E é nesse lugar que a fé se aprofunda de um jeito que a prosperidade nunca conseguiria produzir." },
   
     { apiId:"EPH.2.8-EPH.2.9",   theme:"Fé",       ref:"Efésios 2:8-9",
       ctx:"Paulo é absolutamente claro aqui: a salvação é dom de Deus. Não é produto do seu esforço, da sua religiosidade, da sua disciplina. É graça. E a própria fé que você usa para receber essa graça também vem de Deus. Isso não deixa espaço para orgulho espiritual — só para gratidão." },
   
     { apiId:"JHN.20.29",         theme:"Fé",       ref:"João 20:29",
       ctx:"Tomé precisou ver para crer. Jesus o encontrou onde ele estava — e o deixou tocar. Mas então Jesus disse: bem-aventurados os que não viram e creram. Isso é você. Você não estava no aposento quando Jesus apareceu. Mas você crê. E Jesus declara você bem-aventurado por isso." },
   
     { apiId:"PRO.3.5",           theme:"Fé",       ref:"Provérbios 3:5",
       ctx:"Confiar em Deus de todo o coração significa soltar o controle. Não depender do seu próprio raciocínio como ponto final. Isso não quer dizer que você não pensa — quer dizer que você reconhece que Deus enxerga o que você não enxerga. É a fé que diz: Senhor, eu não entendo tudo, mas eu confio em Ti." },
   
     { apiId:"HEB.11.6",          theme:"Fé",       ref:"Hebreus 11:6",
       ctx:"Sem fé é impossível agradar a Deus — não difícil, impossível. Porque fé é o fundamento de qualquer relacionamento com Ele. E o mínimo que a fé precisa conter é isso: Deus existe, e Ele recompensa quem O busca com sinceridade. Comece aí. Deus honra quem vem até Ele com esse coração." },
   
     { apiId:"ROM.10.17",         theme:"Fé",       ref:"Romanos 10:17",
       ctx:"A fé não nasce do nada. Ela vem de ouvir — ouvir a Palavra de Cristo. É por isso que pregar importa. É por isso que ler a Bíblia importa. A fé não é produzida pelo esforço humano — ela nasce quando você expõe seu coração à mensagem de Jesus Cristo. A Palavra é a semente; a fé é o fruto." },
   
     /* ── 03. ESPERANÇA (12) ── */
     { apiId:"JER.29.11",         theme:"Esperança", ref:"Jeremias 29:11",
       ctx:"Deus disse isso para um povo que estava vivendo como exilado na Babilônia — longe de casa, sem liberdade, sem perspectiva visível. E mesmo assim Ele declarou: eu tenho planos de paz para vocês. Não de mal. Isso não foi dito num dia fácil. Foi dito no pior momento. E vale para você também." },
   
     { apiId:"ROM.8.28",          theme:"Esperança", ref:"Romanos 8:28",
       ctx:"Paulo não diz que todas as coisas são boas. Ele diz que todas as coisas cooperam para o bem de quem ama a Deus. Tem uma diferença enorme. Coisas terríveis podem acontecer — mas Deus é capaz de usar até o pior momento da sua vida para produzir algo que você não poderia imaginar. Isso é esperança real." },
   
     { apiId:"ISA.40.31",         theme:"Esperança", ref:"Isaías 40:31",
       ctx:"Esse texto foi escrito para um povo que estava exausto — exilado, sem forças, sem esperança. E Deus promete: os que esperam em Mim vão renovar as suas forças. Não os que lutam mais, não os que se esforçam mais — os que esperam. Esperar em Deus não é passividade. É confiar que Ele é suficiente quando você já não tem mais nada." },
   
     { apiId:"LAM.3.22-LAM.3.23", theme:"Esperança", ref:"Lamentações 3:22-23",
       ctx:"O livro de Lamentações descreve a destruição total de Jerusalém. É o texto mais triste do Antigo Testamento. E no meio desse naufrágio, o escritor encontra uma âncora: as misericórdias de Deus se renovam a cada manhã. Não importa como foi ontem. A cada manhã, Deus começa de novo com você." },
   
     { apiId:"ROM.15.13",         theme:"Esperança", ref:"Romanos 15:13",
       ctx:"Paulo chama Deus de 'Deus da esperança' — um título que não aparece em mais lugar nenhum no Novo Testamento. A esperança que Paulo descreve aqui não vem de você se animar. Ela vem do Espírito Santo que transborda dentro de você. É uma esperança sobrenatural, dada por Deus, sustentada por Ele." },
   
     { apiId:"1PE.1.3",           theme:"Esperança", ref:"1 Pedro 1:3",
       ctx:"Pedro chama a esperança cristã de 'viva' — não morta, não vaga, não incerta. Ela é viva porque está ancorada na ressurreição de Jesus. A esperança de um mundo melhor, de restauração, de vida eterna — tudo isso se sustenta em um fato histórico real: Jesus saiu do túmulo. Essa é a diferença de tudo." },
   
     { apiId:"PSA.71.14",         theme:"Esperança", ref:"Salmos 71:14",
       ctx:"O escritor desse salmo está numa fase difícil da vida — perseguido, envelhecendo, vulnerável. Mas ele faz uma escolha: continuarei esperando, e louvarei cada vez mais. Esperança não é um sentimento que vem. É uma decisão que você toma — especialmente quando não tem vontade. E quando você louva na dificuldade, algo muda." },
   
     { apiId:"REV.21.4",          theme:"Esperança", ref:"Apocalipse 21:4",
       ctx:"Essa é a promessa final da Bíblia para todos que pertencem a Deus. Deus mesmo vai enxugar cada lágrima dos seus olhos. Não haverá mais morte, nem choro, nem dor. Essa não é uma metáfora vaga de 'ficar melhor'. É uma promessa concreta de que um dia tudo o que te quebrou vai ser completamente restaurado." },
   
     { apiId:"HAB.3.17-HAB.3.18", theme:"Esperança", ref:"Habacuque 3:17-18",
       ctx:"Habacuque descreve o cenário mais devastador que um agricultor poderia imaginar: sem figos, sem uvas, sem olivas, sem gado. Tudo perdido. E mesmo assim ele diz: ainda assim me alegrarei no Senhor. Essa é a esperança mais pura que existe — não baseada no que você tem, mas em quem Deus é." },
   
     { apiId:"HEB.6.19",          theme:"Esperança", ref:"Hebreus 6:19",
       ctx:"O escritor usa a imagem de uma âncora para descrever a nossa esperança. Mas essa âncora não está no fundo do mar — ela está presa em Deus mesmo. Por isso ela não cede na tempestade. Não importa o quanto a sua vida balançar, a esperança que está ancorada em Cristo não vai ceder." },
   
     { apiId:"PSA.31.24",         theme:"Esperança", ref:"Salmos 31:24",
       ctx:"O mandamento aqui é direto: sede fortes e corajosos, todos os que esperam no Senhor. A espera em Deus não produz fraqueza — ela produz coragem. Porque quando você sabe em quem você está esperando, e sabe que Ele é fiel, o coração deixa de tremer e começa a firmar." },
   
     { apiId:"ROM.5.3-ROM.5.4",   theme:"Esperança", ref:"Romanos 5:3-4",
       ctx:"Paulo descreve como a esperança se forma em nós através do sofrimento. A tribulação produz perseverança. A perseverança produz caráter. E o caráter produz esperança. Não é que o sofrimento é bom em si mesmo — é que Deus usa até o sofrimento para construir em você algo que não se quebra." },
   
     /* ── 04. PAZ (12) ── */
     { apiId:"JHN.14.27",         theme:"Paz",       ref:"João 14:27",
       ctx:"Jesus disse isso na noite em que seria preso e executado. E mesmo assim Ele fala de paz — não a paz que o mundo oferece, que depende de tudo ir bem. A paz de Jesus está disponível no meio da crise. Ele a deixa como herança. Não precisa conquistar. Precisa receber." },
   
     { apiId:"PHP.4.6-PHP.4.7",   theme:"Paz",       ref:"Filipenses 4:6-7",
       ctx:"Paulo escreveu isso de dentro da prisão. Ele tinha todo motivo para a ansiedade. Mas ele encontrou o segredo: transforme a ansiedade em oração. Não negue o que está sentindo — leve para Deus, com gratidão. E aí acontece algo que ultrapassa toda lógica: uma paz que guarda o seu coração como uma sentinela." },
   
     { apiId:"ISA.26.3",          theme:"Paz",       ref:"Isaías 26:3",
       ctx:"A paz perfeita prometida aqui tem uma condição: a mente firme em Deus. Não é fácil. O mundo faz de tudo para desviar o seu foco. Mas quando você deliberadamente mantém os olhos em Deus — na Sua fidelidade, no Seu caráter — uma paz profunda começa a tomar lugar. Não paz sem batalha. Paz dentro da batalha." },
   
     { apiId:"ROM.5.1",           theme:"Paz",       ref:"Romanos 5:1",
       ctx:"Antes de Cristo, o ser humano estava em guerra com Deus — separado por causa do pecado. Mas a justificação pela fé resolve isso. Você não está mais do lado errado. Através de Jesus, você tem paz com Deus. Esse é o fundamento de tudo. Antes de sentir paz, você precisa saber que tem paz." },
   
     { apiId:"PSA.23.2",          theme:"Paz",       ref:"Salmos 23:2",
       ctx:"A imagem do pastor levando as ovelhas para repousar à beira de águas tranquilas é uma das mais pacificantes de toda a Bíblia. Davi escreveu isso por experiência própria — ele foi pastor. Ele sabia o que era cuidar de ovelhas. E ele usou isso para descrever o cuidado de Deus com você: pessoal, atento, restaurador." },
   
     { apiId:"MAT.5.9",           theme:"Paz",       ref:"Mateus 5:9",
       ctx:"Jesus não chamou de bem-aventurados os que evitam conflito — mas os pacificadores. Quem trabalha ativamente para trazer reconciliação, restaurar relacionamentos, construir pontes. Isso é o que filhos de Deus fazem — porque refletem o caráter do Pai que enviou o Filho para nos reconciliar com Ele." },
   
     { apiId:"COL.3.15",          theme:"Paz",       ref:"Colossenses 3:15",
       ctx:"Paulo diz que a paz de Cristo deve governar o seu coração — ser o árbitro das suas decisões. Quando você está em dúvida, quando há tensão, quando precisa escolher entre caminhos — deixe a paz de Cristo decidir. Se você não tem paz com aquela decisão, é um sinal de Deus para parar e reconsiderar." },
   
     { apiId:"NUM.6.26",          theme:"Paz",       ref:"Números 6:26",
       ctx:"Essa bênção foi dada por Deus a Moisés para que os sacerdotes a pronunciassem sobre o povo de Israel. E ainda ressoa hoje — porque o mesmo Deus que mandou essas palavras no deserto quer dá-las a você. O Senhor voltando o Seu rosto para você significa favor, atenção e paz que vêm diretamente d'Ele." },
   
     { apiId:"EPH.2.14",          theme:"Paz",       ref:"Efésios 2:14",
       ctx:"No Templo de Jerusalém havia um muro que separava judeus de gentios. Cruzá-lo era crime grave. Jesus derrubou esse muro. Não apenas como símbolo — como realidade. Em Cristo, as divisões mais profundas entre pessoas são superadas. Jesus não veio apenas trazer paz com Deus. Ele veio ser a paz entre os seres humanos." },
   
     { apiId:"PSA.4.8",           theme:"Paz",       ref:"Salmos 4:8",
       ctx:"Davi escreveu isso em fuga de seus inimigos — literalmente dormindo ao relento, vulnerável. E mesmo assim ele diz: em paz me deito e durmo. Não porque a situação era segura. Mas porque Deus era o Seu lugar seguro. Essa paz que permite dormir no meio da tempestade só vem de uma confiança profunda em Deus." },
   
     { apiId:"ISA.9.6",           theme:"Paz",       ref:"Isaías 9:6",
       ctx:"Isaías profetizou sobre o Messias séculos antes de Jesus nascer. E um dos títulos que ele deu foi 'Príncipe da Paz'. Não porque Jesus tinha um temperamento suave e evitava conflitos — mas porque Ele é o Rei que instaura a ordem e a plenitude de Deus sobre tudo. Onde Jesus reina, a paz verdadeira chega." },
   
     { apiId:"2TH.3.16",          theme:"Paz",       ref:"2 Tessalonicenses 3:16",
       ctx:"Paulo encerra a carta com uma bênção de paz 'em tudo' — não em tudo que é fácil, mas em toda circunstância. E ele chama Deus de 'Senhor da paz' — título único no Novo Testamento. A paz não é apenas algo que Deus distribui. É parte do que Ele é. Quando Ele está com você, a paz está com você." },
   
     /* ── 05. FORÇA (12) ── */
     { apiId:"PHP.4.13",          theme:"Força",     ref:"Filipenses 4:13",
       ctx:"Esse versículo não é um slogan de autoajuda. Paulo não está dizendo que pode fazer qualquer coisa que quiser. Ele está falando de contentamento — aprender a estar bem tanto na abundância quanto na necessidade. E a força para isso vem de Cristo, não de força de vontade. É uma força que vem de dentro." },
   
     { apiId:"ISA.41.10",         theme:"Força",     ref:"Isaías 41:10",
       ctx:"Deus fala diretamente ao povo no exílio — exausto, com medo, sem perspectiva. E diz: não temas, porque Eu sou contigo. Não estou te observando de longe — Eu sou teu Deus. Eu te fortaleço, te ajudo, te sustento. Três promessas em sequência, como três pilares. Quando tudo cede, Deus ainda está ali." },
   
     { apiId:"EPH.6.10",          theme:"Força",     ref:"Efésios 6:10",
       ctx:"Paulo está abrindo a seção sobre a armadura espiritual. E ele começa por aqui: a força que você precisa não é a sua — é a força de Deus. A batalha espiritual é real, mas você não entra nela dependendo da sua própria capacidade. Você entra nela revestido do poder de Quem já venceu." },
   
     { apiId:"PSA.46.1",          theme:"Força",     ref:"Salmos 46:1",
       ctx:"Martinho Lutero foi buscar nesse salmo a letra de 'Castelo Forte' em meio à Reforma — quando toda a Europa estava contra ele. 'Deus é o nosso refúgio e força.' Não era discurso — era experiência. Nos momentos de maior pressão, Deus se revela como o lugar seguro que não se move." },
   
     { apiId:"2CO.12.9",          theme:"Força",     ref:"2 Coríntios 12:9",
       ctx:"Paulo pediu três vezes para Deus remover um sofrimento. E Deus disse não — mas não saiu de perto. Disse: Minha graça te basta. Meu poder se completa na sua fraqueza. O que parecia um problema era na verdade um palco para o poder de Deus brilhar. A fraqueza que você não suporta pode ser exatamente onde Deus mais age." },
   
     { apiId:"JOS.1.9",           theme:"Força",     ref:"Josué 1:9",
       ctx:"Josué tinha acabado de perder Moisés e estava prestes a liderar um povo inteiro para uma guerra. O nível de pressão era imenso. E Deus diz: sê forte e corajoso. Não porque a situação era fácil — porque Eu estou contigo em todo lugar. A coragem não vem de ausência de medo. Vem da presença de Deus." },
   
     { apiId:"PSA.28.7",          theme:"Força",     ref:"Salmos 28:7",
       ctx:"Davi descreve uma trajetória: ele confia em Deus, recebe ajuda, e o coração exulta em louvor. Não é teoria — é testemunho. O Senhor é minha força e meu escudo. Quando você passa por algo e sai do outro lado, você sabe que não saiu por conta própria. E o louvor é a resposta natural a isso." },
   
     { apiId:"NEH.8.10",          theme:"Força",     ref:"Neemias 8:10",
       ctx:"O povo estava chorando ao ouvir a Lei de Deus depois de décadas no exílio. E Esdras os para e diz: a alegria do Senhor é a vossa força. Não é a sua alegria — é a alegria que vem d'Ele. Uma alegria que não depende das circunstâncias porque tem uma fonte diferente de tudo que o mundo oferece." },
   
     { apiId:"PSA.18.32",         theme:"Força",     ref:"Salmos 18:32",
       ctx:"Esse é um salmo de vitória de Davi. E ele não usa o vocabulário do guerreiro invencível. Ele diz: Deus é quem me cinge de força. É Deus quem prepara, equipa, e torna o caminho trilhável. O forte não é o que nunca caiu — é o que percebeu que Deus o levantou todas as vezes." },
   
     { apiId:"HAB.3.19",          theme:"Força",     ref:"Habacuque 3:19",
       ctx:"Habacuque é o profeta que começou o livro questionando Deus com raiva. E termina dizendo: o Senhor Deus é a minha força, Ele faz meus pés como os da corça. Da dúvida e da revolta para a confiança e a agilidade. Esse é o caminho da fé — não ausência de perguntas, mas encontrar a Deus mesmo dentro delas." },
   
     { apiId:"1CH.16.11",         theme:"Força",     ref:"1 Crônicas 16:11",
       ctx:"Esse versículo foi cantado quando a Arca da Aliança chegou a Jerusalém — um momento de celebração histórica. Mas a instrução é para sempre: busquem ao Senhor e a sua força, busquem continuamente a sua face. A força de Deus não é algo que você pega uma vez. É resultado de um relacionamento contínuo." },
   
     { apiId:"EPH.3.16",          theme:"Força",     ref:"Efésios 3:16",
       ctx:"Paulo ora para que os efésios sejam fortalecidos no homem interior pelo Espírito. Não fortalecidos externamente, não na aparência — por dentro. É lá que a batalha mais importante acontece. E é lá que o Espírito Santo atua, produzindo uma força que não depende de como você está se sentindo nem do que está acontecendo ao redor." },
   
     /* ── 06. SABEDORIA (12) ── */
     { apiId:"PRO.1.7",           theme:"Sabedoria", ref:"Provérbios 1:7",
       ctx:"O livro de Provérbios começa com essa declaração: o temor do Senhor é o ponto de partida de toda sabedoria. Não o conhecimento, não a experiência, não a inteligência — o temor do Senhor. Isso quer dizer reconhecer quem Deus é e orientar toda a sua vida em função disso. É aí que a sabedoria começa." },
   
     { apiId:"JAS.1.5",           theme:"Sabedoria", ref:"Tiago 1:5",
       ctx:"Tiago disse isso para pessoas passando por provações — precisando de sabedoria para navegar situações difíceis. E a instrução é simples: peça a Deus. Ele dá generosamente e sem reclamar. A sabedoria que Deus dá não é para te fazer parecer inteligente. É para te dar a capacidade de atravessar os momentos mais duros com integridade." },
   
     { apiId:"COL.2.3",           theme:"Sabedoria", ref:"Colossenses 2:3",
       ctx:"Em Colossos havia pessoas ensinando que a sabedoria verdadeira estava em visões, em experiências espirituais especiais, em mistérios escondidos. Paulo responde: toda a sabedoria e todo o conhecimento estão escondidos em Cristo. Você não precisa buscar em outro lugar. Quando você conhece Jesus, você tem acesso ao que há de mais profundo." },
   
     { apiId:"ECC.12.13",         theme:"Sabedoria", ref:"Eclesiastes 12:13",
       ctx:"O pregador passou doze capítulos analisando prazeres, riqueza, sabedoria, poder — e concluiu que tudo é vaidade. E no final chega à conclusão mais simples e mais profunda: teme a Deus e guarda os Seus mandamentos. Toda a investigação intelectual, no final, aponta para a mesma direção: obedece a Deus." },
   
     { apiId:"PRO.4.7",           theme:"Sabedoria", ref:"Provérbios 4:7",
       ctx:"O pai instrui o filho: o mais importante é a sabedoria. Invista tudo para obtê-la. No mundo antigo, isso era uma orientação radical — porque o normal era investir em poder e riqueza. Mas a sabedoria hebraica colocava o entendimento de Deus acima de qualquer coisa que o dinheiro pudesse comprar." },
   
     { apiId:"1CO.1.25",          theme:"Sabedoria", ref:"1 Coríntios 1:25",
       ctx:"O mundo vê a Cruz como loucura e fraqueza. Paulo inverte: a loucura de Deus é mais sábia do que a sabedoria dos homens. A salvação pelo sacrifício de um carpinteiro crucificado não faz sentido para o raciocínio humano. Mas foi o plano mais sábio e mais poderoso que existiu — e funcionou." },
   
     { apiId:"PRO.9.10",          theme:"Sabedoria", ref:"Provérbios 9:10",
       ctx:"O temor do Senhor e o conhecimento do Santo — essas são as raízes da sabedoria. Não é possível ser verdadeiramente sábio sem ter Deus como ponto de partida. Porque a sabedoria não é apenas habilidade intelectual — é capacidade de enxergar a realidade como ela é. E a realidade fundamental é que Deus existe e que Ele é Santo." },
   
     { apiId:"PSA.119.105",       theme:"Sabedoria", ref:"Salmos 119:105",
       ctx:"A Palavra de Deus é descrita como lâmpada para os pés e luz para o caminho. A lâmpada ilumina o próximo passo. A luz revela o caminho mais longo. Você não precisa enxergar o destino inteiro — precisa enxergar o que está na sua frente agora. A Bíblia faz exatamente isso: dá sabedoria para o passo presente e direção para o caminho." },
   
     { apiId:"JOB.28.28",         theme:"Sabedoria", ref:"Jó 28:28",
       ctx:"O capítulo 28 de Jó é um poema profundo: é possível encontrar ouro, prata, pedras preciosas — mas onde se encontra a sabedoria? A resposta de Jó ao final é a mesma de Salomão: temer a Deus. A sabedoria mais profunda não está nos livros, não está na experiência acumulada — está no relacionamento com o Criador." },
   
     { apiId:"PRO.16.16",         theme:"Sabedoria", ref:"Provérbios 16:16",
       ctx:"Adquirir sabedoria vale mais do que ouro. Adquirir entendimento vale mais do que prata. A sabedoria hebraica inverte as prioridades do mercado. Ouro compra coisas. Sabedoria te equipa para viver bem, tomar decisões certas e atravessar crises. É o investimento de mais longo prazo que você pode fazer." },
   
     { apiId:"ISA.11.2",          theme:"Sabedoria", ref:"Isaías 11:2",
       ctx:"Essa é uma profecia sobre o Messias — e o Espírito que repousaria sobre Ele incluía espírito de sabedoria e entendimento. Jesus é descrito como o repositório completo de toda a sabedoria divina. Quando você tem Cristo, você tem acesso ao mesmo Espírito que revestiu Ele. A sabedoria não está distante de você." },
   
     { apiId:"ROM.11.33",         theme:"Sabedoria", ref:"Romanos 11:33",
       ctx:"Depois de onze capítulos de teologia profunda, Paulo para e exclama: ó profundidade das riquezas da sabedoria de Deus! Ele chegou num ponto onde as palavras não dão conta. A sabedoria de Deus é imensurável. Insondável. Há sempre mais para descobrir. Isso não assusta — é motivo de adoração." },
   
     /* ── 07. GRAÇA (12) ── */
     { apiId:"EPH.2.8",           theme:"Graça",     ref:"Efésios 2:8",
       ctx:"Paulo não deixa espaço para dúvida: você foi salvo pela graça, mediante a fé — e isso não veio de você, é dom de Deus. Não veio das suas obras. Isso elimina todo e qualquer orgulho espiritual. Você não chegou a Deus porque foi bom o suficiente. Você chegou porque Deus foi gracioso o suficiente." },
   
     { apiId:"2CO.9.8",           theme:"Graça",     ref:"2 Coríntios 9:8",
       ctx:"Paulo estava pedindo uma oferta para a Igreja de Jerusalém que estava passando fome. E ele ancora a generosidade dos coríntios na generosidade de Deus: Ele tem poder para fazer abundar em vocês toda a graça. Deus não só supre o necessário — Ele supre em excesso, para que você tenha o suficiente e ainda possa ajudar outros." },
   
     { apiId:"JHN.1.16",          theme:"Graça",     ref:"João 1:16",
       ctx:"João descreve a graça de Cristo como uma onda após a outra. Uma graça recebida abre caminho para a próxima. Não é um saldo que você esgota — é um fluxo contínuo que vem da plenitude de quem Cristo é. Cada dia com Deus é uma nova medida de graça chegando na sua vida." },
   
     { apiId:"ROM.5.20",          theme:"Graça",     ref:"Romanos 5:20",
       ctx:"Paulo diz: onde o pecado abundou, a graça superabundou. Não é permissão para pecar mais — é declaração da imensidão da graça. Não importa o quanto você errou. Não existe profundidade de pecado que seja mais funda do que a graça de Deus é alta. A graça sempre supera." },
   
     { apiId:"HEB.4.16",          theme:"Graça",     ref:"Hebreus 4:16",
       ctx:"O trono de Deus é chamado aqui de 'trono da graça'. Não trono de julgamento, não trono de distância — trono de graça. E você pode se aproximar com confiança, não com medo. Cristo abriu o caminho. Você não precisa se preparar para se aproximar de Deus — você vai até Ele exatamente como está, porque a graça é para isso." },
   
     { apiId:"TIT.2.11",          theme:"Graça",     ref:"Tito 2:11",
       ctx:"Paulo personifica a graça como alguém que ensina — ela nos instrui a rejeitar a impiedade e viver com sobriedade neste século. A graça não é apenas perdão do passado. Ela é poder ativo que age no presente. A graça que te salvou continua trabalhando em você para produzir uma vida diferente." },
   
     { apiId:"1PE.5.10",          theme:"Graça",     ref:"1 Pedro 5:10",
       ctx:"Pedro escreve para crentes que estavam sofrendo. E ele diz: o Deus de toda a graça, depois de breve sofrimento, vai aperfeiçoar, confirmar, fortalecer e estabelecer vocês. Quatro ações. Nenhuma passiva. Deus está trabalhando no sofrimento — não deixando acontecer, mas construindo algo dentro de você." },
   
     { apiId:"NUM.6.25",          theme:"Graça",     ref:"Números 6:25",
       ctx:"Essa bênção — o Senhor faça resplandecer o Seu rosto sobre ti e te seja gracioso — é parte da bênção sacerdotal mais antiga que existe. Deus instruiu os sacerdotes a pronunciar isso sobre o povo. E quando o rosto de Deus está virado para você, trazendo graça, não existe condição humana que possa anular esse favor." },
   
     { apiId:"GAL.1.15",          theme:"Graça",     ref:"Gálatas 1:15",
       ctx:"Paulo conta como Deus o chamou pela graça antes mesmo de ele nascer — um perseguidor da Igreja que se tornou o maior evangelista do Novo Testamento. Se Deus pode chamar Paulo pela graça, não existe pessoa que você consideraria perdida demais. O chamado de Deus não depende do passado da pessoa." },
   
     { apiId:"ZEC.4.7",           theme:"Graça",     ref:"Zacarias 4:7",
       ctx:"Zorobabel estava reconstruindo o Templo com recursos mínimos e muita oposição. E Deus diz: o monte de obstáculos na sua frente vai virar planície. E a pedra final vai ser colocada com aclamações de 'Graça! Graça!' — não por força nem por poder, mas pelo Espírito de Deus. O que parece impossível cede diante da graça." },
   
     { apiId:"2CO.12.9",          theme:"Graça",     ref:"2 Coríntios 12:9",
       ctx:"Deus responde ao pedido de Paulo: Minha graça te basta. Não te basta parcialmente — te basta completamente. O poder de Deus se completa na sua fraqueza. Isso inverte tudo. A sua limitação não é um obstáculo para Deus — é o espaço exato onde a graça mais brilha." },
   
     { apiId:"ROM.11.6",          theme:"Graça",     ref:"Romanos 11:6",
       ctx:"Paulo faz um argumento lógico que não tem saída: se é pela graça, não é pelas obras. Porque se fosse pelas obras, a graça deixaria de ser graça. Os dois sistemas são incompatíveis. Ou você confia no que você faz, ou você confia no que Deus faz. A salvação é 100% graça — o que deixa nenhum espaço para orgulho." },
   
     /* ── 08. ORAÇÃO (12) ── */
     { apiId:"MAT.6.9",           theme:"Oração",    ref:"Mateus 6:9",
       ctx:"Jesus estava ensinando contra a hipocrisia religiosa — pessoas que oravam para aparecer, não para se comunicar com Deus. E ele dá um modelo: começa com 'Pai nosso' — intimidade familiar com Deus. A oração cristã não é protocolo religioso. É conversa com um Pai que conhece, ouve e responde." },
   
     { apiId:"PHP.4.6",           theme:"Oração",    ref:"Filipenses 4:6",
       ctx:"Paulo diz: não se preocupem com nada — mas em tudo apresentem seus pedidos a Deus em oração, com ação de graças. A antídoto para a ansiedade não é a força de vontade. É a oração. Transformar o que te agita em conversa com Deus. E a paz que vem depois ultrapassa todo o entendimento." },
   
     { apiId:"1TH.5.17",          theme:"Oração",    ref:"1 Tessalonicenses 5:17",
       ctx:"Orai sem cessar — o mandato mais curto do Novo Testamento. Não significa ajoelhar em oração 24 horas. Significa viver com o coração voltado para Deus o tempo todo. Uma consciência contínua da presença d'Ele. Uma conversa que nunca fecha de vez. É mais um estilo de vida do que uma prática isolada." },
   
     { apiId:"LUK.18.1",          theme:"Oração",    ref:"Lucas 18:1",
       ctx:"Jesus contou a parábola da viúva persistente especificamente para ensinar que devemos orar sempre e não desanimar. A viúva não tinha poder — só persistência. E ela venceu. Jesus usa isso para dizer: se até um juiz injusto cede à persistência, quanto mais o Pai celeste responde aos que clamam a Ele." },
   
     { apiId:"PSA.62.8",          theme:"Oração",    ref:"Salmos 62:8",
       ctx:"Davi convida: derramai diante d'Ele o vosso coração. Não a versão editada, não a oração bonita e bem estruturada — o coração inteiro. Com raiva, com dúvida, com medo, com gratidão. Deus pode lidar com tudo o que você está sentindo. A oração mais honesta é a que Deus mais aprecia." },
   
     { apiId:"ROM.8.26",          theme:"Oração",    ref:"Romanos 8:26",
       ctx:"Há momentos em que você não sabe nem como orar. A dor é tão grande que as palavras não saem. Paulo diz: o próprio Espírito Santo intercede por você com gemidos que não se expressam em palavras. Você não está sozinho nem quando sua oração não tem forma. O Espírito fala ao Pai o que você não consegue articular." },
   
     { apiId:"JHN.17.21",         theme:"Oração",    ref:"João 17:21",
       ctx:"Na maior oração de Jesus registrada na Bíblia, o que ele pede para os discípulos é unidade — a mesma unidade que existe entre Ele e o Pai. E o propósito dessa unidade é que o mundo creia. A forma como os cristãos se tratam uns aos outros tem peso missionário. A oração de Jesus era pela Igreja que você faz parte." },
   
     { apiId:"DAN.6.10",          theme:"Oração",    ref:"Daniel 6:10",
       ctx:"Daniel soube que havia um decreto proibindo a oração sob pena de morte. E foi até o quarto dele, abriu a janela em direção a Jerusalém, e orou três vezes como sempre fazia. A oração de Daniel não era emergência — era hábito. E nenhuma lei humana era capaz de fechar essa porta para ele." },
   
     { apiId:"MAT.7.7",           theme:"Oração",    ref:"Mateus 7:7",
       ctx:"Jesus usa três imagens de ação contínua: pedir, buscar, bater. No original grego estão no tempo presente contínuo — continue pedindo, continue buscando, continue batendo. A oração persistente não está forçando a mão de Deus — está formando o caráter de quem ora. Deus responde, mas também forma quem espera." },
   
     { apiId:"PSA.50.15",         theme:"Oração",    ref:"Salmos 50:15",
       ctx:"Deus diz diretamente: chama a mim no dia da angústia. Não: tente resolver sozinho. Não: mostre que você é forte. Clame a Mim. E Ele promete: Eu te livrarei. A oração no momento mais difícil não é fraqueza — é exatamente o que Deus pediu. E quando Ele te livrar, você vai glorificá-Lo." },
   
     { apiId:"1JN.5.14",          theme:"Oração",    ref:"1 João 5:14",
       ctx:"João diz que a confiança na oração está ligada a orar segundo a vontade de Deus. Não é uma limitação — é um convite para conhecer o coração de Deus. Quanto mais você conhece quem Deus é, mais suas orações se alinham com o que Ele quer, e mais você experimenta respostas. A oração eficaz cresce do relacionamento." },
   
     { apiId:"ISA.65.24",         theme:"Oração",    ref:"Isaías 65:24",
       ctx:"Deus faz uma promessa impressionante: antes que eles chamem, Eu responderei. Ainda estão falando, e Eu já ouvi. Isso retrata um Pai que conhece os filhos tão bem que entende a necessidade antes de ser pedida. Você nunca está orando para alguém que está distraído. Deus já ouviu antes de você terminar de falar." },
   
     /* ── 09. PERDÃO (12) ── */
     { apiId:"1JN.1.9",           theme:"Perdão",    ref:"1 João 1:9",
       ctx:"João escreve para dois tipos de pessoas: as que negavam ter pecado, e as que achavam que eram irrecuperáveis. E ele diz para os dois: se confessarmos nossos pecados, Deus é fiel e justo para perdoar. Não condescendente — fiel e justo. O perdão está disponível. Basta ser honesto diante de Deus." },
   
     { apiId:"PSA.103.12",        theme:"Perdão",    ref:"Salmos 103:12",
       ctx:"Davi usa a maior distância que conseguia imaginar: o oriente e o ocidente nunca se encontram. É assim que Deus remove os seus pecados de você. Não esconde, não ignora — remove, para uma distância impossível de alcançar. Quando Deus perdoa, o pecado deixa de ter jurisdição sobre você." },
   
     { apiId:"ISA.43.25",         theme:"Perdão",    ref:"Isaías 43:25",
       ctx:"Deus diz: Eu sou o que apaga as tuas transgressões — por amor de Mim mesmo. Não por você ter se corrigido o suficiente. Não por você ter se punido o suficiente. Por amor de Si mesmo — porque é do caráter de Deus perdoar. E Ele acrescenta: não me lembrarei dos teus pecados. Isso não é esquecimento — é absolvição." },
   
     { apiId:"MAT.18.21-MAT.18.22", theme:"Perdão", ref:"Mateus 18:21-22",
       ctx:"Pedro achou que estava sendo generoso ao propor perdoar sete vezes. Jesus respondeu: setenta vezes sete. Não é uma matemática — é um princípio. O perdão cristão não tem teto. Isso é difícil. É humanamente impossível sem a graça de Deus. Mas é o padrão do reino — porque é o padrão de Como Deus nos perdoa." },
   
     { apiId:"LUK.23.34",         theme:"Perdão",    ref:"Lucas 23:34",
       ctx:"No pior momento da história — pregado numa cruz — Jesus olhou para os que o estavam matando e disse: Pai, perdoa-lhes, pois não sabem o que fazem. Esse é o padrão mais alto de perdão que existe. E Jesus não estava falando apenas para impressionar — Ele estava mostrando como o Pai age com todos nós." },
   
     { apiId:"EPH.4.32",          theme:"Perdão",    ref:"Efésios 4:32",
       ctx:"Paulo conecta o perdão que você oferece com o perdão que você recebeu. Perdoe um ao outro assim como Deus vos perdoou em Cristo. Não é força de vontade — é memória. Quando você recorda a dimensão do que foi perdoado em você, a capacidade de perdoar o outro começa a fazer sentido." },
   
     { apiId:"COL.3.13",          theme:"Perdão",    ref:"Colossenses 3:13",
       ctx:"Paulo assume que dentro de uma comunidade cristã haverá razões reais para ressentimento — e ainda assim instrui a perdoar. Não minimizar a ofensa. Não fingir que não doeu. Mas absorvê-la — assim como Cristo absorveu o pecado de todos nós. O perdão é o que mantém a comunidade funcionando." },
   
     { apiId:"MIC.7.18",          theme:"Perdão",    ref:"Miqueias 7:18",
       ctx:"Miqueias exclama: qual Deus como Tu, que perdoa a iniquidade? A resposta é: nenhum. Nenhuma divindade do mundo antigo perdoava assim. A misericórdia não esgota Deus — Ele se deleita nela. O perdão não é a exceção do caráter de Deus. É o centro d'Ele." },
   
     { apiId:"HEB.8.12",          theme:"Perdão",    ref:"Hebreus 8:12",
       ctx:"O escritor cita Jeremias 31 para mostrar que a nova aliança com Deus inclui uma promessa: dos teus pecados não me lembrarei mais. Isso é um veredicto legal definitivo. Não um sentimento de Deus variável com o dia. É uma declaração permanente da nova aliança selada pelo sangue de Cristo." },
   
     { apiId:"LUK.15.22",         theme:"Perdão",    ref:"Lucas 15:22",
       ctx:"O pai na parábola do filho pródigo nem espera o filho terminar de confessar. Ele já está mandando trazer a melhor roupa, o anel e as sandálias. A roupa é honra restaurada. O anel é autoridade devolvida. As sandálias mostram que ele é filho, não escravo. O perdão de Deus não é apenas esquecimento — é restauração completa." },
   
     { apiId:"MAT.6.14",          theme:"Perdão",    ref:"Mateus 6:14",
       ctx:"Jesus conecta perdoar e ser perdoado — não como um contrato, mas como evidência. Quem realmente experimentou o perdão de Deus de forma profunda torna-se naturalmente um perdoador. Se há grande dificuldade em perdoar, talvez a pergunta seja: quanto você entendeu de quanto foi perdoado?" },
   
     { apiId:"PRO.17.9",          theme:"Perdão",    ref:"Provérbios 17:9",
       ctx:"Quem cobre uma transgressão busca o amor — e quem fica repetindo o assunto afasta até os melhores amigos. O perdão não é fazer vista grossa para o mal. É a escolha de não usar a ofensa como arma. É o que constrói relacionamentos duráveis — porque nenhum relacionamento sobrevive sem a capacidade de perdoar." },
   
     /* ── 10. CONFIANÇA (12) ── */
     { apiId:"PSA.37.5",          theme:"Confiança", ref:"Salmos 37:5",
       ctx:"Davi meditava sobre a prosperidade dos ímpios — algo que sempre causou confusão nos que creem em Deus. E sua resposta é esta: entrega o seu caminho ao Senhor. Não lute para controlar cada resultado. Confie — e ele agirá. Essa não é inércia. É a postura de quem sabe que Deus é melhor estrategista do que ele." },
   
     { apiId:"PRO.16.3",          theme:"Confiança", ref:"Provérbios 16:3",
       ctx:"A sabedoria aqui não proíbe o planejamento — ela o santifica. Confie ao Senhor as suas obras. Coloque seus planos nas mãos de Deus. E eles serão estabelecidos. Não necessariamente como você planejou — mas como Deus projetou. Confiança não elimina a ação; ela redireciona para quem tem a visão completa." },
   
     { apiId:"ISA.26.4",          theme:"Confiança", ref:"Isaías 26:4",
       ctx:"Confiem no Senhor perpetuamente, porque Ele é uma rocha eterna. O mundo ao redor de Isaías estava desmoronando — invasões, exílio, incerteza. E ele aponta para uma fundação que não se move: Deus. Não o governo, não a economia, não os relacionamentos — Deus. Ele é o único em quem a confiança não decepciona." },
   
     { apiId:"PSA.56.3",          theme:"Confiança", ref:"Salmos 56:3",
       ctx:"Davi estava em terreno inimigo, capturado pelos filisteus — com medo de verdade. E ele não finge que o medo não existe. Ele diz: quando estou com medo, confiarei em Ti. Fé e medo coexistem. A confiança em Deus não elimina o medo — ela é o que você faz com ele." },
   
     { apiId:"NAH.1.7",           theme:"Confiança", ref:"Naum 1:7",
       ctx:"Naum anuncia o julgamento da Assíria — o império que havia aterrorizado o mundo antigo com violência extrema. E no meio desse texto de julgamento, uma declaração: o Senhor é bom, é uma fortaleza no dia da angústia, e conhece os que esperam nele. Conhece — relacionalmente, individualmente. Você não é um número." },
   
     { apiId:"MIC.7.7",           theme:"Confiança", ref:"Miquéias 7:7",
       ctx:"Miqueias descreve a falência total das relações humanas — nem os amigos mais íntimos merecem confiança. E diante disso, ele faz uma escolha: mas eu olharei para o Senhor. Esperarei no Deus da minha salvação. Quando tudo ao redor cede, há ainda um ponto fixo que não cede. E esse ponto é Deus." },
   
     { apiId:"PSA.91.2",          theme:"Confiança", ref:"Salmos 91:2",
       ctx:"O Salmo 91 fala de proteção sobrenatural — e o diabo chegou a citá-lo na tentação de Jesus. Mas o que sustenta tudo é essa declaração pessoal: Deus é o meu refúgio e o meu castelo, o meu Deus em quem confio. Não 'um' refugio. 'O meu'. A confiança que protege é pessoal, não genérica." },
   
     { apiId:"JER.17.7-JER.17.8", theme:"Confiança", ref:"Jeremias 17:7-8",
       ctx:"Jeremias contrasta o homem que confia no homem — como arbusto no deserto, sem água — com o que confia em Deus — como árvore plantada à beira do rio. As raízes dessa árvore alcançam a água mesmo quando não chove. A confiança em Deus não é indiferente às circunstâncias — é ancorada em algo mais profundo do que elas." },
   
     { apiId:"2TI.1.12",          theme:"Confiança", ref:"2 Timóteo 1:12",
       ctx:"Paulo escreveu isso da prisão, esperando a execução. E ele diz: eu sei em quem tenho crido, e estou convicto de que Ele é capaz de guardar o que lhe confiei. Não esperança tímida — convicção firme. Esse é o tipo de confiança que só vem de anos de relacionamento com Deus. Paulo sabia quem era o Deus em quem confiava." },
   
     { apiId:"PSA.20.7",          theme:"Confiança", ref:"Salmos 20:7",
       ctx:"No mundo antigo, carros de guerra e cavalos eram o símbolo do poder militar mais avançado. É como se hoje você dissesse: uns confiam nos mísseis, outros nos exércitos. Mas nós nos lembramos do nome do Senhor. A confiança no poder humano sempre tem um limite. A confiança em Deus não tem." },
   
     { apiId:"JHN.14.1",          theme:"Confiança", ref:"João 14:1",
       ctx:"Jesus diz isso na noite em que seria preso e morto — exatamente quando havia todas as razões para o coração se perturbar. E ele não diz 'não se preocupe, vai ficar tudo bem'. Ele diz: credes em Deus, crede também em Mim. A confiança em Cristo não depende das circunstâncias ficarem boas. Ela transcende as circunstâncias." },
   
     { apiId:"PSA.9.10",          theme:"Confiança", ref:"Salmos 9:10",
       ctx:"Os que conhecem o nome do Senhor confiam nele — porque Ele nunca desamparou os que o buscam. Conhecer o nome de Deus não é saber como Ele se chama. É conhecer quem Ele é — Seu caráter, Sua fidelidade, Seu histórico. A confiança sólida é sempre baseada em experiência com Deus, não em sentimento." },
   
     /* ── 11. ALEGRIA (12) ── */
     { apiId:"PHP.4.4",           theme:"Alegria",   ref:"Filipenses 4:4",
       ctx:"Alegrai-vos no Senhor sempre. Paulo diz isso de dentro da prisão — e repete para garantir que você entendeu. A alegria que ele descreve não está amarrada às circunstâncias porque não vem das circunstâncias. Ela vem do Senhor. Isso a torna disponível em qualquer situação. É uma escolha, não um sentimento esperado." },
   
     { apiId:"PSA.16.11",         theme:"Alegria",   ref:"Salmos 16:11",
       ctx:"Davi descobre o segredo da alegria plena: a presença de Deus. Na Tua presença há plenitude de alegria. Não nos teus presentes, não nas tuas bênçãos — na Tua presença. Quando Pedro cita esse salmo no dia de Pentecostes, ele está apontando para a ressurreição de Jesus como o cumprimento dessa alegria que não termina." },
   
     { apiId:"JHN.15.11",         theme:"Alegria",   ref:"João 15:11",
       ctx:"Jesus disse isso na noite em que ia ser preso. E o que ele quer deixar nos discípulos é a alegria d'Ele — completa. A alegria de Jesus não vinha de tudo estar dando certo. Vinha de fazer a vontade do Pai. É uma alegria que está disponível mesmo quando a vida está doendo." },
   
     { apiId:"ISA.61.3",          theme:"Alegria",   ref:"Isaías 61:3",
       ctx:"Deus opera trocas: coroa no lugar das cinzas, óleo de alegria no lugar do luto, manto de louvor no lugar do espírito angustiado. Isso é o que Jesus veio fazer — e Ele mesmo leu esse texto e declarou que estava sendo cumprido. O luto não é a palavra final. Deus transforma." },
   
     { apiId:"PSA.30.5",          theme:"Alegria",   ref:"Salmos 30:5",
       ctx:"Davi declara: o choro pode durar uma noite, mas a alegria vem pela manhã. A noite tem limite. A dificuldade tem prazo. Isso não nega o sofrimento — mas recusa dar a ele a última palavra. A estrutura da fé é: a noite é real, mas a manhã está garantida. E a manhã traz alegria." },
   
     { apiId:"LUK.10.20",         theme:"Alegria",   ref:"Lucas 10:20",
       ctx:"Os discípulos voltaram eufóricos porque os demônios se submetiam ao nome de Jesus. E Jesus reorienta a alegria deles: não se alegrem por isso — alegrem-se porque os seus nomes estão escritos no céu. O extraordinário passa. A identidade eterna permanece. Alegre-se no que não pode ser tirado." },
   
     { apiId:"1PE.1.8",           theme:"Alegria",   ref:"1 Pedro 1:8",
       ctx:"Pedro escreve para crentes que nunca viram Jesus com os olhos físicos. E descreve uma alegria inexprimível e gloriosa — literalmente impossível de descrever com palavras. A alegria de quem ama e crê em alguém que não viu fisicamente, mas que é mais real do que o que toca. Isso é você." },
   
     { apiId:"PSA.98.4",          theme:"Alegria",   ref:"Salmos 98:4",
       ctx:"O convite ao louvor é universal: toda a terra! A alegria diante de Deus não é apenas emoção privada — é reconhecimento público do Rei. Celebrar a Deus com alegria é ato político tanto quanto espiritual: você está declarando quem governa. E quando você declara isso, a alegria cresce." },
   
     { apiId:"NEH.8.10",          theme:"Alegria",   ref:"Neemias 8:10",
       ctx:"O povo estava chorando ao ouvir a Lei lida em voz alta depois de décadas no exílio. E Esdras os para: a alegria do Senhor é a vossa força. Não a sua alegria — a alegria que vem d'Ele. Uma alegria que não depende de como você está se sentindo porque tem uma fonte sobrenatural." },
   
     { apiId:"ROM.14.17",         theme:"Alegria",   ref:"Romanos 14:17",
       ctx:"Paulo resume o Reino de Deus em três coisas: justiça, paz e alegria no Espírito Santo. A alegria não é acessório do reino — é constitutiva dele. Quando o Espírito está operando numa vida, uma das evidências é alegria. Não felicidade superficial — alegria profunda, produzida por Deus." },
   
     { apiId:"PSA.126.5",         theme:"Alegria",   ref:"Salmos 126:5",
       ctx:"Esse salmo celebra o retorno do exílio. E a imagem é agrícola: quem semeia com lágrimas vai colher com alegria. As temporadas de dor não são desperdiçadas — elas plantam sementes. E as sementes germinam. O sofrimento fiel diante de Deus tem uma promessa de colheita." },
   
     { apiId:"JAS.1.2",           theme:"Alegria",   ref:"Tiago 1:2",
       ctx:"Tiago abre a carta com uma provocação: tende grande alegria quando caírem em provações. Isso parece loucura até você entender o que as provações produzem — paciência, caráter, fé testada. A alegria não é pela dor em si. É pelo que Deus constrói através dela. E quem entende isso pode genuinamente se alegrar." },
   
     /* ── 12. PROVIDÊNCIA (12) ── */
     { apiId:"MAT.6.26",          theme:"Providência", ref:"Mateus 6:26",
       ctx:"Jesus aponta para os pássaros: eles não plantam nem colhem, e o Pai celestial os alimenta. E você vale muito mais do que eles. Isso não proíbe trabalhar nem planejar — proíbe a ansiedade paralisante que surge quando você esquece que Deus está no controle. Você não precisa carregar o peso do futuro." },
   
     { apiId:"PHP.4.19",          theme:"Providência", ref:"Filipenses 4:19",
       ctx:"Os filipenses haviam apoiado Paulo financeiramente mesmo sendo uma igreja pobre. E Paulo devolve uma promessa: o meu Deus suprirá todas as vossas necessidades segundo as suas riquezas em glória em Cristo Jesus. A medida do suprimento não é o seu salário — é a riqueza de Deus. Isso muda tudo." },
   
     { apiId:"GEN.22.14",         theme:"Providência", ref:"Gênesis 22:14",
       ctx:"Abraão nomeou o lugar onde Deus proveu um carneiro no momento mais crítico de sua vida: Yahweh-Yireh, o Senhor proverá. Esse nome ficou — porque é uma verdade que se confirma repetidamente. Deus vê antes de você ver. Ele provê antes de você entender. E quando Ele provê, você nomeia o lugar e lembra." },
   
     { apiId:"ROM.8.32",          theme:"Providência", ref:"Romanos 8:32",
       ctx:"Paulo usa o maior argumento possível: se Deus não poupou o Próprio Filho, mas o entregou por todos nós, como não nos dará também todas as coisas com Ele? Se Deus já fez o sacrifício supremo, qualquer outra coisa que você precisar Ele certamente vai prover. O maior já foi dado — o menor não vai ser negado." },
   
     { apiId:"LUK.12.7",          theme:"Providência", ref:"Lucas 12:7",
       ctx:"Os pássaros eram vendidos em pares por um centavo. Eram insignificantes. E Jesus diz que Deus cuida de cada um. E acrescenta: até os cabelos da sua cabeça estão contados. Isso não é exagero poético — é declaração de um cuidado providencial que chega ao detalhe mais irrelevante da sua existência." },
   
     { apiId:"ISA.58.11",         theme:"Providência", ref:"Isaías 58:11",
       ctx:"Deus promete guiar continuamente, fartar a alma nos lugares áridos, fortalecer os ossos. E a imagem final é de jardim regado — mesmo em terra seca. A providência de Deus não funciona apenas nos dias fáceis. Ela é especialmente visível nos desertos, quando não há outra explicação para a vida que continua." },
   
     { apiId:"DEU.8.3",           theme:"Providência", ref:"Deuteronômio 8:3",
       ctx:"Deus permitiu que Israel passasse fome no deserto e depois proveu o maná — não para ser cruel, mas para ensinar: o homem não vive só de pão, mas de toda palavra que procede da boca de Deus. A providência física tem um propósito espiritual: ensinar dependência. Jesus citou exatamente isso ao ser tentado." },
   
     { apiId:"PSA.145.15-PSA.145.16", theme:"Providência", ref:"Salmos 145:15-16",
       ctx:"Os olhos de todos esperam em Ti — e Tu lhes dás o sustento a seu tempo. Quando Tu abres a Tua mão, todos se fartam. A abertura da mão de Deus é gesto real de generosidade soberana. Ele não provê de má vontade, não provê com conta-gotas. Ele abre a mão." },
   
     { apiId:"PSA.104.27-PSA.104.28", theme:"Providência", ref:"Salmos 104:27-28",
       ctx:"O Salmo 104 celebra Deus não apenas como Criador, mas como Sustentador contínuo. Todos os seres criados aguardam o Seu suprimento. Deus não criou o mundo e saiu de cena. Ele está ativamente mantendo cada ciclo da natureza, cada criatura, cada vida. A criação inteira depende d'Ele a cada momento." },
   
     { apiId:"1KI.17.6",          theme:"Providência", ref:"1 Reis 17:6",
       ctx:"Deus alimentou Elias usando corvos — aves que os judeus consideravam impuras. Ele não se limitou aos meios convencionais. Quando Deus decide prover, Ele usa o que e quem Ele quiser. Às vezes a provisão vem de onde você menos espera. O que importa não é o canal — é a fonte." },
   
     { apiId:"PSA.34.9",          theme:"Providência", ref:"Salmos 34:9",
       ctx:"Davi escreve esse salmo depois de fingir ser louco para se salvar de um rei inimigo. E mesmo em um momento de estratégia humana, ele olha para trás e vê: nada faltou aos que temem a Deus. Não é ausência de dificuldade. É ausência de falta verdadeira. Quem teme ao Senhor tem suficiência em Deus." },
   
     { apiId:"2CO.9.10",          theme:"Providência", ref:"2 Coríntios 9:10",
       ctx:"Aquele que dá semente ao semeador e pão para comer vai também multiplicar a sua semente. A providência de Deus não é só para consumo pessoal — é para capacitar a generosidade. Quando você doa, você não diminui o que tem. Você abre o ciclo de uma provisão que Deus multiplica." },
   
     /* ── 13. ARREPENDIMENTO (12) ── */
     { apiId:"2CH.7.14",          theme:"Arrependimento", ref:"2 Crônicas 7:14",
       ctx:"Essa é a resposta de Deus a Salomão após a dedicação do Templo. E ela continua válida hoje: se o meu povo se humilhar, orar, buscar a Minha face e se converter dos seus maus caminhos — Eu ouvirei, perdoarei e sararei a sua terra. Quatro condições. Três promessas. O arrependimento coletivo muda nações." },
   
     { apiId:"LUK.15.7",          theme:"Arrependimento", ref:"Lucas 15:7",
       ctx:"Jesus diz que há mais alegria no céu por um pecador que se arrepende do que por noventa e nove justos que não precisam de arrependimento. O céu celebra o retorno de cada pessoa. Isso mostra o coração de Deus — Ele não está te esperando de braços cruzados. Ele está aguardando com alegria o seu retorno." },
   
     { apiId:"ACT.3.19",          theme:"Arrependimento", ref:"Atos 3:19",
       ctx:"Pedro prega depois de um milagre de cura no Templo. E o convite é: arrependei-vos e convertei-vos para que os vossos pecados sejam apagados. Apagados — como um registro cancelado. E além do perdão, há algo mais: tempos de refrigério da presença do Senhor. O arrependimento não apenas remove o passado — abre o presente para Deus." },
   
     { apiId:"PSA.51.10",         theme:"Arrependimento", ref:"Salmos 51:10",
       ctx:"Davi orou isso depois de um dos maiores pecados da Bíblia — adultério e assassinato. E sua oração não é 'me corrija' ou 'me discipline'. É: cria em mim um coração puro. Ele sabia que não tinha como se consertar por dentro. Precisava de uma criação nova. E o Deus que criou o universo pode recriar um coração." },
   
     { apiId:"JOL.2.13",          theme:"Arrependimento", ref:"Joel 2:13",
       ctx:"Joel faz um contraste cortante: rasgue o seu coração, não as suas vestes. Rasgar vestes era o gesto externo de luto — fácil de imitar, fácil de usar como show. Deus não quer o gesto. Quer o coração. O arrependimento verdadeiro é invisível para os homens mas completamente visível para Deus." },
   
     { apiId:"EZK.18.30",         theme:"Arrependimento", ref:"Ezequiel 18:30",
       ctx:"Ezequiel fala para um povo que achava que estava condenado pelo pecado dos antepassados. E Deus interrompe: cada geração pode se arrepender. Você não está preso no pecado dos seus pais nem no seu próprio passado. O arrependimento é a porta de saída que está sempre aberta." },
   
     { apiId:"ISA.55.7",          theme:"Arrependimento", ref:"Isaías 55:7",
       ctx:"Deus convida o ímpio a abandonar o seu caminho e os seus pensamentos — e a se voltar para Ele. E promete: Ele muito perdoará. Não um pouco. Não com reservas. Muito. O perdão de Deus é abundante, multiplicado. Não tem racionamento. Quem volta genuinamente encontra um Deus que perdoa além da medida esperada." },
   
     { apiId:"LUK.19.8",          theme:"Arrependimento", ref:"Lucas 19:8",
       ctx:"Zaqueu não foi confrontado diretamente por Jesus sobre seus crimes financeiros. Jesus apenas foi à sua casa. E o encontro com Jesus o transformou tão radicalmente que ele espontaneamente decidiu devolver quatro vezes o que havia tomado injustamente. O arrependimento verdadeiro sempre produz ação concreta." },
   
     { apiId:"REV.3.19",          theme:"Arrependimento", ref:"Apocalipse 3:19",
       ctx:"Jesus fala para a Igreja de Laodiceia — a mais fria, a mais acomodada das sete igrejas. E diz: Eu repreendo e disciplino os que amo. Então sê zeloso e arrepende-te. A disciplina de Deus não é rejeição — é amor que recusa deixar você onde você está. O arrependimento é urgente. E é possível agora." },
   
     { apiId:"HOS.6.1",           theme:"Arrependimento", ref:"Oséias 6:1",
       ctx:"Oséias escreve para um Israel em colapso moral. E o convite é: vinde, tornemos para o Senhor. Não 'tente melhorar' — volte. O arrependimento na Bíblia é basicamente uma volta. Uma mudança de direção. E Oséias usa imagens de cura: Deus nos feriu para nos curar. O diagnóstico honesto é o começo do tratamento." },
   
     { apiId:"ACT.17.30",         theme:"Arrependimento", ref:"Atos 17:30",
       ctx:"Paulo prega no Areópago de Atenas — o centro intelectual do mundo antigo. E declara: Deus anuncia agora a todos os homens em todo lugar que se arrependam. Universal. Sem exceção geográfica, étnica ou cultural. O chamado ao arrependimento é para toda a humanidade, porque o Criador tem autoridade sobre toda a criação." },
   
     { apiId:"LAM.3.40",          theme:"Arrependimento", ref:"Lamentações 3:40",
       ctx:"No meio do livro mais sombrio do Antigo Testamento, o autor convida a algo simples e radical: sondemos os nossos caminhos, provemo-los, e tornemos para o Senhor. Antes de olhar para cima, olhe para dentro. O arrependimento honesto começa com autoavaliação corajosa — disposto a enxergar o que precisa mudar." },
   
     /* ── 14. SERVIÇO (12) ── */
     { apiId:"MRK.10.45",         theme:"Serviço",   ref:"Marcos 10:45",
       ctx:"Jesus define grandeza de uma forma que o mundo nunca entendeu: o maior é o que serve. Ele mesmo veio não para ser servido, mas para servir — e dar a Sua vida em resgate. Isso é modelo, não discurso. Quem quer ser grande no reino de Deus precisa começar se perguntando: a quem posso servir hoje?" },
   
     { apiId:"GAL.5.13",          theme:"Serviço",   ref:"Gálatas 5:13",
       ctx:"Paulo combate dois erros: o legalismo que escraviza, e a libertinagem que usa a liberdade para pecar. A liberdade cristã tem um propósito — servir uns aos outros pelo amor. Você não foi liberto para fazer o que quiser. Foi liberto para finalmente poder amar sem medo, sem obrigação, sem cálculo." },
   
     { apiId:"1PE.4.10",          theme:"Serviço",   ref:"1 Pedro 4:10",
       ctx:"Todo dom que você tem não é seu — é de Deus, para ser administrado em favor dos outros. Pedro chama isso de despenseiro da multiforme graça de Deus. Você não é dono dos seus talentos. É gerente. E o dono espera que você os use para o bem dos que estão ao redor." },
   
     { apiId:"ROM.12.11",         theme:"Serviço",   ref:"Romanos 12:11",
       ctx:"No que requer diligência, não sejais negligentes. Sede fervorosos no espírito, servindo ao Senhor. O serviço a Deus não é tarefa para fazer de qualquer jeito. É expressão de amor. E o amor não dá o que sobrou — dá o melhor. Seja zeloso, não preguiçoso, no que Deus colocou nas suas mãos para fazer." },
   
     { apiId:"LUK.22.27",         theme:"Serviço",   ref:"Lucas 22:27",
       ctx:"Na última ceia, Jesus pergunta quem é maior — o que está à mesa ou o que serve? E então diz: Eu estou no meio de vocês como o que serve. O Filho de Deus, a mesa posta, os discípulos sentados — e Jesus servindo. Isso é o padrão mais alto de liderança que existe. Grandeza e serviço são a mesma coisa no reino." },
   
     { apiId:"HEB.6.10",          theme:"Serviço",   ref:"Hebreus 6:10",
       ctx:"Deus não é injusto para se esquecer da sua obra e do trabalho do amor que você demonstrou em Seu nome. Cada ato de serviço aos irmãos é registrado. Você pode estar servindo em silêncio, sem reconhecimento humano. Mas Deus vê. E Ele não esquece." },
   
     { apiId:"JOS.24.15",         theme:"Serviço",   ref:"Josué 24:15",
       ctx:"O discurso final de Josué inclui uma das declarações mais memoráveis da Bíblia: quanto a mim e à minha casa, serviremos ao Senhor. Não foi dito num dia fácil — foi dito diante do povo inteiro, como desafio e como compromisso. Liderar começa por declarar publicamente a quem você serve." },
   
     { apiId:"ISA.58.6-ISA.58.7", theme:"Serviço",   ref:"Isaías 58:6-7",
       ctx:"Deus rejeita o jejum religioso sem impacto social. O jejum que Ele escolhe é prático: libertar oprimidos, alimentar famintos, hospedar sem-teto. O serviço ao necessitado não é ação social distante da espiritualidade — é ato de adoração. É onde a fé se torna real e visível." },
   
     { apiId:"MAT.25.40",         theme:"Serviço",   ref:"Mateus 25:40",
       ctx:"Jesus se identifica com os mais marginalizados: famintos, estrangeiros, presos, doentes. Quando você os serve, está servindo a Jesus. Os que serviram nem perceberam — porque não estavam fazendo cálculo de retorno. Serviço genuíno não calcula audiência. É amor que age sem esperar ser visto." },
   
     { apiId:"EPH.6.7",           theme:"Serviço",   ref:"Efésios 6:7",
       ctx:"Paulo fala a escravos no mundo romano — pessoas sem escolha sobre quem servir ou como. E transforma a motivação: sirvam de boa vontade como ao Senhor, não como aos homens. Quando o seu trabalho é oferecido a Cristo, mesmo a tarefa mais humilde ganha dignidade e significado eterno." },
   
     { apiId:"JHN.12.26",         theme:"Serviço",   ref:"João 12:26",
       ctx:"Jesus define servir como seguir — não apenas executar tarefas, mas orientar toda a vida em direção a Ele. E acrescenta: onde Eu estou, lá estará também o meu servo. Servir a Cristo te leva para perto d'Ele. E a promessa final: meu Pai honrará quem me serve. O servo fiel tem o reconhecimento do Pai." },
   
     { apiId:"ROM.12.7",          theme:"Serviço",   ref:"Romanos 12:7",
       ctx:"Se o seu dom é o ministério — sirva com excelência. Paulo não diz 'sirva como puder'. Diz: seja diligente no ministério. Seja cuidadoso no ensino. O serviço a Deus merece o seu melhor. Não o que sobrou depois de você fazer tudo o que queria. Mas o que você intencionalmente reservou para Deus e para os outros." },
   
     /* ── 15. BÊNÇÃO (12) ── */
     { apiId:"NUM.6.24-NUM.6.26", theme:"Bênção",    ref:"Números 6:24-26",
       ctx:"Essa é a bênção sacerdotal mais antiga da Bíblia — gravada em prata séculos antes de Cristo, é o texto bíblico mais antigo já encontrado pela arqueologia. Deus mesmo prescreveu que os sacerdotes a pronunciassem sobre o povo. Quando você ouve essas palavras, você está recebendo o que Deus mandou falar sobre você." },
   
     { apiId:"EPH.1.3",           theme:"Bênção",    ref:"Efésios 1:3",
       ctx:"Paulo diz que Deus já nos abençoou com todas as bênçãos espirituais em Cristo. Não vai abençoar — já abençoou. Você não está esperando que Deus abra a torneira das bênçãos. A torneira já está aberta. Em Cristo, você já tem acesso a tudo que o céu oferece. A questão é se você está recebendo o que já é seu." },
   
     { apiId:"DEU.28.2",          theme:"Bênção",    ref:"Deuteronômio 28:2",
       ctx:"Moisés descreve as bênçãos da aliança com uma imagem vívida: elas virão sobre você e te alcançarão. Não é você correndo atrás das bênçãos — são elas que te perseguem quando você obedece a Deus. A obediência não ganha a salvação, mas abre canais pelos quais o favor de Deus flui na sua vida." },
   
     { apiId:"MAL.3.10",          theme:"Bênção",    ref:"Malaquias 3:10",
       ctx:"Esse é o único lugar da Bíblia onde Deus convida o ser humano a testá-Lo. Traga os dízimos — e prove se Eu não abrirei as janelas dos céus. A generosidade é um teste de confiança. Quando você coloca Deus primeiro financeiramente, você está declarando que crê que Ele é fiel. E Ele aceita esse teste." },
   
     { apiId:"PSA.1.1-PSA.1.2",   theme:"Bênção",    ref:"Salmos 1:1-2",
       ctx:"O Saltério inteiro abre com uma declaração de bem-aventurança. O homem que não segue o conselho dos ímpios, que se deleita na lei do Senhor — esse é bem-aventurado. A bênção não é um evento isolado. É a qualidade de uma vida inteira orientada para Deus. É o fruto de uma escolha diária." },
   
     { apiId:"PRO.10.22",         theme:"Bênção",    ref:"Provérbios 10:22",
       ctx:"A bênção do Senhor enriquece, e não acrescenta dor com ela. Existe uma diferença entre o que você consegue por força própria — que vem com ansiedade, medo de perder, exaustão — e o que Deus providencia. A bênção de Deus vem com paz. Vem com suficiência. Vem sem o peso que a ambição humana carrega." },
   
     { apiId:"PSA.67.1",          theme:"Bênção",    ref:"Salmos 67:1",
       ctx:"O salmista pede a bênção de Deus — mas com propósito missionário: para que o Teu caminho seja conhecido na terra entre todas as nações. A bênção não é terminal. É instrumental. Você é abençoado para ser bênção. O favor de Deus na sua vida é um sinal que aponta para Ele, não um prêmio para ficar guardado." },
   
     { apiId:"PRO.3.33",          theme:"Bênção",    ref:"Provérbios 3:33",
       ctx:"A bênção de Deus repousa sobre a morada dos justos. Não apenas sobre os indivíduos — sobre o lar. Quando uma casa é entregue a Deus, o ambiente inteiro muda. A maneira como as pessoas se tratam, as decisões que são tomadas, a forma como os filhos crescem. A bênção de Deus tem alcance coletivo." },
   
     { apiId:"GAL.3.14",          theme:"Bênção",    ref:"Gálatas 3:14",
       ctx:"Paulo conecta a promessa a Abraão com a chegada do Espírito Santo. A bênção que Deus prometeu a Abraão — que em você serão benditas todas as nações — chegou em Cristo. E o conteúdo final dessa bênção é o próprio Espírito Santo. Você não está recebendo menos do que Abraão foi prometido — está recebendo mais." },
   
     { apiId:"DEU.11.26-DEU.11.27", theme:"Bênção", ref:"Deuteronômio 11:26-27",
       ctx:"Deus coloca diante do povo bênção e maldição — e a diferença está na obediência. Não como sistema de compra e venda, mas como resultado natural de escolhas. Quando você alinha a vida com a vontade de Deus, você entra no fluxo do que Ele pensou para você desde o início." },
   
     { apiId:"1PE.3.9",           theme:"Bênção",    ref:"1 Pedro 3:9",
       ctx:"Não retribuam mal por mal, nem injúria por injúria — mas bendigam. Pedro escreve para cristãos sendo perseguidos. A resposta de Cristo a quem te maltrata não é retaliação. É bênção. Isso é totalmente sobrenatural. E é o que separa o cristão do mundo — uma reação que não faz sentido sem o poder de Deus." },
   
     { apiId:"PSA.115.13",        theme:"Bênção",    ref:"Salmos 115:13",
       ctx:"Deus abençoará os que O temem — tanto os pequenos como os grandes. A bênção de Deus não tem lista de espera baseada em posição social. Ela vem do temor, não do status. Qualquer pessoa que tema ao Senhor genuinamente tem acesso ao mesmo favor que os grandes homens de fé da Bíblia tiveram." },
   
     /* ── 16. SANTIDADE (12) ── */
     { apiId:"1PE.1.15-1PE.1.16", theme:"Santidade", ref:"1 Pedro 1:15-16",
       ctx:"Pedro cita o Levítico: sede santos, porque Eu sou santo. Isso parece impossível — e é, sem a graça de Deus. Mas Pedro não está pedindo perfeição moral pelo esforço humano. Está dizendo: o Deus que chamou você é santo, e o chamado inclui uma transformação que reflete o caráter d'Ele. Santidade é consequência de pertencer a Deus." },
   
     { apiId:"ROM.12.1",          theme:"Santidade", ref:"Romanos 12:1",
       ctx:"Paulo faz o apelo mais radical: ofereça o seu corpo como sacrifício vivo e santo. Não o seu dinheiro, não suas horas — o seu corpo. E chama isso de culto racional. Toda a vida cristã, do momento em que acorda até dormir, é adoração quando entregue a Deus. A santidade não fica dentro da Igreja — vai para a rua com você." },
   
     { apiId:"HEB.12.14",         theme:"Santidade", ref:"Hebreus 12:14",
       ctx:"O autor é direto: sem santificação ninguém verá o Senhor. A santidade não é opcional para quem quer chegar até Deus. Mas o caminho para a santidade não é esforço religioso — é o processo de Deus trabalhando em você continuamente. Santificação é progressiva. Você não precisa estar no final do processo para estar no caminho certo." },
   
     { apiId:"1JN.3.3",           theme:"Santidade", ref:"1 João 3:3",
       ctx:"Todo aquele que tem a esperança de ver Cristo se purifica, assim como Ele é puro. A esperança do retorno de Cristo não produz acomodação — produz motivação. Quando você espera o encontro com Jesus, você quer se parecer mais com Ele. A esperança escatológica tem impacto ético no presente." },
   
     { apiId:"2CO.7.1",           theme:"Santidade", ref:"2 Coríntios 7:1",
       ctx:"Paulo convida: purifiquemo-nos de toda a imundícia da carne e do espírito, aperfeiçoando a santidade no temor de Deus. A santidade é processo ativo — Paulo usa 'aperfeiçoando', não 'tendo alcançado'. É algo que cresce. E o que a alimenta é o temor de Deus — o reconhecimento de quem Ele é e do que nos custou." },
   
     { apiId:"EPH.4.24",          theme:"Santidade", ref:"Efésios 4:24",
       ctx:"Paulo usa a imagem de vestuário: vos revestis do novo homem, criado segundo Deus em justiça e santidade. A santidade tem aspecto intencional — você deliberadamente se veste com o que Cristo produziu em você. É uma escolha diária de se alinhar com quem você foi feito para ser em Cristo." },
   
     { apiId:"PSA.24.3-PSA.24.4", theme:"Santidade", ref:"Salmos 24:3-4",
       ctx:"Quem pode subir ao monte do Senhor? Quem tem mãos inocentes e coração puro. Esse é o padrão — e Jesus o elevou no Sermão do Monte. Não é uma exigência que te afasta de Deus. É uma descrição de quem Deus está formando em você. Você não precisa ser isso antes de vir a Ele. Mas Ele vai transformar você nisso." },
   
     { apiId:"1TH.4.3",           theme:"Santidade", ref:"1 Tessalonicenses 4:3",
       ctx:"Paulo declara diretamente: a vontade de Deus é a vossa santificação. Você não precisa ficar tentando descobrir a vontade de Deus para a sua vida — parte dela está explícita aqui. Deus quer que você seja santificado. Esse não é um detalhe do plano d'Ele. É o centro." },
   
     { apiId:"ISA.6.3",           theme:"Santidade", ref:"Isaías 6:3",
       ctx:"Os serafins ao redor do trono de Deus proclamam: Santo, Santo, Santo — repetido três vezes, o superlativo máximo em hebraico. Isaías, ao ouvir isso, imediatamente se reconhece como homem de lábios impuros. Encontrar a santidade de Deus de verdade produz isso — não orgulho religioso, mas reconhecimento honesto de quem você é." },
   
     { apiId:"LEV.20.26",         theme:"Santidade", ref:"Levítico 20:26",
       ctx:"Deus diz: Vós sereis santos para mim, porque Eu sou santo, e vos separei dos povos para serdes meus. A santidade não é apenas separação de algo — é separação para Deus. Ser santo é ser de Deus. Pertencer a Ele completamente. É uma identidade de propriedade — você é do Senhor." },
   
     { apiId:"JHN.17.17",         theme:"Santidade", ref:"João 17:17",
       ctx:"Jesus ora pedindo ao Pai: santifica-os na verdade — a Tua Palavra é a verdade. A santidade vem de exposição à Palavra de Deus. Não de esforço moral adicional. Não de mais regras. De encontrar a verdade de Deus e deixar que ela molde você por dentro. A Palavra santifica porque revela quem Deus é e quem você foi criado para ser." },
   
     { apiId:"ROM.6.22",          theme:"Santidade", ref:"Romanos 6:22",
       ctx:"Paulo diz que quem foi liberto do pecado e se tornou servo de Deus tem como fruto a santificação. A santidade é produto orgânico de pertencer a Deus. Não é a condição de entrada — é a consequência da transformação. Como uma árvore boa que produz bons frutos, a vida em Deus naturalmente produz santidade." },
   
     /* ── 17. LOUVOR (12) ── */
     { apiId:"PSA.150.6",         theme:"Louvor",    ref:"Salmos 150:6",
       ctx:"O Saltério inteiro termina aqui: todo ser que tem fôlego louve ao Senhor. Não apenas os humanos — toda criatura que respira. O louvor é a razão da existência. Você foi criado para louvar. E quando você louva, você está finalmente fazendo exatamente o que foi feito para fazer." },
   
     { apiId:"HEB.13.15",         theme:"Louvor",    ref:"Hebreus 13:15",
       ctx:"O sacrifício de louvor é oferecer o fruto dos lábios que confessam o Seu nome. O Templo de Jerusalém acabou, os sacrifícios animais cessaram — mas o sacrifício de louvor continua. Sua boca oferecendo gratidão e louvor a Deus é um ato sacerdotal. Você é sacerdote quando louva." },
   
     { apiId:"PSA.34.1",          theme:"Louvor",    ref:"Salmos 34:1",
       ctx:"Davi escreve isso em um dos momentos mais perigosos da sua vida — fugindo, disfarçado, com medo. E diz: bendirei ao Senhor em todo o tempo, o Seu louvor estará sempre nos meus lábios. O louvor contínuo não é negação da dificuldade — é decisão de onde você vai fixar os olhos no meio dela." },
   
     { apiId:"EPH.5.19-EPH.5.20", theme:"Louvor",    ref:"Efésios 5:19-20",
       ctx:"Paulo descreve a comunidade cristã como uma comunidade cantante — salmos, hinos, cânticos espirituais. E acrescenta: dando sempre graças por tudo. Por tudo. Não apenas pelos dias bons. A gratidão constante transforma a percepção da realidade. Quando você agradece em tudo, você começa a enxergar a mão de Deus em tudo." },
   
     { apiId:"REV.5.12",          theme:"Louvor",    ref:"Apocalipse 5:12",
       ctx:"O louvor eterno no trono de Deus é direcionado ao Cordeiro que foi morto. Sete atributos — número da perfeição. E o que recebe toda essa honra não é um guerreiro vitorioso — é um Cordeiro sacrificado. O poder no reino de Deus é exercido através do sacrifício. E o louvor eterno celebra exatamente isso." },
   
     { apiId:"PSA.22.3",          theme:"Louvor",    ref:"Salmos 22:3",
       ctx:"Esse é o salmo que Jesus citou na Cruz: Deus meu, Deus meu, por que me abandonaste? E no meio desse lamento, o versículo 3 declara: Tu és santo, Tu que habitas entre os louvores de Israel. Mesmo no abandono aparente, o louvor cria o espaço habitado por Deus. Louve — e Deus habita ali." },
   
     { apiId:"ISA.43.21",         theme:"Louvor",    ref:"Isaías 43:21",
       ctx:"Deus diz: o povo que formei para mim publicará o meu louvor. A existência da Igreja tem um propósito fundamental: proclamar quem Deus é. Louvar não é apenas devoção privada — é missão. Quando você louva, você está cumprindo o propósito para o qual foi criado e chamado." },
   
     { apiId:"PSA.100.4",         theme:"Louvor",    ref:"Salmos 100:4",
       ctx:"Entrai pelas Suas portas com ação de graças e nos Seus átrios com louvor. O louvor era o que os peregrinos cantavam ao se aproximar do Templo em Jerusalém. Entrar na presença de Deus com gratidão não é protocolo — é a postura certa de quem entendeu quem é Ele e o que Ele fez." },
   
     { apiId:"ROM.11.36",         theme:"Louvor",    ref:"Romanos 11:36",
       ctx:"Depois de onze capítulos de teologia densa, Paulo explode em louvor: Porque d'Ele, por meio d'Ele e para Ele são todas as coisas. A ele seja a glória para sempre. A teologia mais profunda sempre termina em adoração. Quando você realmente entende quem Deus é, a resposta não é argumento — é louvor." },
   
     { apiId:"PSA.63.3",          theme:"Louvor",    ref:"Salmos 63:3",
       ctx:"Davi escreve isso no deserto da Judeia, com sede e em perigo. E declara: a Tua benevolência vale mais do que a vida. Por isso meus lábios Te louvarão. Essa é a hierarquia de valores de quem encontrou Deus de verdade. A bondade de Deus supera o valor da própria vida. E o louvor é a resposta natural." },
   
     { apiId:"1CH.16.34",         theme:"Louvor",    ref:"1 Crônicas 16:34",
       ctx:"Esse refrão — rendei graças ao Senhor, porque Ele é bom, porque a Sua benignidade dura para sempre — era cantado repetidamente pelos levitas no Templo. A repetição não era vazio — era fixação profunda. Até virar reflexo da alma. Deus é bom. Sempre. Essa é a verdade mais estável que existe." },
   
     { apiId:"PSA.8.1",           theme:"Louvor",    ref:"Salmos 8:1",
       ctx:"Davi olha para o céu estrelado e exclama: Ó Senhor, como é admirável o Teu nome em toda a terra! A contemplação da grandeza de Deus não diminui o humano — ela o reposiciona. Você não é grande sozinho, mas você foi criado para administrar a criação de um Deus grandioso. O louvor começa quando você enxerga quem Ele é." },
   
     /* ── 18. PROPÓSITO (12) ── */
     { apiId:"JER.1.5",           theme:"Propósito", ref:"Jeremias 1:5",
       ctx:"Deus diz a Jeremias: antes que eu te formasse no ventre, eu te conheci. Antes de existir, você já era intenção de Deus. Sua vida não foi acidente. Você tem um propósito que antecede o seu nascimento. Isso muda completamente como você enxerga a sua existência — você não precisa inventar sentido. Ele já foi colocado em você." },
   
     { apiId:"EPH.2.10",          theme:"Propósito", ref:"Efésios 2:10",
       ctx:"Somos criação de Deus — feitura d'Ele — criados em Cristo para boas obras que Deus preparou de antemão para que andássemos nelas. Seu propósito não é algo que você inventa — é um caminho que Deus já preparou. A vida cristã é descobrir e caminhar nesse propósito, não criar um do zero." },
   
     { apiId:"ROM.8.29",          theme:"Propósito", ref:"Romanos 8:29",
       ctx:"O propósito final de quem Deus conhece de antemão é ser conformado à imagem do Filho. Não ir para o céu apenas — se tornar parecido com Jesus. Toda a sua história, incluindo as partes difíceis, está sendo usada por Deus para moldar você nessa direção. O propósito mais profundo é transformação de caráter." },
   
     { apiId:"PSA.57.2",          theme:"Propósito", ref:"Salmos 57:2",
       ctx:"Davi clama ao Deus que por ele tudo consuma. Deus não apenas começa — Ele termina o que começa. O propósito que Ele colocou em você não vai ficar pela metade. Mesmo quando tudo parece sem sentido, Deus está trabalhando para cumprir o propósito específico que pensou para a sua vida." },
   
     { apiId:"PHP.1.6",           theme:"Propósito", ref:"Filipenses 1:6",
       ctx:"Paulo está convicto: Aquele que começou em vocês a boa obra vai completá-la até o dia de Cristo Jesus. Deus não abandona os projetos que começa. A transformação que Ele iniciou em você vai ser concluída. Você pode estar no meio do processo — mas há um artesão trabalhando que não larga o que pegou até terminar." },
   
     { apiId:"ISA.46.10",         theme:"Propósito", ref:"Isaías 46:10",
       ctx:"Deus anuncia o fim desde o princípio. Não é bravata — é soberania. O propósito d'Ele permanecerá. O que Ele determinou será cumprido. Isso não elimina a sua responsabilidade — mas oferece uma segurança profunda: o propósito de Deus para a Sua criação não pode ser sabotado por nenhuma força humana ou espiritual." },
   
     { apiId:"ACT.17.28",         theme:"Propósito", ref:"Atos 17:28",
       ctx:"Paulo cita poetas gregos pagãos para dizer: nele vivemos, nos movemos e existimos. Toda busca humana por sentido, toda inquietação por algo maior — tudo isso é eco do Criador plantado dentro da criatura. Você foi feito em Deus e para Deus. Por isso nada mais preenche completamente." },
   
     { apiId:"GEN.1.27",          theme:"Propósito", ref:"Gênesis 1:27",
       ctx:"Deus criou o ser humano à Sua imagem. No mundo antigo, a imagem do rei era colocada nos territórios conquistados como representação do soberano. Todo ser humano é a imagem viva de Deus — representante do Rei sobre a criação. Isso é o seu propósito mais fundamental: representar Deus onde você está." },
   
     { apiId:"1CO.10.31",         theme:"Propósito", ref:"1 Coríntios 10:31",
       ctx:"Paulo estava respondendo uma questão sobre o que é permitido comer. E chegou a um princípio que abarca tudo: seja lá o que for que você faça, faça para a glória de Deus. Isso transforma o cotidiano. Comer, trabalhar, descansar, se relacionar — tudo pode ser propositalmente oferecido a Deus." },
   
     { apiId:"2TI.1.9",           theme:"Propósito", ref:"2 Timóteo 1:9",
       ctx:"Deus nos salvou e nos chamou com um chamado santo — não de acordo com nossas obras, mas segundo o Seu próprio propósito e graça. O chamado não depende da sua competência nem do seu passado. Ele vem do propósito soberano de Deus, fundamentado na graça. Você foi chamado antes de merecer qualquer coisa." },
   
     { apiId:"PSA.138.8",         theme:"Propósito", ref:"Salmos 138:8",
       ctx:"O Senhor consumará o que me diz respeito. Deus não esquece os Seus projetos. Você é obra das mãos d'Ele — e Ele não abandona o que fez com as Suas próprias mãos. Mesmo quando você não enxerga progresso, Deus está completando o que começou. A oração final de Davi — não abandones a obra das Tuas mãos — é uma certeza." },
   
     { apiId:"PRO.19.21",         theme:"Propósito", ref:"Provérbios 19:21",
       ctx:"Muitos planos existem no coração do homem — mas o propósito do Senhor prevalece. Seus planos têm valor. Sua iniciativa importa. Mas há uma sabedoria superior que organiza tudo. Quando você submete seus planos a Deus, você não perde a autoria — você se conecta com o Arquiteto que tem a planta completa." },
   
     /* ── 19. CURA (12) ── */
     { apiId:"PSA.147.3",         theme:"Cura",      ref:"Salmos 147:3",
       ctx:"Deus sara os que têm o coração quebrantado e cura as suas feridas. Esse salmo foi escrito no contexto do retorno do exílio — um povo inteiro em trauma. A cura de Deus não é só física. Ela alcança o coração partido, a dor que não tem palavras. Deus é médico de almas tanto quanto de corpos." },
   
     { apiId:"ISA.53.5",          theme:"Cura",      ref:"Isaías 53:5",
       ctx:"Isaías profetizou sobre alguém que seria traspassado pelas transgressões dos outros — e que pelas Suas feridas nós seríamos sarados. Isso foi escrito séculos antes da crucificação de Jesus. E o Novo Testamento afirma: isso é Jesus. A cura que você precisa — espiritual, emocional, às vezes física — foi comprada na Cruz." },
   
     { apiId:"PSA.34.18",         theme:"Cura",      ref:"Salmos 34:18",
       ctx:"Perto está o Senhor dos que têm o coração quebrantado. Não é quando você está bem, não é quando você tem tudo resolvido — quando você está partido. É aí que Deus se aproxima mais. Isso é o oposto do que o mundo faz. O mundo se afasta do que está quebrado. Deus se move na direção." },
   
     { apiId:"JER.30.17",         theme:"Cura",      ref:"Jeremias 30:17",
       ctx:"Deus diz: Eu te restituirei a saúde e curarei as tuas feridas. Esse texto foi escrito para um povo que havia sido destruído e que ninguém mais se importava em curar. E Deus aparece exatamente onde nenhum recurso humano alcança. A cura de Deus chega nos casos que os homens já desistiram." },
   
     { apiId:"JAS.5.16",          theme:"Cura",      ref:"Tiago 5:16",
       ctx:"Tiago coloca a cura dentro de um contexto de comunidade e confissão: confessem seus pecados uns aos outros e orem uns pelos outros, para serdes curados. A cura muitas vezes passa pelo relacionamento. Há algo que se cura quando você não está mais escondendo, quando há alguém orando por você. A comunidade cristã tem poder de cura." },
   
     { apiId:"EXO.15.26",         theme:"Cura",      ref:"Êxodo 15:26",
       ctx:"Logo depois de atravessar o Mar Vermelho, Deus se revela com um nome: Yahweh-Rafa — o Senhor que sara. Não apenas que pode sarar — que sara. É parte do Seu nome, do Seu caráter. A cura não é exceção com Deus. É expressão de quem Ele é." },
   
     { apiId:"2CH.7.14",          theme:"Cura",      ref:"2 Crônicas 7:14",
       ctx:"A promessa de Deus inclui sarar a terra. Na cosmovisão hebraica, a saúde da criação está conectada com a fidelidade do povo de Deus. Quando há arrependimento genuíno e busca a Deus, o efeito se espalha além das pessoas — alcança o ambiente, a sociedade, a terra. O arrependimento tem alcance que vai além do individual." },
   
     { apiId:"MRK.5.34",          theme:"Cura",      ref:"Marcos 5:34",
       ctx:"A mulher com fluxo de sangue por doze anos tocou Jesus no meio da multidão. E Ele declarou: filha, a tua fé te salvou, vai em paz. Dois elementos combinados: fé e toque. A cura não foi magia — foi fé ativada pelo contato com Jesus. E Ele não deixou ela sair sem restaurar sua dignidade. Curou o corpo e chamou de filha." },
   
     { apiId:"LUK.4.18",          theme:"Cura",      ref:"Lucas 4:18",
       ctx:"Jesus lê Isaías na sinagoga de Nazaré e declara: hoje esta Escritura se cumpriu. E o cumprimento inclui curar os quebrantados de coração. A missão de Jesus não era apenas espiritual ou apenas física — era integral. Ele veio restaurar o ser humano inteiro. Isso continua sendo a missão d'Ele hoje." },
   
     { apiId:"PSA.103.3",         theme:"Cura",      ref:"Salmos 103:3",
       ctx:"Davi lista os benefícios de Deus e coloca perdão e cura em paralelo. Aquele que perdoa todas as tuas iniquidades e sara todas as tuas enfermidades. O mesmo Deus que cuida da alma cuida do corpo. Essa não é separação — é integração. A saúde espiritual e física pertencem ao mesmo Deus que criou o ser humano inteiro." },
   
     { apiId:"ACT.10.38",         theme:"Cura",      ref:"Atos 10:38",
       ctx:"Pedro resume o ministério de Jesus em poucas palavras: andou por toda parte fazendo o bem e curando todos os oprimidos pelo diabo. A cura no ministério de Jesus era expressão do Seu caráter — bondade em ação. O mesmo Jesus que andou curando continua sendo o Senhor que se importa com o sofrimento humano." },
   
     { apiId:"3JN.1.2",           theme:"Cura",      ref:"3 João 1:2",
       ctx:"João ora que Gaio seja saudável em tudo, assim como a sua alma é saudável. A saúde integral — física e espiritual — é o desejo de Deus para as pessoas. A fé cristã não despreza o corpo. Ela valoriza a pessoa inteira. E a oração de João é modelo: ore pela saúde completa das pessoas que você ama." },
   
     /* ── 20. HUMILDADE (12) ── */
     { apiId:"MIC.6.8",           theme:"Humildade", ref:"Miquéias 6:8",
       ctx:"Miquéias resume o que Deus realmente quer: que você pratique a justiça, ame a misericórdia e ande humildemente com o seu Deus. Três coisas. E humildade é a que define a qualidade das outras duas. Sem humildade, a justiça vira orgulho, e a misericórdia vira paternalismo. Andar humildemente com Deus é o que calibra tudo." },
   
     { apiId:"MAT.11.29",         theme:"Humildade", ref:"Mateus 11:29",
       ctx:"Jesus se descreve com duas palavras: manso e humilde de coração. Isso não é fraqueza — é a força mais disciplinada que existe. E ele convida: aprenda de mim. A escola da humildade é a pessoa de Jesus. Você não aprende humildade de um livro — aprende observando e seguindo aquele que a encarna perfeitamente." },
   
     { apiId:"PHP.2.3",           theme:"Humildade", ref:"Filipenses 2:3",
       ctx:"Paulo pede que cada um considere os outros superiores a si mesmo. Isso é absurdo para a lógica do mundo — e completamente possível para quem entendeu que Jesus lavou os pés dos discípulos. A humildade que Deus pede não é baixa autoestima — é preferir o outro de forma deliberada, imitando Cristo." },
   
     { apiId:"MAT.18.4",          theme:"Humildade", ref:"Mateus 18:4",
       ctx:"Jesus colocou uma criança no meio dos discípulos que estavam disputando quem era o maior. E disse: quem se humilhar como esta criança, esse é o maior no reino dos céus. Crianças naquela cultura não tinham status. Eram dependentes. E foi exatamente essa dependência — sem pretensão — que Jesus apontou como modelo." },
   
     { apiId:"1PE.5.6",           theme:"Humildade", ref:"1 Pedro 5:6",
       ctx:"Humilhai-vos sob a poderosa mão de Deus para que Ele em tempo oportuno vos exalte. A sequência é clara: humilhação agora, exaltação no tempo de Deus. Isso requer confiança — confiar que Deus exalta no momento certo. Quem tenta se exaltar por conta própria está substituindo o tempo de Deus pelo seu." },
   
     { apiId:"JAS.4.6",           theme:"Humildade", ref:"Tiago 4:6",
       ctx:"Deus resiste aos soberbos mas dá graça aos humildes. A resistência de Deus ao orgulhoso não é sentimento — é postura. Deus não está do lado de quem confia em si mesmo. Mas quem se humilha — reconhece sua dependência, abre mão do controle — recebe graça. Humildade não é estratégia. É o estado natural de quem conhece Deus." },
   
     { apiId:"ISA.66.2",          theme:"Humildade", ref:"Isaías 66:2",
       ctx:"Deus criou os céus e a terra — e diz que eles não O contêm. Mas Ele olha especialmente para o pobre e contrito de espírito e para o que treme à Sua Palavra. O Deus que não cabe no universo se aproxima do que é pequeno e quebrantado. Humildade não passa desapercebida por Deus — ela atrai a Sua presença." },
   
     { apiId:"PRO.22.4",          theme:"Humildade", ref:"Provérbios 22:4",
       ctx:"A recompensa da humildade e do temor do Senhor são riquezas, honra e vida. A humildade é descrita como alinhamento com a realidade — quem é realista sobre Deus e sobre si mesmo toma as decisões melhores. A vida flui melhor quando você não está tentando ser o que não é, nem fingindo ter o que não tem." },
   
     { apiId:"LUK.14.11",         theme:"Humildade", ref:"Lucas 14:11",
       ctx:"Jesus diz isso num jantar onde estava observando as disputas pelos lugares de honra. E estabelece a lei do reino: quem se exalta será humilhado, quem se humilha será exaltado. Não é estratégia para subir socialmente — é descrição da realidade do reino de Deus, onde os valores do mundo estão completamente invertidos." },
   
     { apiId:"NUM.12.3",          theme:"Humildade", ref:"Números 12:3",
       ctx:"A Bíblia descreve Moisés como o homem mais humilde da terra — e isso foi escrito quando ele estava sendo atacado por sua própria família. A humildade de Moisés não era fraqueza — era a base da sua liderança mais eficaz. O líder que não precisa se defender de cada crítica tem energia para liderar." },
   
     { apiId:"ROM.12.16",         theme:"Humildade", ref:"Romanos 12:16",
       ctx:"Paulo instrui: não ambicioneis coisas elevadas, mas acomodai-vos às que são humildes. Não sejais sábios no vosso próprio conceito. Quando você para de tentar parecer grande, começa a ser útil de verdade. Humildade libera você para servir onde é necessário, não apenas onde você vai ser visto." },
   
     { apiId:"MAT.23.12",         theme:"Humildade", ref:"Mateus 23:12",
       ctx:"Jesus diz isso criticando os fariseus que amavam títulos e honrarias. A lei do reino se repete: quem se exalta será humilhado, quem se humilha será exaltado. A exaltação que vem de Deus só chega depois que você se posiciona em humildade. As duas coisas não coexistem — você escolhe qual caminho vai tomar." },
   
     /* ── 21. SOFRIMENTO (12) ── */
     { apiId:"ROM.8.18",          theme:"Sofrimento", ref:"Romanos 8:18",
       ctx:"Paulo não minimiza o sofrimento presente — mas o coloca em perspectiva. As aflições de agora não se comparam com a glória que será revelada. Ele está comparando peso com peso — e a glória futura pesa infinitamente mais. Isso não faz o sofrimento desaparecer, mas muda completamente como você o carrega." },
   
     { apiId:"2CO.4.17",          theme:"Sofrimento", ref:"2 Coríntios 4:17",
       ctx:"Paulo chama de 'leve e momentâneo' o mesmo sofrimento que em outro lugar lista como açoites, naufrágio e perseguição. Não é negação — é comparação com a escala da eternidade. O sofrimento que parece interminável daqui é momentâneo quando medido pelo peso eterno que está produzindo." },
   
     { apiId:"1PE.4.12-1PE.4.13", theme:"Sofrimento", ref:"1 Pedro 4:12-13",
       ctx:"Pedro diz: não se espantem com o fogo ardente que está no meio de vocês como se fosse algo estranho. O sofrimento não é sinal de abandono — é convite para participar dos sofrimentos de Cristo. Quem participa do sofrimento d'Ele também vai participar da Sua glória. A Cruz precede a coroa." },
   
     { apiId:"JOB.1.21",          theme:"Sofrimento", ref:"Jó 1:21",
       ctx:"Em um só dia, Jó perdeu filhos, propriedades e saúde. E sua primeira resposta foi adoração: nu saí e nu voltarei. O Senhor deu, o Senhor tomou. Seja bendito o nome do Senhor. Isso não é negação do luto — é fé que mantém Deus como Senhor mesmo quando Ele age de forma que não entendemos." },
   
     { apiId:"PSA.23.4",          theme:"Sofrimento", ref:"Salmos 23:4",
       ctx:"Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque Tu estás comigo. Davi não diz que vai desviar do vale — diz que vai atravessá-lo sem medo. Porque Deus está dentro do vale com ele. A presença de Deus no sofrimento é mais poderosa do que a ausência do sofrimento." },
   
     { apiId:"HEB.12.11",         theme:"Sofrimento", ref:"Hebreus 12:11",
       ctx:"Nenhuma disciplina parece agradável no momento — parece só tristeza. Mas depois produz fruto de paz e de justiça. 'Depois' — isso requer perspectiva de tempo. O que Deus está fazendo no sofrimento não é visível no meio d'ele. O fruto aparece depois. Deus é um Pai que disciplina com amor, não com crueldade." },
   
     { apiId:"ISA.43.2",          theme:"Sofrimento", ref:"Isaías 43:2",
       ctx:"Quando você passar pelas águas, Eu serei com você. Não: você não vai passar pelas águas. A promessa não é isenção — é companhia. Deus não promete que o fogo não vai existir. Ele promete que você não vai se queimar sozinho. Isso é mais valioso do que a ausência da provação." },
   
     { apiId:"PSA.46.2-PSA.46.3", theme:"Sofrimento", ref:"Salmos 46:2-3",
       ctx:"Mesmo que a terra mude e as montanhas se movam para o mar, não temeremos. O salmista não está descrevendo ausência de perigo — está descrevendo uma estabilidade que não depende das circunstâncias. A âncora não está nas circunstâncias. Está em Deus. E Deus não se move." },
   
     { apiId:"ROM.5.3-ROM.5.4",   theme:"Sofrimento", ref:"Romanos 5:3-4",
       ctx:"Paulo se gloria nas tribulações — não porque as tribulações são boas, mas pelo que elas produzem. A cadeia é: tribulação → perseverança → caráter provado → esperança. O sofrimento não é o objetivo — é o processo. E Deus usa esse processo para produzir em você algo que não pode ser fabricado de outra forma." },
   
     { apiId:"2CO.12.10",         theme:"Sofrimento", ref:"2 Coríntios 12:10",
       ctx:"Paulo diz: quando sou fraco, então sou forte. Isso resume toda a teologia do sofrimento no Novo Testamento. A fraqueza humana é o espaço onde o poder de Cristo mais brilha. Quando você já não tem mais nada próprio para depender, você descobre que Cristo é suficiente. E suficiência d'Ele é mais do que você jamais teve." },
   
     { apiId:"PSA.30.11",         theme:"Sofrimento", ref:"Salmos 30:11",
       ctx:"Tu mudaste o meu pranto em folguedo, desataste o meu saco e me cingiste de alegria. Davi testemunha de uma transformação real — de luto para dança. Isso não é negação do sofrimento passado. É o testemunho de que Deus transforma o que parecia permanente. O sofrimento não tem a última palavra quando Deus está na história." },
   
     { apiId:"REV.21.3-REV.21.4", theme:"Sofrimento", ref:"Apocalipse 21:3-4",
       ctx:"A visão final da Bíblia mostra Deus morando com os seres humanos e enxugando cada lágrima. Não um Deus distante observando — um Pai se aproximando e cuidando pessoalmente. E não haverá mais morte, nem pranto, nem dor. Esse é o destino da história. Todo sofrimento presente tem prazo de validade." },
   
     /* ── 22. SALVAÇÃO (12) ── */
     { apiId:"ACT.4.12",          theme:"Salvação",  ref:"Atos 4:12",
       ctx:"Pedro diz ao Sinédrio — o tribunal religioso mais poderoso de Israel: em nenhum outro há salvação, porque não há outro nome debaixo do céu dado entre os homens pelo qual devamos ser salvos. Isso foi dito com coragem diante dos que podiam prendê-lo. A exclusividade do evangelho não é intolerância — é fidelidade à verdade." },
   
     { apiId:"ROM.10.9",          theme:"Salvação",  ref:"Romanos 10:9",
       ctx:"Paulo é direto: se confessares com a boca que Jesus é Senhor, e creres no coração que Deus O ressuscitou dentre os mortos, serás salvo. Dois elementos: confissão pública e crença interna. A salvação não é evento privado escondido no coração — ela se declara com a boca. 'Jesus é Senhor' é afirmação que muda tudo." },
   
     { apiId:"LUK.19.10",         theme:"Salvação",  ref:"Lucas 19:10",
       ctx:"Depois de encontrar Zaqueu — o cobrador de impostos mais odiado da cidade — Jesus declara: o Filho do Homem veio buscar e salvar o perdido. Não esperar os perdidos chegarem. Buscar. Jesus vai atrás. Ele está ativo na busca por quem está longe. Nenhuma pessoa está perdida demais para que Jesus não a procure." },
   
     { apiId:"EPH.2.5",           theme:"Salvação",  ref:"Efésios 2:5",
       ctx:"Paulo descreve a condição humana sem Cristo como morta — não ferida, não doente, não fraca. Morta. E a salvação é ressurreição: Deus nos deu vida em Cristo. Isso muda o diagnóstico. Você não precisa de ajuda para melhorar — precisa de vida nova. E foi exatamente isso que Deus deu." },
   
     { apiId:"JHN.3.36",          theme:"Salvação",  ref:"João 3:36",
       ctx:"João usa o tempo presente para ambos os lados: quem crê no Filho tem a vida eterna agora — não vai ter, tem. E quem rejeita o Filho tem a ira de Deus permanecendo sobre ele agora. A salvação não é questão só futura — é realidade presente. A eternidade começa hoje, de um jeito ou de outro." },
   
     { apiId:"TIT.3.5",           theme:"Salvação",  ref:"Tito 3:5",
       ctx:"Ele nos salvou não pelas obras de justiça que fizemos, mas segundo a Sua misericórdia, pelo banho regenerador e renovador do Espírito Santo. Dois aspectos da salvação: regeneração — nascer de novo — e renovação — transformação contínua. A salvação não é só evento passado. É também processo presente do Espírito em você." },
   
     { apiId:"ISA.12.2",          theme:"Salvação",  ref:"Isaías 12:2",
       ctx:"Isaías canta: Deus é a minha salvação. 'Salvação' em hebraico é Yeshua — o mesmo nome de Jesus. Sem saber, Isaías estava cantando o nome do Salvador que viria séculos depois. O Deus que Isaías confiava é o mesmo que mandou Jesus. O plano da salvação não foi improviso — foi projeto eterno de Deus." },
   
     { apiId:"HEB.7.25",          theme:"Salvação",  ref:"Hebreus 7:25",
       ctx:"Jesus pode salvar completamente os que se aproximam de Deus por meio d'Ele, porque vive sempre para interceder por eles. A salvação não tem garantia de prazo limitado — ela é mantida pela intercessão permanente de Cristo. Você não precisa ter medo de perder o que Ele mesmo está sustentando." },
   
     { apiId:"ROM.1.16",          theme:"Salvação",  ref:"Romanos 1:16",
       ctx:"Não me envergonho do evangelho de Cristo — porque ele é o poder de Deus para salvação de todo aquele que crê. Paulo não se envergonha porque conhece o resultado. O evangelho não é apenas mensagem — é poder. Poder que efetivamente salva, efetivamente transforma, efetivamente muda vidas." },
   
     { apiId:"2TI.3.15",          theme:"Salvação",  ref:"2 Timóteo 3:15",
       ctx:"Paulo lembra a Timóteo das Escrituras que ele aprendeu desde criança — e que são capazes de torná-lo sábio para a salvação pela fé em Cristo. As Escrituras têm um propósito: conduzir a Cristo. Toda a Bíblia aponta para Jesus. E quem é conduzido até Ele encontra a salvação que estava no coração do texto desde o início." },
   
     { apiId:"PSA.118.14",        theme:"Salvação",  ref:"Salmos 118:14",
       ctx:"O Senhor é a minha força e o meu cântico e se tornou a minha salvação. Esse versículo foi cantado por Moisés depois de atravessar o Mar Vermelho — e é citado de várias formas ao longo da Bíblia. É a declaração mais antiga e mais repetida de quem experimentou a salvação de Deus: Ele é força, cântico e salvação." },
   
     { apiId:"1TI.2.4",           theme:"Salvação",  ref:"1 Timóteo 2:4",
       ctx:"Deus quer que todos os homens sejam salvos e cheguem ao pleno conhecimento da verdade. Isso revela o coração de Deus: Ele quer salvar a todos. Não apenas um grupo, não apenas os que merecem — todos. A missão de pregar o evangelho tem urgência porque Deus está genuinamente esperando que cada pessoa chegue até Ele." },
   
     /* ── 23. PALAVRA DE DEUS (12) ── */
     { apiId:"2TI.3.16-2TI.3.17", theme:"Palavra de Deus", ref:"2 Timóteo 3:16-17",
       ctx:"Toda a Escritura é inspirada por Deus e útil para ensinar, repreender, corrigir e instruir na justiça. A Bíblia não é apenas história antiga ou literatura religiosa — é Palavra soprada por Deus, com autoridade e poder. O objetivo não é ter cristãos eruditos. É formar pessoas de Deus aptas para toda boa obra." },
   
     { apiId:"PSA.119.105",       theme:"Palavra de Deus", ref:"Salmos 119:105",
       ctx:"Lâmpada para os meus pés é a Tua Palavra e luz para o meu caminho. A lâmpada ilumina o próximo passo — o que você precisa fazer agora. A luz revela o caminho mais longo — para onde você está indo. A Palavra de Deus opera nas duas escalas: a decisão imediata e a direção de vida." },
   
     { apiId:"ISA.55.11",         theme:"Palavra de Deus", ref:"Isaías 55:11",
       ctx:"A Palavra que sai da boca de Deus não voltará vazia — ela realizará o que Ele quer e prosperará naquilo para que foi enviada. A Palavra de Deus tem poder próprio. Quando você planta a Palavra em uma vida, em um coração, em uma situação — ela trabalha. Não depende da sua competência para produzir resultado." },
   
     { apiId:"JHN.1.1",           theme:"Palavra de Deus", ref:"João 1:1",
       ctx:"No princípio era o Verbo — a Palavra — e a Palavra estava com Deus, e a Palavra era Deus. João usa a linguagem de Gênesis 1 de propósito. A Palavra que criou o mundo é a mesma que se tornou carne em Jesus. A revelação máxima de Deus não é um texto — é uma Pessoa. E a Bíblia inteira aponta para essa Pessoa." },
   
     { apiId:"MAT.24.35",         theme:"Palavra de Deus", ref:"Mateus 24:35",
       ctx:"Jesus declara: o céu e a terra passarão, mas as Minhas palavras não passarão. A criação inteira é temporária. As palavras de Jesus são eternas. Isso dá peso diferente ao que Jesus disse. Não são instruções de uma época passada — são palavras de vida que continuam válidas enquanto existir qualquer coisa." },
   
     { apiId:"HEB.4.12",          theme:"Palavra de Deus", ref:"Hebreus 4:12",
       ctx:"A Palavra de Deus é viva e eficaz, mais afiada do que qualquer espada de dois gumes, penetrando até a divisão da alma e do espírito. A Bíblia não é texto morto — ela é viva. Quando você lê a Palavra com o coração aberto, ela não apenas informa — ela cirurgia. Alcança onde nenhum conselho humano chega." },
   
     { apiId:"ROM.10.17",         theme:"Palavra de Deus", ref:"Romanos 10:17",
       ctx:"A fé vem pelo ouvir, e o ouvir pela Palavra de Cristo. Fé não nasce do esforço humano — nasce da exposição à Palavra. É por isso que pregar importa. É por isso que ler a Bíblia importa. A Palavra é a semente. Onde ela é plantada com fidelidade, a fé germina." },
   
     { apiId:"JER.15.16",         theme:"Palavra de Deus", ref:"Jeremias 15:16",
       ctx:"Jeremias diz: foram achadas as Tuas palavras, e eu as comi. As Tuas palavras foram para mim o gozo e a alegria do meu coração. Comer a Palavra — não apenas ler, mas assimilar, digerir, deixar entrar fundo. A Bíblia que você leu de verdade, que entrou dentro de você — essa transforma. A que ficou na superfície, não." },
   
     { apiId:"COL.3.16",          theme:"Palavra de Deus", ref:"Colossenses 3:16",
       ctx:"A Palavra de Cristo habite em vós ricamente. Não visitando de vez em quando — habitando. Com abundância. Paulo está descrevendo uma comunidade saturada da Palavra, onde as pessoas ensinam umas às outras a partir do que aprenderam. A Palavra não é só para o devocional pessoal — é para a vida da comunidade." },
   
     { apiId:"PSA.19.7",          theme:"Palavra de Deus", ref:"Salmos 19:7",
       ctx:"A lei do Senhor é perfeita e restaura a alma. O testemunho do Senhor é fiel e dá sabedoria ao simples. A Palavra não é exclusiva de teólogos e estudiosos. Ela dá sabedoria ao simples — a quem é humilde o suficiente para recebê-la. A Palavra democratiza o acesso a Deus." },
   
     { apiId:"MAT.4.4",           theme:"Palavra de Deus", ref:"Mateus 4:4",
       ctx:"Jesus, com fome depois de quarenta dias de jejum, é tentado a transformar pedras em pão. E responde: não só de pão viverá o homem, mas de toda palavra que procede da boca de Deus. Jesus escolheu a Palavra acima da necessidade física. Isso mostra que há uma fome mais profunda do que a do corpo — e a Palavra é o que a sacia." },
   
     { apiId:"PRO.30.5",          theme:"Palavra de Deus", ref:"Provérbios 30:5",
       ctx:"Toda palavra de Deus é pura, é escudo para os que nele confiam. Pura — sem mistura de erro, sem impureza de motivo. A Palavra de Deus não precisa de correção nem de atualização. Ela resiste ao teste do tempo porque vem de quem está acima do tempo. E quem confia nela tem proteção que vai além do que os olhos enxergam." },
   
     /* ── 24. FAMÍLIA (12) ── */
     { apiId:"JOS.24.15",         theme:"Família",   ref:"Josué 24:15",
       ctx:"Josué faz sua declaração pública no final da vida: quanto a mim e à minha casa, serviremos ao Senhor. Liderança familiar começa com posição clara de quem é o Senhor da casa. Não como ditadura religiosa — como compromisso de vida. Quando o líder declara publicamente a quem serve, dá direção a toda a família." },
   
     { apiId:"PRO.22.6",          theme:"Família",   ref:"Provérbios 22:6",
       ctx:"Instrua o menino no caminho em que deve andar — e quando envelhecer não se desviará dele. A palavra 'instrua' carrega a ideia de dedicação. A instrução que fica não é só o que foi ensinado na sala de aula dominical — é o que foi demonstrado na vida diária, no jeito de tratar as pessoas, no modo de falar de Deus." },
   
     { apiId:"EPH.6.4",           theme:"Família",   ref:"Efésios 6:4",
       ctx:"Paulo instrui os pais: não irritem seus filhos, mas criem-nos na disciplina e na admonição do Senhor. Dois lados: o que não fazer — não provocar — e o que fazer — criar com intencionalidade espiritual. A pedagogia cristã combina limite com amor, disciplina com instrução. Não é uma, nem a outra — é as duas juntas." },
   
     { apiId:"DEU.6.6-DEU.6.7",   theme:"Família",   ref:"Deuteronômio 6:6-7",
       ctx:"A fé transmitida às gerações seguintes não é programa formal — é conversa integrada à vida. Quando você senta em casa, quando anda pelo caminho, quando deita, quando levanta. A instrução espiritual mais eficaz não é o que acontece no culto de domingo — é o que acontece na cozinha, no carro, nas decisões diárias." },
   
     { apiId:"PSA.127.3",         theme:"Família",   ref:"Salmos 127:3",
       ctx:"Filhos são herança do Senhor, o fruto do ventre é a Sua recompensa. Seus filhos não são sua propriedade — são herança confiada por Deus. Isso muda completamente como você pensa a paternidade e a maternidade. Você não está criando para si — está cuidando do que pertence a Deus e que Ele confiou a você." },
   
     { apiId:"RUT.1.16",          theme:"Família",   ref:"Rute 1:16",
       ctx:"Rute diz a Noemi: onde você for, eu irei; onde você pousar, eu pousarei; o seu povo é o meu povo e o seu Deus é o meu Deus. Uma moabita escolhendo a sogra viúva e empobrecida. Esse é um dos retratos mais belos de lealdade familiar na Bíblia — e Rute se torna ancestral de Jesus. A fidelidade tem consequências eternas." },
   
     { apiId:"COL.3.18-COL.3.19", theme:"Família",   ref:"Colossenses 3:18-19",
       ctx:"Paulo instrui os dois lados do casamento. A submissão da esposa tem um qualificador: como convém no Senhor. E o mandamento ao marido é mais exigente do que parece: amai vossas mulheres e não as trateis com aspereza. Amor ativo e ausência de dureza. O padrão para o marido cristão é o amor de Cristo pela Igreja." },
   
     { apiId:"PRO.31.25",         theme:"Família",   ref:"Provérbios 31:25",
       ctx:"A mulher descrita em Provérbios 31 é revestida de força e de glória, e ri-se do dia de amanhã. Essa confiança não é ingenuidade — é resultado de uma vida bem construída e uma fé real. Ela pode rir do futuro porque sabe que está nas mãos de Deus. Isso é a mulher que a Bíblia valoriza." },
   
     { apiId:"EPH.5.25",          theme:"Família",   ref:"Efésios 5:25",
       ctx:"Maridos, amai vossas mulheres assim como Cristo amou a Igreja e a Si mesmo se entregou por ela. O padrão do amor conjugal cristão é a Cruz. Não um sentimento romântico que vai e vem — uma entrega que persiste quando é difícil, quando não é recíproca, quando custa. Esse é o amor que o marido cristão é chamado a ter." },
   
     { apiId:"GEN.2.24",          theme:"Família",   ref:"Gênesis 2:24",
       ctx:"Por isso, deixará o homem o pai e a mãe e se unirá à sua mulher, e serão ambos uma só carne. Jesus citou esse versículo como fundamento da indissolubilidade do casamento. O casamento cria uma nova unidade — uma carne — que tem precedência sobre qualquer outra lealdade. É a aliança humana mais profunda que existe." },
   
     { apiId:"PSA.78.4",          theme:"Família",   ref:"Salmos 78:4",
       ctx:"Não esconderemos de nossos filhos os louvores do Senhor e a Sua força. Contar às gerações seguintes o que Deus fez não é opcional — é missão familiar. Seu testemunho pessoal de como Deus agiu na sua vida é o patrimônio mais valioso que você pode deixar para seus filhos. Eles precisam ouvir isso de você." },
   
     { apiId:"MAL.4.6",           theme:"Família",   ref:"Malaquias 4:6",
       ctx:"As últimas palavras do Antigo Testamento antes de 400 anos de silêncio: Ele voltará o coração dos pais para os filhos e o coração dos filhos para os pais. A ruptura geracional é uma das marcas do pecado. E a restauração começa em casa — corações reconciliados entre gerações. Lucas aplica isso a João Batista preparando o caminho de Jesus." },
   
     /* ── 25. IDENTIDADE (12) ── */
     { apiId:"PSA.139.13-PSA.139.14", theme:"Identidade", ref:"Salmos 139:13-14",
       ctx:"Tu me fizeste de modo assombroso e maravilhoso. Você não foi resultado de um processo impessoal. Deus formou cada detalhe de você com intenção. Antes de você saber o seu nome, Deus te conhecia. Isso não é autoestima baseada em realizações — é identidade baseada em quem te criou e por que te fez." },
   
     { apiId:"GAL.3.28",          theme:"Identidade", ref:"Gálatas 3:28",
       ctx:"Em Cristo não há judeu nem grego, não há escravo nem livre, não há homem nem mulher — porque todos vocês são um em Cristo Jesus. A identidade mais profunda não é etnia, não é status social, não é gênero. É Cristo. Isso não apaga as diferenças — impede que elas criem hierarquia entre os filhos de Deus." },
   
     { apiId:"1JN.3.1",           theme:"Identidade", ref:"1 João 3:1",
       ctx:"Vejam que grande amor o Pai nos deu — que formos chamados filhos de Deus. E somos. João se espanta com isso. Não é título honorário. É realidade ontológica. Você é filho de Deus não por mérito — por amor. E João acrescenta: e somos. Presente. Agora. Não no futuro — agora." },
   
     { apiId:"COL.1.13-COL.1.14", theme:"Identidade", ref:"Colossenses 1:13-14",
       ctx:"Deus nos trasladou do poder das trevas e nos transportou para o reino do Filho do Seu amor. Você não melhorou de reino — foi transferido. Não reformado — realocado. Sua identidade não é mais definida pelo que você era antes. Você pertence ao reino de Cristo. Isso muda tudo sobre quem você é." },
   
     { apiId:"2CO.5.17",          theme:"Identidade", ref:"2 Coríntios 5:17",
       ctx:"Se alguém está em Cristo, é uma nova criação. As coisas antigas já passaram — eis que tudo se fez novo. Isso não é motivação de autoajuda — é declaração teológica. Você não é uma versão melhorada do que era. Você é criação nova. A identidade antiga não define mais quem você é. Cristo define." },
   
     { apiId:"ROM.8.16",          theme:"Identidade", ref:"Romanos 8:16",
       ctx:"O próprio Espírito testifica com o nosso espírito que somos filhos de Deus. A certeza da sua identidade como filho não vem de argumento ou raciocínio — vem do testemunho interno do Espírito Santo. Quando você ora e sente no coração que está falando com um Pai, isso é o Espírito confirmando quem você é." },
   
     { apiId:"EPH.1.4",           theme:"Identidade", ref:"Efésios 1:4",
       ctx:"Deus nos elegeu em Cristo antes da fundação do mundo. Antes de o mundo existir, antes de você existir, Deus pensou em você e escolheu você. Sua identidade não começa no seu nascimento — começa na eternidade de Deus. Isso é maior do que qualquer rótulo que o mundo colocou em você." },
   
     { apiId:"JER.31.3",          theme:"Identidade", ref:"Jeremias 31:3",
       ctx:"Deus fala com intensidade pessoal surpreendente: Eu te amei com amor eterno, por isso te atraí com benignidade. O amor de Deus por você não começou quando você respondeu a Ele — é eterno. Anterior à sua existência. E esse amor que veio primeiro continua atraindo, continuamente, com gentileza." },
   
     { apiId:"1PE.2.9",           theme:"Identidade", ref:"1 Pedro 2:9",
       ctx:"Mas vocês são raça eleita, sacerdócio real, nação santa, povo adquirido. Pedro aplica quatro títulos que eram de Israel no Antigo Testamento a crentes gentios. Você não é cidadão de segunda classe no reino de Deus. Você é eleito, é sacerdote, é santo, foi comprado. Essa é a sua identidade — não o que o mundo diz sobre você." },
   
     { apiId:"EPH.1.11",          theme:"Identidade", ref:"Efésios 1:11",
       ctx:"Em Cristo fomos feitos herança — porção herdada por Deus. Não apenas você herda Deus. Deus te possui como Sua herança. Você é o que Deus escolheu ter, valorizar, preservar para sempre. Isso não é linguagem de escravo — é linguagem de tesouro. Você é o tesouro de Deus." },
   
     { apiId:"ROM.8.1",           theme:"Identidade", ref:"Romanos 8:1",
       ctx:"Nenhuma condenação há para os que estão em Cristo Jesus. Nenhuma. Não 'pouca condenação'. Não 'menos condenação'. Nenhuma. Isso é um veredicto legal permanente pronunciado sobre você. Você não está no banco dos réus. Em Cristo, o processo acabou com absolvição total." },
   
     { apiId:"JHN.15.15",         theme:"Identidade", ref:"João 15:15",
       ctx:"Jesus muda o vocabulário com os discípulos: já não vos chamo servos — chamo-vos amigos. Amigos do Rei têm acesso privilegiado ao que está nos planos do Rei. Jesus compartilhou com os discípulos o que ouviu do Pai. Você não é apenas servo que obedece — é amigo que conhece o coração d'Ele." },
   
     /* ── 26. MISSÃO (12) ── */
     { apiId:"MAT.28.19-MAT.28.20", theme:"Missão", ref:"Mateus 28:19-20",
       ctx:"Jesus encerra o Evangelho de Mateus com toda a autoridade proclamada — e então dá o mandato: ide, fazei discípulos de todas as nações. A missão não é opcional nem é de alguns especialistas — é de todos os que O seguem. E a promessa que a acompanha: eis que estou convosco todos os dias. Você não vai sozinho." },
   
     { apiId:"ACT.1.8",           theme:"Missão",    ref:"Atos 1:8",
       ctx:"Você receberá poder quando o Espírito Santo vier sobre vocês, e serão Minhas testemunhas. O poder da missão não é talento natural nem treinamento — é o Espírito Santo. E o alcance é concêntrico: Jerusalém, Judeia, Samaria, até os confins da terra. O evangelho não para — ele se expande em ondas." },
   
     { apiId:"2CO.5.20",          theme:"Missão",    ref:"2 Coríntios 5:20",
       ctx:"Somos embaixadores em nome de Cristo — como se Deus exortasse por nosso meio. Um embaixador representa o seu país onde está. Você representa o Reino de Deus onde você está. E a mensagem que você carrega é a mais urgente que existe: sejam reconciliados com Deus. É um convite, não uma acusação." },
   
     { apiId:"MRK.16.15",         theme:"Missão",    ref:"Marcos 16:15",
       ctx:"Ide por todo o mundo e pregai o evangelho a toda criatura. A missão não tem fronteira nem exceção. Todo o mundo. Toda criatura. Nenhuma barreira cultural, geográfica ou social limita o alcance do evangelho. E o evangelho é para todo ser humano — porque todo ser humano foi criado por Deus e precisa de reconciliação com Ele." },
   
     { apiId:"PRO.11.30",         theme:"Missão",    ref:"Provérbios 11:30",
       ctx:"O fruto do justo é árvore de vida, e o que ganha almas é sábio. A missão mais eficaz não começa com programa evangelístico — começa com uma vida justa que produz fruto visível. Uma vida que faz as pessoas perguntarem o que você tem. Quando a sua vida é árvore de vida, as pessoas se aproximam naturalmente." },
   
     { apiId:"LUK.24.47",         theme:"Missão",    ref:"Lucas 24:47",
       ctx:"Jesus instrui: seria pregado o arrependimento para remissão dos pecados a todas as nações — começando por Jerusalém. A missão começa onde você está. Não quando você tiver tudo certo, não quando chegar ao campo missionário. Começa onde você está hoje, com as pessoas ao seu redor." },
   
     { apiId:"ROM.10.14",         theme:"Missão",    ref:"Romanos 10:14",
       ctx:"Paulo constrói a lógica da missão de trás para frente: invocar depende de crer, crer depende de ouvir, ouvir depende de alguém pregar. A missão não é atividade extra — é elo essencial entre o Deus que salva e o ser humano que precisa de salvação. Sem alguém indo, alguém pregando — a corrente quebra." },
   
     { apiId:"ISA.52.7",          theme:"Missão",    ref:"Isaías 52:7",
       ctx:"Quão formosos sobre os montes são os pés do que anuncia boas novas! Paulo cita isso em Romanos para mostrar que os pregadores do evangelho estão cumprindo a profecia de Isaías. Anunciar boas novas de paz, de salvação, de que Deus reina — isso é o que torna os pés do mensageiro formosos aos olhos de Deus." },
   
     { apiId:"MAT.5.14",          theme:"Missão",    ref:"Mateus 5:14",
       ctx:"Vós sois a luz do mundo. Jesus não diz: tornem-se luz. Diz: vocês são. A identidade missionária precede o mandato. Você não precisa se tornar missionário — você é luz. A pergunta não é se vai brilhar. É se vai remover o que está bloqueando a luz que já está em você." },
   
     { apiId:"EZK.33.11",         theme:"Missão",    ref:"Ezequiel 33:11",
       ctx:"Deus declara com um juramento: não tenho prazer na morte do ímpio, mas em que o ímpio se converta do seu caminho e viva. Esse é o coração de Deus por quem está longe. Ele não está esperando para julgar — está esperando para receber. A missão reflete o desejo de Deus, não a nossa obrigação religiosa." },
   
     { apiId:"JHN.20.21",         theme:"Missão",    ref:"João 20:21",
       ctx:"Jesus diz: assim como o Pai Me enviou, Eu também vos envio. A missão dos discípulos é modelada pela missão do Filho — que saiu do céu, se tornou humano, viveu entre as pessoas, as serviu com autoridade. O modelo da encarnação é o modelo da missão. Entrar no mundo das pessoas, não convidá-las para o seu mundo." },
   
     { apiId:"1CO.9.22",          theme:"Missão",    ref:"1 Coríntios 9:22",
       ctx:"Paulo se fez tudo para todos, para por todos os meios salvar alguns. Ele não abandona o evangelho — mas abandona preferências pessoais para chegar onde as pessoas estão. A mensagem é inflexível. O método é adaptável. Isso é sabedoria missionária: não mudar o que você tem a dizer, mas mudar como você diz para quem precisa ouvir." },
   
     /* ── 27. CRIAÇÃO (12) ── */
     { apiId:"GEN.1.1",           theme:"Criação",   ref:"Gênesis 1:1",
       ctx:"No princípio, Deus criou os céus e a terra. Dez palavras em hebraico que fundamentam a cosmovisão cristã: o universo tem um criador pessoal. Não é eterno, não é divino em si mesmo — foi criado por Alguém que existia antes d'ele e que existe além d'ele. Isso tem implicações para tudo — ciência, ética, identidade, propósito." },
   
     { apiId:"PSA.19.1",          theme:"Criação",   ref:"Salmos 19:1",
       ctx:"Os céus proclamam a glória de Deus, e o firmamento anuncia a obra das Suas mãos. A criação é discurso de Deus — eloquência sem palavras. Quando você olha para um céu estrelado, um oceano, uma montanha, você está lendo a linguagem de Deus sobre Si mesmo. A beleza do cosmos é evidência do Criador." },
   
     { apiId:"JHN.1.3",           theme:"Criação",   ref:"João 1:3",
       ctx:"Todas as coisas foram feitas por intermédio d'Ele, e sem Ele nada do que foi feito se fez. João apresenta Jesus como o agente da criação. Não apenas Salvador — Criador. Isso significa que a mesma inteligência que projetou o DNA e as estrelas é a que entrou na história para redimir o que havia sido quebrado." },
   
     { apiId:"COL.1.16-COL.1.17", theme:"Criação",   ref:"Colossenses 1:16-17",
       ctx:"Nele foram criadas todas as coisas, e Ele é antes de todas as coisas, e todas as coisas subsistem por Ele. Três relacionamentos: Cristo como origem, como prioridade e como sustentação da criação. O universo não está se sustentando sozinho — está sendo sustentado ativamente por Cristo a cada momento." },
   
     { apiId:"PSA.24.1",          theme:"Criação",   ref:"Salmos 24:1",
       ctx:"Do Senhor é a terra e a sua plenitude. Tudo o que existe pertence ao Criador. Isso muda radicalmente como você enxerga suas posses, seu dinheiro, seus dons. Você não é dono — é mordomia. Cuida do que pertence a Deus. E quem administra bem o que é de Deus recebe mais para administrar." },
   
     { apiId:"REV.4.11",          theme:"Criação",   ref:"Apocalipse 4:11",
       ctx:"Digno és, Senhor, de receber a glória e a honra e o poder, porque Tu criaste todas as coisas, e por Tua vontade existem e foram criadas. No céu, o louvor à criação é contínuo. Porque existir é resultado da vontade de Deus. Cada coisa que existe — incluindo você — é expressão do querer de Deus." },
   
     { apiId:"ISA.40.28",         theme:"Criação",   ref:"Isaías 40:28",
       ctx:"O Deus eterno, o Criador dos fins da terra, não se cansa, nem se fatiga. Isaías faz isso para encorajar o povo exilado que estava exausto. O Criador do universo não tem limite de energia. Ele não fica cansado de você. Não fica sobrecarregado com os seus pedidos. Sua necessidade não esgota a capacidade d'Ele." },
   
     { apiId:"GEN.2.7",           theme:"Criação",   ref:"Gênesis 2:7",
       ctx:"O Senhor Deus formou o homem do pó da terra e soprou nas suas narinas o fôlego de vida. Dois materiais: pó e sopro divino. Você é ao mesmo tempo humilde — vem do chão — e precioso — tem o fôlego de Deus. Nenhuma outra criatura recebeu o sopro pessoal de Deus. Você é a obra mais íntima da criação." },
   
     { apiId:"ROM.1.20",          theme:"Criação",   ref:"Romanos 1:20",
       ctx:"Os atributos invisíveis de Deus, desde a criação do mundo, claramente se veem nas coisas criadas. A criação é argumento. Não salva — mas revela. O universo funciona como evidência do poder eterno e da divindade de Deus. Paulo diz que isso é suficiente para que ninguém alegue ignorância total sobre Deus." },
   
     { apiId:"PSA.33.6",          theme:"Criação",   ref:"Salmos 33:6",
       ctx:"Pela palavra do Senhor foram feitos os céus — pelo sopro da Sua boca, todo o exército deles. Deus não lutou para criar. Não suou, não se esforçou — falou. A mesma voz que trouxe o universo à existência fala à sua vida hoje. A Palavra de Deus tem poder criativo. Ela pode criar o que ainda não existe em você." },
   
     { apiId:"JER.32.17",         theme:"Criação",   ref:"Jeremias 32:17",
       ctx:"Jeremias ora enquanto a Babilônia cerca Jerusalém — e compra um terreno. Parece loucura. Mas ele ancora a fé no fundamento mais sólido possível: Tu fizeste o céu e a terra com o Teu grande poder — nada Te é impossível. Quando a situação parece sem saída, volte ao Criador. Quem criou do nada pode criar saída onde não existe." },
   
     { apiId:"2CO.5.17",          theme:"Criação",   ref:"2 Coríntios 5:17",
       ctx:"Se alguém está em Cristo, é uma nova criação. Paulo usa a mesma linguagem de Gênesis — criação. A conversão não é reforma, não é melhoria — é nova criação. O mesmo poder que Deus usou para criar o universo é usado na transformação de uma vida. Cada conversão é um ato criativo de Deus." },
   
     /* ── 28. TEMOR DE DEUS (12) ── */
     { apiId:"PRO.9.10",          theme:"Temor de Deus", ref:"Provérbios 9:10",
       ctx:"O temor do Senhor é o princípio da sabedoria. Não a educação, não a experiência — o temor do Senhor. Isso não é medo servil de ser punido. É reverência profunda a quem Deus é — Seu caráter, Sua santidade, Seu poder. Quando você enxerga Deus como Ele é, tudo mais se reposiciona. Essa é a fundação da sabedoria." },
   
     { apiId:"ECC.12.13",         theme:"Temor de Deus", ref:"Eclesiastes 12:13",
       ctx:"Ao fim de toda a investigação, o pregador chega à conclusão mais simples: teme a Deus e guarda os Seus mandamentos — porque isso é o dever de todo o homem. Não a filosofia mais elaborada, não a teologia mais sofisticada. No final, é isso. A vida mais sábia é a mais simples: teme a Deus." },
   
     { apiId:"PSA.111.10",        theme:"Temor de Deus", ref:"Salmos 111:10",
       ctx:"O temor do Senhor é o princípio da sabedoria. Todos os que o praticam têm bom entendimento. 'Praticam' — não apenas conceituam. O temor que gera sabedoria não é crença abstrata sobre Deus. É reverência vivida, que orienta as escolhas diárias. Entendimento não é só intelectual — é a sabedoria de quem vive bem." },
   
     { apiId:"ACT.9.31",          theme:"Temor de Deus", ref:"Atos 9:31",
       ctx:"A Igreja primitiva crescia andando no temor do Senhor e no conforto do Espírito Santo. O crescimento não veio de estratégia de marketing ou programa inovador — veio de duas coisas: reverência a Deus e encorajamento do Espírito. O temor do Senhor não trava a Igreja — ela a ordena e a fortalece." },
   
     { apiId:"PSA.34.7",          theme:"Temor de Deus", ref:"Salmos 34:7",
       ctx:"O anjo do Senhor se aquartela em derredor dos que O temem e os livra. O temor de Deus não deixa você exposto — atrai proteção. A reverência a Deus tem implicação prática: quem coloca Deus no centro da vida tem em volta de si o cuidado de Deus. Temer a Deus é a postura mais segura que existe." },
   
     { apiId:"ISA.8.13",          theme:"Temor de Deus", ref:"Isaías 8:13",
       ctx:"Ao Senhor dos Exércitos, a este santificai; a ele, o vosso temor e o vosso espanto. Isaías fala a uma nação aterrorizada com ameaças políticas. O remédio não é coragem humana — é redirecionar o medo. Quando você aprende a temer a Deus genuinamente, os outros medos começam a perder o poder sobre você." },
   
     { apiId:"REV.14.7",          theme:"Temor de Deus", ref:"Apocalipse 14:7",
       ctx:"O anjo anuncia: temei a Deus e dai-lhe glória, porque chegou a hora do Seu julgamento. O temor de Deus no contexto do juízo não é pânico — é reconhecimento correto da realidade: Deus é o Criador soberano, e toda criatura presta contas a Ele. Quem teme a Deus não é surpreendido pelo Seu julgamento." },
   
     { apiId:"MAT.10.28",         theme:"Temor de Deus", ref:"Mateus 10:28",
       ctx:"Jesus ensina uma hierarquia de medos: não temais os que matam o corpo, mas temei a Deus. O medo dos homens paralisa. O temor de Deus liberta — porque quem já teme ao maior não precisa temer os menores da mesma forma. O temor de Deus é o antídoto para o medo humano." },
   
     { apiId:"PSA.86.11",         theme:"Temor de Deus", ref:"Salmos 86:11",
       ctx:"Davi ora: une o meu coração ao temor do Teu nome. Um coração dividido entre Deus e outros senhores não tem paz nem direção. O temor do nome de Deus é o princípio unificador — quando Deus é o centro, toda a vida encontra coerência. Essa é a oração de quem quer parar de viver fragmentado." },
   
     { apiId:"HEB.12.28-HEB.12.29", theme:"Temor de Deus", ref:"Hebreus 12:28-29",
       ctx:"Recebendo um reino que não pode ser abalado, sirvamos a Deus agradavelmente, com reverência e piedoso temor, porque o nosso Deus é um fogo consumidor. Graça e temor não são opostos — são complementos. A graça que salva dirige a um Deus que ainda é fogo consumidor. O temor cristão é reverência de filho — não terror de escravo." },
   
     { apiId:"LEV.19.14",         theme:"Temor de Deus", ref:"Levítico 19:14",
       ctx:"Não amaldiçoarás ao surdo, nem porás tropeço diante do cego — mas temerás ao teu Deus. Deus é a testemunha que o surdo não ouve e o cego não vê. O temor de Deus preenche a lacuna onde a supervisão humana não alcança. Você age corretamente com o vulnerável não porque alguém está vendo — porque Deus está." },
   
     { apiId:"PRO.14.26-PRO.14.27", theme:"Temor de Deus", ref:"Provérbios 14:26-27",
       ctx:"No temor do Senhor há forte confiança, e ele será refúgio para os seus filhos. O temor do Senhor é fonte de vida. O temor de Deus não apenas protege você — protege seus filhos. E é fonte de vida — como nascente em terra árida, que sustenta tudo ao redor. Quem tem o temor de Deus tem uma fonte que não seca." },
   
     /* ── 29. ETERNIDADE (12) ── */
     { apiId:"JHN.3.16",          theme:"Eternidade", ref:"João 3:16",
       ctx:"Deus amou o mundo de tal maneira que deu o Seu Filho, para que todo aquele que n'Ele crê não pereça, mas tenha a vida eterna. A vida eterna não é apenas duração infinita — é uma qualidade de vida que pertence ao mundo de Deus. Ela começa quando você crê, não quando você morre. A eternidade entra na sua vida agora." },
   
     { apiId:"ROM.8.38-ROM.8.39", theme:"Eternidade", ref:"Romanos 8:38-39",
       ctx:"Paulo lista tudo que poderia separar o crente do amor de Deus — e conclui: nada. Nem morte, nem vida, nem poder algum em toda a criação. A relação com Deus que começa aqui não termina em nenhum ponto do futuro. A eternidade do amor de Deus é a base de toda esperança eterna." },
   
     { apiId:"REV.22.20",         theme:"Eternidade", ref:"Apocalipse 22:20",
       ctx:"Últimas palavras de Jesus na Bíblia: certamente, venho em breve. E a resposta da Igreja: Amém, vem, Senhor Jesus. A eternidade não é destino vago no futuro — é um encontro aguardado com uma Pessoa. Toda a história caminha para esse momento. O crente vive com essa expectativa ativa, não apenas passiva." },
   
     { apiId:"PSA.90.2",          theme:"Eternidade", ref:"Salmos 90:2",
       ctx:"Antes que os montes nascessem, de eternidade a eternidade, Tu és Deus. Moisés contempla a eternidade de Deus contra a brevidade da vida humana. Deus não entrou no tempo — o tempo entrou em Deus. Ele existia antes de tudo e existirá além de tudo. Sua permanência é o fundamento mais seguro que existe." },
   
     { apiId:"MAT.25.46",         theme:"Eternidade", ref:"Mateus 25:46",
       ctx:"Jesus usa a mesma palavra — eterno — para descrever tanto o castigo quanto a vida dos justos. A eternidade é real dos dois lados. Isso dá peso às escolhas presentes. A vida que você vive hoje tem consequências que vão muito além do tempo que você tem aqui. A eternidade começa na escolha que você faz agora." },
   
     { apiId:"2CO.4.18",          theme:"Eternidade", ref:"2 Coríntios 4:18",
       ctx:"As coisas que se veem são temporais; as que não se veem são eternas. Paulo convida a um reajuste de foco: olhe para o que não muda. Não negar o que é visível — mas não deixar o temporário ser mais pesado do que o eterno. A sabedoria da eternidade muda o que você prioriza hoje." },
   
     { apiId:"1JN.2.17",          theme:"Eternidade", ref:"1 João 2:17",
       ctx:"O mundo passa, e a sua concupiscência; mas aquele que faz a vontade de Deus permanece para sempre. Tudo o que o mundo oferece tem prazo de validade. A vontade de Deus não tem. Quem constrói a vida sobre o que Deus quer está construindo sobre o único fundamento que não será demolido." },
   
     { apiId:"HEB.13.8",          theme:"Eternidade", ref:"Hebreus 13:8",
       ctx:"Jesus Cristo é o mesmo ontem, e hoje, e eternamente. O escritor diz isso no contexto de líderes que morreram — a mudança é real. Mas Jesus não muda. Em um mundo de instabilidade total, Ele é o ponto fixo. A sua fé não está depositada numa instituição que pode falhar ou numa pessoa que pode mudar. Está em Quem é eterno." },
   
     { apiId:"PSA.103.17",        theme:"Eternidade", ref:"Salmos 103:17",
       ctx:"A misericórdia do Senhor é desde a eternidade até a eternidade para com os que O temem. O amor fiel de Deus existia antes de você e existirá depois. Não é sentimento oscilante — tem dimensão eterna e cobertura geracional. A misericórdia que recebeu hoje é a mesma que o fará chegar ao destino eterno." },
   
     { apiId:"ISA.57.15",         theme:"Eternidade", ref:"Isaías 57:15",
       ctx:"O Alto e o Sublime que habita a eternidade — Ele também habita com o contrito e abatido de espírito. O paradoxo mais surpreendente: Deus infinito e eterno se aproxima especificamente do que é pequeno e quebrado. Sua grandeza não O afasta de você — ela faz com que Ele possa se aproximar sem ser destruidor." },
   
     { apiId:"JHN.17.3",          theme:"Eternidade", ref:"João 17:3",
       ctx:"A vida eterna é esta: que te conheçam a Ti, o único Deus verdadeiro, e a Jesus Cristo, a quem enviaste. Jesus define a vida eterna não como lugar — como relacionamento. Conhecer Deus. Não conhecer sobre Ele — conhecer a Ele. A eternidade é esse relacionamento crescendo sem limite por tempo infinito." },
   
     { apiId:"ECC.3.11",          theme:"Eternidade", ref:"Eclesiastes 3:11",
       ctx:"Deus pôs a eternidade no coração do homem. Por isso nenhum prazer finito satisfaz completamente. Há uma inquietação que não vai embora enquanto você não está em Deus — porque você foi feito para algo que transcende o tempo. A saudade do eterno que você sente é evidência de que foi criado para mais do que isso aqui." },
   
     /* ── 30. MISERICÓRDIA (12) ── */
     { apiId:"PSA.103.8",         theme:"Misericórdia", ref:"Salmos 103:8",
       ctx:"O Senhor é misericordioso e piedoso, longânimo e grande em benignidade. Esse é o credo mais antigo sobre o caráter de Deus — pronunciado por Ele mesmo a Moisés no Sinai. 'Lento para a ira' — ao contrário da impaciência humana. A misericórdia não é exceção ao caráter de Deus. É o centro d'Ele." },
   
     { apiId:"LAM.3.22-LAM.3.23", theme:"Misericórdia", ref:"Lamentações 3:22-23",
       ctx:"Do livro mais trágico do Antigo Testamento vem uma das promessas mais poderosas: as misericórdias do Senhor se renovam a cada manhã. O escritor está entre as ruínas de Jerusalém. E mesmo aí ele encontra razão para esperança. A misericórdia de Deus não é capital finito que se esgota. Cada manhã é recomeço garantido." },
   
     { apiId:"MAT.5.7",           theme:"Misericórdia", ref:"Mateus 5:7",
       ctx:"Bem-aventurados os misericordiosos, porque eles alcançarão misericórdia. A misericórdia cria um ciclo: quem a pratica recebe mais. Não como transação — como princípio do reino. Quando você escolhe misericórdia onde poderia escolher julgamento, você está sintonizando sua vida com o coração de Deus." },
   
     { apiId:"TIT.3.5",           theme:"Misericórdia", ref:"Tito 3:5",
       ctx:"Deus nos salvou não pelas obras de justiça que fizemos, mas segundo a Sua misericórdia. A salvação não é calculada pelo que você fez — é medida pela generosidade de Deus. A misericórdia precede e supera toda contabilidade moral. Isso não é permissão para o pecado — é motivação para a gratidão." },
   
     { apiId:"LUK.10.37",         theme:"Misericórdia", ref:"Lucas 10:37",
       ctx:"Na parábola do bom samaritano, Jesus pergunta: quem foi próximo? E a resposta é: o que usou de misericórdia. E então: vai e faz o mesmo. A misericórdia cristã não é sentimento — é ação. Não é compaixão à distância — é ir, parar, cuidar. Jesus usa o verbo mais prático do Evangelho: vai e faz." },
   
     { apiId:"MIC.6.8",           theme:"Misericórdia", ref:"Miqueias 6:8",
       ctx:"Deus pede três coisas: praticar a justiça, amar a misericórdia e andar humildemente. 'Amar a misericórdia' — não apenas praticá-la por obrigação, mas amá-la. Quando você ama a misericórdia, não precisa ser lembrado de praticá-la. Ela vira instinto de quem foi transformado pelo amor de Deus." },
   
     { apiId:"EXO.34.6-EXO.34.7", theme:"Misericórdia", ref:"Êxodo 34:6-7",
       ctx:"Deus se revela a Moisés após o pecado do bezerro de ouro — o pior momento da história de Israel. E o que Ele revela? Que é compassivo, piedoso, longânimo, grande em misericórdia e fidelidade. No momento de máxima ruptura, Deus aparece com Sua identidade mais fundamental: misericórdia. Esse credo é repetido mais de 20 vezes no Antigo Testamento." },
   
     { apiId:"EPH.2.4-EPH.2.5",   theme:"Misericórdia", ref:"Efésios 2:4-5",
       ctx:"Mas Deus, sendo rico em misericórdia, pelo Seu grande amor com que nos amou, mesmo quando estávamos mortos em nossas transgressões, nos deu vida juntamente com Cristo. A misericórdia age no pior momento — não quando você melhorou, não quando fez por merecer. Ela age quando você está morto. Isso é misericórdia." },
   
     { apiId:"HEB.4.16",          theme:"Misericórdia", ref:"Hebreus 4:16",
       ctx:"Cheguemos com confiança ao trono da graça, para que misericórdia e graça nos sejam dadas como socorro na hora oportuna. Misericórdia e graça estão disponíveis no trono de Deus — não racionadas, não condicionadas ao merecimento. E na hora certa, não tardia. Aproxime-se. Com confiança, não com medo." },
   
     { apiId:"PSA.136.1",         theme:"Misericórdia", ref:"Salmos 136:1",
       ctx:"Louvai ao Senhor, porque Ele é bom — porque a Sua misericórdia dura para sempre. Essa resposta — a Sua misericórdia dura para sempre — é repetida 26 vezes no mesmo salmo. Não é repetição vazia. É fixação deliberada. Quando essa verdade entra fundo, ela muda como você enfrenta qualquer situação." },
   
     { apiId:"PSA.23.6",          theme:"Misericórdia", ref:"Salmos 23:6",
       ctx:"Bondade e misericórdia me seguirão todos os dias da minha vida. 'Seguirão' no hebraico é um verbo de perseguição — como um predador rastreando uma presa. A misericórdia de Deus não segue passivamente à distância — ela persegue, rastreia, não desiste. A misericórdia de Deus é agressivamente proativa na sua vida." },
   
     { apiId:"ROM.9.15",          theme:"Misericórdia", ref:"Romanos 9:15",
       ctx:"Deus diz: terei misericórdia de quem Me aprazer. A misericórdia é ato livre de Deus — não coagido por mérito, não forçado por demanda. Ela flui do caráter d'Ele, não do desempenho do crente. Isso não é arbitrariedade — é garantia de que a misericórdia de Deus é inesgotável, porque não depende de você." },
   ];
   /* ──────────────────────────────────────────────────────────
   ESTADO DA APLICAÇÃO
   ──────────────────────────────────────────────────────────*/
let currentTheme   = "Todos";
let currentVersion = "41a6caa722a21d88-01";
let pool           = [...verses];
let idx            = 0;
let isLoading      = false;

/* ──────────────────────────────────────────────────────────
   INICIALIZAÇÃO
   ──────────────────────────────────────────────────────────*/
document.addEventListener("DOMContentLoaded", () => {
  populateThemes();
  populateVersions();
  loadDark();
  applyFilter();

  document.getElementById("themeFilter").addEventListener("change", (e) => {
    currentTheme = e.target.value;
    applyFilter();
  });

  document.getElementById("versionSelect").addEventListener("change", (e) => {
    currentVersion = e.target.value;
    show(pool[idx]);
  });
});

/* ──────────────────────────────────────────────────────────
   POPULAR SELETORES
   ──────────────────────────────────────────────────────────*/
function populateThemes() {
  const sel   = document.getElementById("themeFilter");
  const temas = [...new Set(verses.map(v => v.theme))];
  temas.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    sel.appendChild(opt);
  });
}

function populateVersions() {
  const sel = document.getElementById("versionSelect");
  BIBLE_VERSIONS.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.id;
    opt.textContent = v.name;
    sel.appendChild(opt);
  });
}

/* ──────────────────────────────────────────────────────────
   FILTRO E NAVEGAÇÃO
   ──────────────────────────────────────────────────────────*/
function applyFilter() {
  pool = currentTheme === "Todos"
    ? [...verses]
    : verses.filter(v => v.theme === currentTheme);
  idx = 0;
  if (pool.length > 0) show(pool[idx]);
  updateNav();
}

function go(dir) {
  if (pool.length === 0) return;
  idx += dir;
  if (idx < 0)            idx = pool.length - 1;
  if (idx >= pool.length) idx = 0;
  show(pool[idx]);
  updateNav();
}

function goRandom() {
  if (pool.length <= 1) return;
  let newIdx;
  do { newIdx = Math.floor(Math.random() * pool.length); }
  while (newIdx === idx);
  idx = newIdx;
  show(pool[idx]);
  updateNav();
}

/* ──────────────────────────────────────────────────────────
   BUSCAR VERSÍCULO NA API.BIBLE
   ──────────────────────────────────────────────────────────*/
async function fetchVerse(apiId, bibleId) {
  const isPassage = apiId.includes("-");
  const path = isPassage ? `passages/${apiId}` : `verses/${apiId}`;

  const json = await cachedFetch(
    `https://bible-proxy.matheusnevessp50.workers.dev/bibles/${bibleId}/${path}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false`
  );
  return (json.data?.content ?? "").trim();
}

/* ──────────────────────────────────────────────────────────
   EXIBIR VERSÍCULO
   ──────────────────────────────────────────────────────────*/
async function show(item) {
  if (!item || isLoading) return;
  isLoading = true;

  const textEl = document.getElementById("verseText");
  textEl.classList.add("loading");
  textEl.textContent = "Carregando...";

  document.getElementById("verseRef").textContent   = item.ref;
  document.getElementById("verseTheme").textContent = item.theme;
  document.getElementById("verseCtx").textContent   = item.ctx;

  const realDay = verses.findIndex(v => v.apiId === item.apiId && v.theme === item.theme) + 1;
  document.getElementById("dayNum").textContent = realDay;

  try {
    const text = await fetchVerse(item.apiId, currentVersion);
    textEl.textContent = stripQuotes(text);
  } catch (err) {
    console.error("Erro ao buscar versículo:", err);
    textEl.textContent = "Não foi possível carregar o versículo.";
  } finally {
    textEl.classList.remove("loading");
    isLoading = false;
  }
}

/* ──────────────────────────────────────────────────────────
   NAVEGAÇÃO: BARRA DE PROGRESSO
   ──────────────────────────────────────────────────────────*/
function updateNav() {
  if (pool.length === 0) return;
  document.getElementById("navIndex").textContent = `${idx + 1} / ${pool.length}`;
  const pct = ((idx + 1) / pool.length) * 100;
  document.getElementById("progressFill").style.width = `${pct}%`;
}

/* ──────────────────────────────────────────────────────────
   COPIAR VERSÍCULO
   ──────────────────────────────────────────────────────────*/
function copyToClipboard() {
  const txt       = document.getElementById("verseText").textContent;
  const ref       = document.getElementById("verseRef").textContent;
  const formatted = `"${txt}" - ${ref}`;

  navigator.clipboard.writeText(formatted).then(() => {
    const btn    = document.querySelector(".copy-btn");
    const status = document.getElementById("copyStatus");
    btn.classList.add("success");
    status.textContent = "Copiado!";
    setTimeout(() => {
      btn.classList.remove("success");
      status.textContent = "Copiar";
    }, 1800);
  }).catch(err => console.error("Erro ao copiar:", err));
}

/* ──────────────────────────────────────────────────────────
   MODO ESCURO / CLARO
   ──────────────────────────────────────────────────────────*/
function toggleDark() {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  document.getElementById("modeIcon").textContent = isLight ? "☀" : "☽";
  localStorage.setItem("devocional-mode", isLight ? "light" : "dark");
}

function loadDark() {
  const saved = localStorage.getItem("devocional-mode");
  if (saved === "light") {
    document.body.classList.add("light");
    document.getElementById("modeIcon").textContent = "☀";
  } else {
    document.body.classList.remove("light");
    document.getElementById("modeIcon").textContent = "☽";
  }
}

/* ──────────────────────────────────────────────────────────
   MODAL — LER CAPÍTULO COMPLETO (contexto do versículo)
   ──────────────────────────────────────────────────────────*/
let contextBook      = "JHN";
let contextChapter   = 3;
let contextHighVerse = null;

async function openContextModal() {
  const item = pool[idx];
  if (!item) return;

  const baseId = item.apiId.includes("-") ? item.apiId.split("-")[0] : item.apiId;
  const parts  = baseId.split(".");

  contextBook      = parts[0];
  contextChapter   = parseInt(parts[1]) || 1;
  contextHighVerse = baseId;

  document.getElementById("contextModal").classList.add("open");
  await loadContextChapter();
}

async function loadContextChapter() {
  const chapterId = `${contextBook}.${contextChapter}`;
  const body      = document.getElementById("contextBody");
  const title     = document.getElementById("contextTitle");

  title.textContent = `Capítulo ${contextChapter}`;
  document.getElementById("contextChapterLabel").textContent = `Cap. ${contextChapter}`;
  document.getElementById("contextPrev").disabled = contextChapter <= 1;
  document.getElementById("contextNext").disabled = true;

  body.innerHTML = `<div class="modal-loading">Carregando capítulo...</div>`;

  try {
    const url = `https://bible-proxy.matheusnevessp50.workers.dev/bibles/${currentVersion}/chapters/${chapterId}?content-type=json&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true`;
    const json = await cachedFetch(url);

    document.getElementById("contextNext").disabled = !json.data.next;
    renderChapter(json.data, contextHighVerse, body);
  } catch(e) {
    body.innerHTML = `<p class="modal-error">Não foi possível carregar o capítulo.</p>`;
  }
}

function contextGo(dir) {
  contextChapter += dir;
  if (contextChapter < 1) contextChapter = 1;
  contextHighVerse = null;
  loadContextChapter();
}

function closeContextModal() {
  document.getElementById("contextModal").classList.remove("open");
}

/* ──────────────────────────────────────────────────────────
   RENDER CAPÍTULO
   ──────────────────────────────────────────────────────────*/
function renderChapter(chapterData, highlightId, container) {
  const items    = chapterData.content || [];
  const verseMap = {};

  function flatText(nodes) {
    if (!nodes) return "";
    if (typeof nodes === "string") return nodes;
    return nodes.map(n => {
      if (typeof n === "string") return n;
      if (n.type === "text" && n.text) return n.text;
      if (n.items) return flatText(n.items);
      return "";
    }).join("");
  }

  function collectVerses(nodes) {
    if (!Array.isArray(nodes)) return;
    for (const node of nodes) {
      if (node.name === "verse-span" && node.attrs?.verseId) {
        const vid = node.attrs.verseId;
        verseMap[vid] = (verseMap[vid] || "") + flatText(node.items);
      } else if (node.items) {
        collectVerses(node.items);
      }
    }
  }

  collectVerses(items);

  const entries = Object.entries(verseMap);

  if (entries.length === 0) {
    container.innerHTML = `<p style="color:var(--text-secondary);line-height:1.9">${chapterData.content ?? ""}</p>`;
    return;
  }

  const html = entries.map(([vid, text]) => {
    const verseNum    = vid.split(".")[2] || "";
    const isHighlight = highlightId && vid === highlightId;
    return `
      <div class="chapter-verse ${isHighlight ? "verse-highlight" : ""}" data-id="${vid}" data-verse="${verseNum}">
        <span class="verse-num">${verseNum}</span>
        <span class="verse-words">${stripQuotes(text.trim().replace(/^\d+\s*/, ""))}</span>
      </div>`;
  }).join("");

  container.innerHTML = `<div class="chapter-verses">${html}</div>`;

  setTimeout(() => {
    const target = container.querySelector(".verse-highlight") ?? container.querySelector(".chapter-verse");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 100);
}

/* ──────────────────────────────────────────────────────────
   LEITOR DE BÍBLIA LIVRE
   ──────────────────────────────────────────────────────────*/
const BOOKS_PT = [
  ["GEN","Gênesis"],["EXO","Êxodo"],["LEV","Levítico"],["NUM","Números"],["DEU","Deuteronômio"],
  ["JOS","Josué"],["JDG","Juízes"],["RUT","Rute"],["1SA","1 Samuel"],["2SA","2 Samuel"],
  ["1KI","1 Reis"],["2KI","2 Reis"],["1CH","1 Crônicas"],["2CH","2 Crônicas"],["EZR","Esdras"],
  ["NEH","Neemias"],["EST","Ester"],["JOB","Jó"],["PSA","Salmos"],["PRO","Provérbios"],
  ["ECC","Eclesiastes"],["SNG","Cantares"],["ISA","Isaías"],["JER","Jeremias"],["LAM","Lamentações"],
  ["EZK","Ezequiel"],["DAN","Daniel"],["HOS","Oséias"],["JOL","Joel"],["AMO","Amós"],
  ["OBA","Obadias"],["JON","Jonas"],["MIC","Miquéias"],["NAM","Naum"],["HAB","Habacuque"],
  ["ZEP","Sofonias"],["HAG","Ageu"],["ZEC","Zacarias"],["MAL","Malaquias"],
  ["MAT","Mateus"],["MRK","Marcos"],["LUK","Lucas"],["JHN","João"],["ACT","Atos"],
  ["ROM","Romanos"],["1CO","1 Coríntios"],["2CO","2 Coríntios"],["GAL","Gálatas"],
  ["EPH","Efésios"],["PHP","Filipenses"],["COL","Colossenses"],["1TH","1 Tessalonicenses"],
  ["2TH","2 Tessalonicenses"],["1TI","1 Timóteo"],["2TI","2 Timóteo"],["TIT","Tito"],
  ["PHM","Filemom"],["HEB","Hebreus"],["JAS","Tiago"],["1PE","1 Pedro"],["2PE","2 Pedro"],
  ["1JN","1 João"],["2JN","2 João"],["3JN","3 João"],["JUD","Judas"],["REV","Apocalipse"]
];

const OT_BOOKS = ["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL"];
const NT_BOOKS = ["MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV"];

let readerBook       = "JHN";
let readerChapter    = 1;
let readerVerse      = null;
let selectorChapters = [];
let selectorVerses   = [];

function openBibleReader() {
  const item = pool[idx];
  if (item) {
    const base = item.apiId.includes("-") ? item.apiId.split("-")[0] : item.apiId;
    const p    = base.split(".");
    readerBook    = p[0];
    readerChapter = parseInt(p[1]) || 1;
    readerVerse   = base;
  }

  document.getElementById("bibleModal").classList.add("open");
  renderBookPanel();
}

function closeBibleReader() {
  document.getElementById("bibleModal").classList.remove("open");
}

/* ── Painel: Livros ── */
function renderBookPanel() {
  const body = document.getElementById("readerBody");
  const refBtn = document.getElementById("readerRefBtn");
  if (refBtn) refBtn.style.display = "none";

  const bookGrid = (ids, label) => {
    const items = ids.map(id => {
      const name   = BOOKS_PT.find(b => b[0] === id)?.[1] ?? id;
      const active = id === readerBook ? "panel-btn--active" : "";
      return `<button class="panel-btn ${active}" onclick="selectBook('${id}')">${name}</button>`;
    }).join("");
    return `
      <div class="panel-section">
        <span class="panel-testament-label">${label}</span>
        <div class="panel-grid panel-grid--books">${items}</div>
      </div>`;
  };

  body.innerHTML = `
    <div class="reader-panel">
      <div class="panel-breadcrumb">
        <span class="panel-crumb panel-crumb--active">Livro</span>
        <span class="panel-crumb-sep">›</span>
        <span class="panel-crumb">Capítulo</span>
        <span class="panel-crumb-sep">›</span>
        <span class="panel-crumb">Versículo</span>
      </div>
      ${bookGrid(OT_BOOKS, "Antigo Testamento")}
      ${bookGrid(NT_BOOKS, "Novo Testamento")}
    </div>
  `;
}

/* ── Seleciona livro → busca capítulos ── */
async function selectBook(bookId) {
  readerBook    = bookId;
  readerChapter = 1;
  readerVerse   = null;

  const body = document.getElementById("readerBody");
  body.innerHTML = `<div class="modal-loading">Carregando capítulos...</div>`;

  try {
    const json = await cachedFetch(`https://bible-proxy.matheusnevessp50.workers.dev/bibles/${currentVersion}/books/${bookId}/chapters`);
    selectorChapters = (json.data || []).filter(c => c.number !== "intro");
    renderChapterPanel();
  } catch(e) {
    body.innerHTML = `<p class="modal-error">Erro ao carregar capítulos.</p>`;
  }
}

/* ── Painel: Capítulos ── */
function renderChapterPanel() {
  const body     = document.getElementById("readerBody");
  const bookName = BOOKS_PT.find(b => b[0] === readerBook)?.[1] ?? readerBook;

  const items = selectorChapters.map(c => {
    const active = parseInt(c.number) === readerChapter ? "panel-btn--active" : "";
    return `<button class="panel-btn panel-btn--num ${active}" onclick="selectChapter(${c.number})">${c.number}</button>`;
  }).join("");

  body.innerHTML = `
    <div class="reader-panel">
      <div class="panel-breadcrumb">
        <button class="panel-crumb panel-crumb--link" onclick="renderBookPanel()">Livro</button>
        <span class="panel-crumb-sep">›</span>
        <span class="panel-crumb panel-crumb--active">${bookName}</span>
        <span class="panel-crumb-sep">›</span>
        <span class="panel-crumb">Capítulo</span>
      </div>
      <div class="panel-section">
        <span class="panel-section-label">Capítulo</span>
        <div class="panel-grid panel-grid--nums">${items}</div>
      </div>
    </div>
  `;
}

/* ── Seleciona capítulo → busca versículos ── */
async function selectChapter(num) {
  readerChapter = parseInt(num);

  const body = document.getElementById("readerBody");
  body.innerHTML = `<div class="modal-loading">Carregando versículos...</div>`;

  try {
    const chId = `${readerBook}.${readerChapter}`;
    const json = await cachedFetch(`https://bible-proxy.matheusnevessp50.workers.dev/bibles/${currentVersion}/chapters/${chId}/verses`);
    selectorVerses = (json.data || [])
      .filter(v => v.id && !v.id.endsWith(".intro"))
      .map(v => ({ ...v, number: v.number ?? v.id.split(".")[2] }));
    renderVersePanel();
  } catch(e) {
    body.innerHTML = `<p class="modal-error">Erro ao carregar versículos.</p>`;
  }
}

/* ── Painel: Versículos ── */
function renderVersePanel() {
  const body     = document.getElementById("readerBody");
  const bookName = BOOKS_PT.find(b => b[0] === readerBook)?.[1] ?? readerBook;

  const items = selectorVerses.map(v =>
    `<button class="panel-btn panel-btn--num" onclick="selectVerse('${v.number}')">${v.number}</button>`
  ).join("");

  body.innerHTML = `
    <div class="reader-panel">
      <div class="panel-breadcrumb">
        <button class="panel-crumb panel-crumb--link" onclick="renderBookPanel()">Livro</button>
        <span class="panel-crumb-sep">›</span>
        <button class="panel-crumb panel-crumb--link" onclick="renderChapterPanel()">${bookName}</button>
        <span class="panel-crumb-sep">›</span>
        <span class="panel-crumb panel-crumb--active">Cap. ${readerChapter}</span>
      </div>
      <div class="panel-section">
        <span class="panel-section-label">
          Versículo — ou <button class="panel-link" onclick="selectVerse(null)">abrir do início</button>
        </span>
        <div class="panel-grid panel-grid--nums">${items}</div>
      </div>
    </div>
  `;
}

/* ── Atualiza o label de referência no header do modal ── */
function updateReaderRefLabel() {
  const el = document.getElementById("readerRefLabel");
  if (!el) return;
  const bookName = BOOKS_PT.find(b => b[0] === readerBook)?.[1] ?? readerBook;
  const verseNum = readerVerse ? readerVerse.split(".")[2] : null;
  el.textContent = verseNum
    ? `${bookName} ${readerChapter}:${verseNum}`
    : `${bookName} ${readerChapter}`;
}

/* ── Seleciona versículo → abre leitura ── */
function selectVerse(num) {
  readerVerse = num ? `${readerBook}.${readerChapter}.${num}` : null;
  loadReaderChapter();
}

/* ── Carrega e renderiza capítulo ── */
async function loadReaderChapter() {
  const body = document.getElementById("readerBody");
  const chId = `${readerBook}.${readerChapter}`;

  updateReaderRefLabel();
  const refBtn = document.getElementById("readerRefBtn");
  if (refBtn) refBtn.style.display = "flex";
  body.innerHTML = `<div class="modal-loading">Carregando...</div>`;

  try {
    const json = await cachedFetch(`https://bible-proxy.matheusnevessp50.workers.dev/bibles/${currentVersion}/chapters/${chId}?content-type=json&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true`);

    renderChapter(json.data, readerVerse ?? "", body);
  } catch(e) {
    body.innerHTML = `<p class="modal-error">Erro ao carregar. Verifique a chave da API.</p>`;
  }
}

/* ── Navegar capítulos após leitura aberta ── */
function readerGo(dir) {
  readerChapter += dir;
  if (readerChapter < 1) readerChapter = 1;
  readerVerse = null;
  loadReaderChapter();
}

/* ── Troca livro pelo select do header ── */
function readerBookChanged() {
  readerBook    = document.getElementById("readerBookSelect").value;
  readerChapter = 1;
  readerVerse   = null;
  selectBook(readerBook);
}

/* ── Popula select do header (mantido para compatibilidade) ── */
function populateBookSelect() {
  const sel = document.getElementById("readerBookSelect");
  if (!sel) return;
  sel.innerHTML = "";
  BOOKS_PT.forEach(([id, name]) => {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = name;
    if (id === readerBook) opt.selected = true;
    sel.appendChild(opt);
  });
}