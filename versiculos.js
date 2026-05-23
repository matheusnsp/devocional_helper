// Versículos com comentários (ctx)
// Extraído de script.js

var verses = [
   
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
  
    /* ── 29. TEMOR DE DEUS (12) ── */
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
  
    /* ── 30. ETERNIDADE (12) ── */
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
  
    /* ── 31. MISERICÓRDIA (12) ── */
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
    /* ── 32. REDENÇÃO (5) ── */
    { apiId:"EPH.1.7",            theme:"Redenção",   ref:"Efésios 1:7",
      ctx:"Redenção não é um processo gradual — é uma transação completa, consumada no Calvário. Nele temos a redenção pelo Seu sangue, o perdão das transgressões. O sangue de Cristo não cobre o pecado temporariamente, como os sacrifícios do Antigo Testamento — ele o remove de forma definitiva. A palavra 'redenção' vem do mercado de escravos: alguém paga o preço para libertar. Cristo pagou. Você é livre." },

    { apiId:"1PE.1.18-1PE.1.19",  theme:"Redenção",   ref:"1 Pedro 1:18-19",
      ctx:"Não foi com prata ou ouro que você foi resgatado — essas coisas perdem o valor. Foi com o sangue precioso de Cristo. O preço pago revela o valor de quem foi comprado. Deus não usou o que o mundo considera valioso para te resgatar. Usou o que há de mais precioso no universo inteiro: o próprio Filho. Isso diz algo sobre o quanto você importa para Ele." },

    { apiId:"COL.1.13-COL.1.14",  theme:"Redenção",   ref:"Colossenses 1:13-14",
      ctx:"A redenção não é apenas perdão — é uma transferência de reino. Deus te tirou do poder das trevas e te transportou para o reino do Filho do Seu amor. Dois movimentos simultâneos: saída e entrada. Você não apenas foi perdoado — foi relocado. Já não está mais sob o domínio do pecado e da morte. Pertence a outro reino, com outro Rei." },

    { apiId:"ROM.3.24-ROM.3.25",  theme:"Redenção",   ref:"Romanos 3:24-25",
      ctx:"Deus apresentou Cristo como propiciação pelo Seu sangue, mediante a fé. Propiciação significa que a justa ira de Deus contra o pecado foi completamente satisfeita — não ignorada, não postergada, mas plenamente aplacada em Cristo na cruz. A cruz não foi um acidente histórico. Foi o plano eterno de Deus para resolver o problema do pecado de uma vez por todas." },

    { apiId:"HEB.9.12",           theme:"Redenção",   ref:"Hebreus 9:12",
      ctx:"O sumo sacerdote entrava no lugar santíssimo uma vez por ano, com sangue alheio — e precisava repetir isso todo ano. Cristo entrou uma única vez, com o Seu próprio sangue, e obteve redenção eterna. Não anual. Não renovável. Não condicional. Eterna. O que os sacrifícios do Antigo Testamento apenas simbolizavam, Cristo cumpriu de uma vez por todas." },

    { apiId:"ISA.43.1",           theme:"Redenção",   ref:"Isaías 43:1",
      ctx:"Deus fala diretamente ao Seu povo: Não temas, porque eu te remi. Chamei-te pelo teu nome; tu és meu. A redenção em Isaías é pessoal — não é um decreto genérico, é um chamado pelo nome. Deus não redimiu uma multidão anônima. Ele te resgatou a você, conhecendo cada detalhe da sua história, cada queda, cada cicatriz. O nome que Ele pronuncia é o seu." },

    { apiId:"GAL.3.13",           theme:"Redenção",   ref:"Gálatas 3:13",
      ctx:"Cristo nos resgatou da maldição da Lei, tornando-se maldição por nós. Paulo usa linguagem de mercado: troca. Cristo tomou o lugar amaldiçoado que era o nosso, para que nós ocupássemos o lugar de filhos que era o d'Ele. Não é apenas que Ele nos salvou — é que Ele fez a troca mais desigual da história: deu tudo e recebeu a nossa miséria." },

    { apiId:"PSA.130.7",          theme:"Redenção",   ref:"Salmos 130:7",
      ctx:"O salmista clama das profundezas e aponta para onde a esperança verdadeira está: no Senhor, porque nele há misericórdia abundante e redenção plena. 'Plena' — não parcial, não condicionada ao comportamento futuro, não suspensa em julgamento. A redenção de Deus é completa. Ela cobre o que você lembra e o que você esqueceu." },

    { apiId:"LUK.1.68",           theme:"Redenção",   ref:"Lucas 1:68",
      ctx:"Zacarias profetizou ao nascimento de João Batista: Bendito seja o Senhor Deus de Israel, porque visitou e redimiu o seu povo. A redenção no Novo Testamento não é apenas um conceito teológico — é uma visita. Deus entrou na história, caminhou nas nossas ruas, tocou nos nossos doentes, e morreu na nossa cruz. A redenção tem endereço e data." },

    { apiId:"TIT.2.14",           theme:"Redenção",   ref:"Tito 2:14",
      ctx:"Cristo se entregou por nós para nos resgatar de toda iniquidade e purificar para si mesmo um povo seu. A redenção tem um propósito duplo: tirar de algo e trazer para algo. Tirar do domínio da iniquidade; trazer para pertencer a Deus. Você não foi apenas libertado — foi apropriado. Você agora é Seu. Isso muda tudo sobre como você se vê." },

    { apiId:"ROM.8.23",           theme:"Redenção",   ref:"Romanos 8:23",
      ctx:"Paulo fala de uma redenção que ainda se completará: a redenção do nosso corpo. A salvação da alma já é realidade — mas a redenção plena inclui a transformação do corpo mortal. O gemido que você sente, a sensação de que algo ainda não está completo — é instinto certo. A redenção final ainda está por vir, e essa esperança sustenta a caminhada." },

    { apiId:"JOB.19.25",          theme:"Redenção",   ref:"Jó 19:25",
      ctx:"Do homem mais devastado das Escrituras vem uma das confissões mais poderosas: Eu sei que o meu Redentor vive. Jó havia perdido filhos, riqueza, saúde, e o apoio da esposa. E no fundo daquele abismo ele declara: meu Redentor está vivo. Quando tudo o que você tinha foi tirado, a certeza do Redentor vivo é o que permanece. É o suficiente." },

    /* ── 33. ADORAÇÃO (12) ── */
    { apiId:"JHN.4.23-JHN.4.24",  theme:"Adoração",   ref:"João 4:23-24",
      ctx:"Jesus estava falando com uma samaritana — alguém que a religião oficial ignorava. E é para ela que Ele revela o coração da adoração verdadeira: em espírito e em verdade. Não é sobre o lugar certo, o ritual certo, a denominação certa. É sobre um coração que se aproxima de Deus com autenticidade e sob a direção do Espírito. O Pai busca exatamente esse tipo de adorador." },

    { apiId:"PSA.95.6",           theme:"Adoração",   ref:"Salmos 95:6",
      ctx:"O salmista chama: vinde, adoremos e prostremo-nos, ajoelhemos diante do Senhor que nos criou. A postura física da adoração revela algo da postura interior. Prostrar-se é reconhecer quem Deus é e quem você é diante d'Ele. Não é humilhação — é o ato mais honesto que um ser humano pode fazer: reconhecer que há um Ser infinitamente maior a quem você pertence." },

    { apiId:"ROM.12.1",           theme:"Adoração",   ref:"Romanos 12:1",
      ctx:"Paulo apela para que apresentemos nossos corpos como sacrifício vivo. Essa é a adoração racional — não apenas o que acontece no domingo de manhã. O culto verdadeiro é a vida inteira colocada sobre o altar. Cada decisão, cada relação, cada hora de trabalho pode ser ato de adoração quando feita para a glória de Deus. O templo agora é você." },

    { apiId:"REV.4.11",           theme:"Adoração",   ref:"Apocalipse 4:11",
      ctx:"No trono celestial, os seres adoram incessantemente: Tu és digno, Senhor e Deus nosso, de receber a glória, a honra e o poder. A adoração no céu não é obrigação — é reconhecimento espontâneo da realidade. Quando você realmente vê quem Deus é, adorar é a única resposta lógica. A adoração verdadeira começa pela revelação de quem é Deus, não pelo esforço de quem ora." },

    { apiId:"PSA.100.4",          theme:"Adoração",   ref:"Salmos 100:4",
      ctx:"Entrai pelas suas portas com ação de graças, pelos seus átrios com louvor; celebrai-O, bendizei o Seu nome. A adoração tem uma gramática — ela começa pela gratidão. Você não entra na presença de Deus com lista de pedidos; você entra com reconhecimento do que Ele já é e do que já fez. A gratidão é a porta de entrada para a adoração mais profunda." },

    { apiId:"ISA.6.1-ISA.6.3",    theme:"Adoração",   ref:"Isaías 6:1-3",
      ctx:"Isaías viu o Senhor — alto, sublime, e a Sua glória enchia o templo. Os serafins clamavam: Santo, Santo, Santo. Isso é adoração em seu estado mais puro: uma visão de Deus que provoca reverência absoluta. A adoração autêntica sempre começa com uma revelação de quem Deus é. Quando você O vê de verdade, o louvor não precisa ser forçado — ele irrompe." },

    { apiId:"PSA.63.1",           theme:"Adoração",   ref:"Salmos 63:1",
      ctx:"Davi escreveu isso no deserto, em fuga de seus inimigos. E mesmo assim: ó Deus, tu és o meu Deus; de madrugada te buscarei; a minha alma tem sede de Ti. A adoração mais profunda nasce não nos cultos grandiosos, mas nos desertos pessoais. Quando tudo foi tirado e Deus ainda é buscado com sede — isso é adoração que não depende de circunstâncias." },

    { apiId:"HEB.13.15",          theme:"Adoração",   ref:"Hebreus 13:15",
      ctx:"Ofereçamos continuamente a Deus sacrifício de louvor, fruto de lábios que confessam o Seu nome. Sacrifício de louvor — porque há momentos em que adorar custa algo. Quando a situação é difícil, quando você não sente vontade, quando a vida parece sem resposta, o louvor que sobe nesse momento tem um peso especial diante de Deus. Esse é o louvor que transcende sentimento." },

    { apiId:"2SA.6.14",           theme:"Adoração",   ref:"2 Samuel 6:14",
      ctx:"Davi dançou com todas as suas forças diante do Senhor, sem se importar com o julgamento alheio. Quando Mical o criticou, ele respondeu: foi perante o Senhor. A adoração verdadeira não é performance para plateia humana — é direcionada exclusivamente a Deus. Davi não se importou com quem estava vendo. A única audiência que importava era Deus." },

    { apiId:"PSA.29.2",           theme:"Adoração",   ref:"Salmos 29:2",
      ctx:"Dai ao Senhor a glória devida ao Seu nome; adorai ao Senhor na beleza da santidade. Adorar na beleza da santidade é chegar à presença de Deus sem pretensão, sem máscara, sem agenda oculta. É a adoração que flui de um coração que foi purificado e que reconhece que a santidade de Deus é, ao mesmo tempo, o que mais nos atrai e nos transforma." },

    { apiId:"LUK.19.40",          theme:"Adoração",   ref:"Lucas 19:40",
      ctx:"Quando os fariseus mandaram Jesus calar os discípulos que o louvavam, Ele respondeu: se estes se calarem, as próprias pedras clamarão. A adoração é uma resposta inevitável à revelação de quem Cristo é. Quando a Igreja se cala, a criação ainda sente a obrigação de adorar. Mas que privilégio inigualável é ser nós a exercer essa adoração." },

    { apiId:"REV.5.9",            theme:"Adoração",   ref:"Apocalipse 5:9",
      ctx:"Os seres celestiais cantam ao Cordeiro um cântico novo — porque o que Cristo fez é tão inédito que exige uma canção nunca cantada antes. Redenção de toda tribo, língua, povo e nação. A adoração final não é monocultural nem monocromática — é a diversidade inteira da criação convergindo para um único foco: o Cordeiro que foi morto e ressuscitou." },

    /* ── 34. DISCERNIMENTO ESPIRITUAL (12) ── */
    { apiId:"1CO.2.14",           theme:"Discernimento Espiritual", ref:"1 Coríntios 2:14",
      ctx:"O homem natural não pode receber as coisas do Espírito de Deus, porque lhe parecem loucura — e não pode conhecê-las, porque elas se discernem espiritualmente. Paulo está dizendo que há uma dimensão da realidade que o intelecto humano não alcança por conta própria. O discernimento espiritual não é intuição apurada — é capacidade dada pelo Espírito para enxergar o que a mente natural não enxerga." },

    { apiId:"HEB.5.14",           theme:"Discernimento Espiritual", ref:"Hebreus 5:14",
      ctx:"O alimento sólido é para os maduros, que têm os sentidos espirituais exercitados pelo uso para discernir tanto o bem como o mal. A palavra 'exercitados' vem do grego usado para treino atlético. Discernimento não é um dom que cai do céu de uma vez — é faculdade espiritual desenvolvida pelo uso constante, pela prática contínua de buscar Deus nas decisões." },

    { apiId:"PHP.1.9-PHP.1.10",   theme:"Discernimento Espiritual", ref:"Filipenses 1:9-10",
      ctx:"Paulo ora para que o amor dos filipenses transborde em pleno conhecimento e em toda percepção, para que aprovem as coisas excelentes. O discernimento aqui está ligado ao amor — não é fria análise intelectual. Discernimento maduro começa com amor a Deus, que gera sensibilidade para reconhecer o que é excelente e o que é apenas bom." },

    { apiId:"1JN.4.1",            theme:"Discernimento Espiritual", ref:"1 João 4:1",
      ctx:"Amados, não creiais em todo espírito, mas provai os espíritos se são de Deus, porque muitos falsos profetas têm saído pelo mundo. João não está pregando paranoia — está pregando responsabilidade espiritual. Abrir o coração para tudo que se apresenta como espiritual não é humildade — é imprudência. O discernimento é o escudo contra o engano." },

    { apiId:"ROM.12.2",           theme:"Discernimento Espiritual", ref:"Romanos 12:2",
      ctx:"Sede transformados pela renovação da vossa mente, para que possais comprovar qual seja a boa, agradável e perfeita vontade de Deus. A renovação da mente não é lavagem cerebral — é o processo pelo qual a Palavra e o Espírito calibram o seu entendimento para que você comece a ver a realidade do ponto de vista de Deus. Discernimento é o fruto de uma mente renovada." },

    { apiId:"PRO.3.21",           theme:"Discernimento Espiritual", ref:"Provérbios 3:21",
      ctx:"Filho meu, não se apartem estas coisas dos teus olhos; guarda a sã sabedoria e o bom conselho. O discernimento em Provérbios não é sobrenatural no sentido místico — é a sabedoria aplicada ao cotidiano com os olhos abertos. Guardar o discernimento é manter os critérios espirituais ativos, sem deixar que a pressa ou a pressão apaguem o que Deus já ensinou." },

    { apiId:"1KI.3.9",            theme:"Discernimento Espiritual", ref:"1 Reis 3:9",
      ctx:"Salomão pediu a Deus um coração que ouve — na tradução literal — para discernir entre o bem e o mal. Não pediu riqueza. Não pediu vitória sobre inimigos. Pediu coração com discernimento. E Deus ficou tão agradado com esse pedido que deu tudo o que Salomão não pediu também. O que Deus mais valoriza em um líder é a capacidade de discernir." },

    { apiId:"ISA.11.2-ISA.11.3",  theme:"Discernimento Espiritual", ref:"Isaías 11:2-3",
      ctx:"Isaías profetiza sobre o Messias: sobre Ele repousará o Espírito do Senhor — o espírito de sabedoria e entendimento, o espírito de conselho e poder. E o Seu prazer será no temor do Senhor. O discernimento supremo está em Cristo — e quando o Espírito de Cristo habita em você, você tem acesso a essa mesma disposição para ver com os olhos de Deus." },

    { apiId:"ACT.16.6-ACT.16.7",  theme:"Discernimento Espiritual", ref:"Atos 16:6-7",
      ctx:"O Espírito Santo impediu Paulo de pregar na Ásia e na Bitínia. Discernimento espiritual às vezes significa perceber o que Deus está fechando, não apenas o que está abrindo. A sensibilidade ao Espírito inclui saber ouvir o não. Muitas direções erradas poderiam ser evitadas se houvesse sensibilidade suficiente para perceber quando Deus está bloqueando um caminho." },

    { apiId:"MAT.10.16",          theme:"Discernimento Espiritual", ref:"Mateus 10:16",
      ctx:"Sede prudentes como as serpentes e simples como as pombas. Jesus combina dois extremos: a astúcia da serpente — percepção aguçada do ambiente — com a integridade da pomba — sem agendas escondidas. Discernimento não é cinismo. É a capacidade de enxergar o que está acontecendo sem perder a pureza de motivos." },

    { apiId:"COL.1.9",            theme:"Discernimento Espiritual", ref:"Colossenses 1:9",
      ctx:"Paulo ora para que os colossenses sejam cheios do conhecimento da vontade de Deus em toda sabedoria e entendimento espiritual. Há uma diferença entre conhecimento teórico da Bíblia e entendimento espiritual — este último é a capacidade de aplicar o que a Bíblia ensina à realidade concreta da vida, guiado pelo Espírito. É isso que Paulo pede." },

    { apiId:"1CO.12.10",          theme:"Discernimento Espiritual", ref:"1 Coríntios 12:10",
      ctx:"Entre os dons do Espírito listados por Paulo está o discernimento de espíritos — capacidade sobrenatural de distinguir o que é de Deus, o que é humano e o que é demoníaco. A Igreja precisa desse dom ativo, especialmente em tempos de confusão espiritual e de proliferação de vozes que se apresentam como proféticas." },

    /* ── 35. PERSEVERANÇA (12) ── */
    { apiId:"HEB.12.1-HEB.12.2",  theme:"Perseverança", ref:"Hebreus 12:1-2",
      ctx:"O escritor usa a imagem de uma corrida cercada por uma nuvem de testemunhas — os heróis da fé do capítulo anterior. E o chamado é: corrai com perseverança, fixando os olhos em Jesus. A perseverança cristã não é estoicismo — é corrida com os olhos no alvo certo. Quando você fixa Jesus, você recebe de volta a energia para continuar." },

    { apiId:"JAS.1.3-JAS.1.4",    theme:"Perseverança", ref:"Tiago 1:3-4",
      ctx:"Tiago diz que a prova da fé produz perseverança — e a perseverança completa a obra. Não é que o sofrimento é bom em si mesmo; é que Deus é capaz de usar a resistência para acabar a obra de formação que começou em você. A perseverança não é aguentar no dente — é confiar que Deus está trabalhando exatamente no processo que você quer que acabe." },

    { apiId:"GAL.6.9",            theme:"Perseverança", ref:"Gálatas 6:9",
      ctx:"Não nos cansemos de fazer o bem, pois a seu tempo ceifaremos, se não desanimarmos. Paulo coloca o dedo na ferida: o maior risco para o crente não é o inimigo externo — é o desânimo interno. A tentação de parar. E a resposta é uma certeza: a colheita vem. O ritmo de Deus não é o seu ritmo. Mas ela vem." },

    { apiId:"ROM.5.3-ROM.5.5",    theme:"Perseverança", ref:"Romanos 5:3-5",
      ctx:"A tribulação produz perseverança, a perseverança caráter aprovado, o caráter esperança. Paulo não está romantizando o sofrimento — está descrevendo uma cadeia de transformação real. A perseverança não deixa você igual. Ela produz algo dentro de você que as circunstâncias fáceis nunca produziriam: um caráter que foi testado e aprovado." },

    { apiId:"REV.3.10",           theme:"Perseverança", ref:"Apocalipse 3:10",
      ctx:"Jesus elogia a igreja de Filadélfia por uma coisa: guardaste a palavra da minha perseverança. A perseverança que Jesus valoriza não é força de vontade — é fidelidade à palavra, manutenção do compromisso com o que Deus disse, mesmo quando as circunstâncias tentam desacreditar Suas promessas. Isso é o que a eternidade recompensará." },

    { apiId:"2TI.4.7",            theme:"Perseverança", ref:"2 Timóteo 4:7",
      ctx:"Paulo ao fim da vida diz: combati o bom combate, acabei a carreira, guardei a fé. Não disse que venceu todas as batalhas. Não disse que foi fácil. Disse que chegou ao fim. A perseverança não é sobre não sofrer — é sobre não abandonar. Acabar a carreira com a fé guardada é a maior conquista que um cristão pode alcançar." },

    { apiId:"LUK.18.1",           theme:"Perseverança", ref:"Lucas 18:1",
      ctx:"Jesus contou a parábola da viúva persistente para ensinar que é necessário orar sempre, sem desanimar. A perseverança na oração não é cobrar Deus — é manter o canal aberto, é recusar-se a desistir da comunicação com Ele. Às vezes Deus demora não porque não ouviu, mas porque quer ver se você vai continuar confiando nele." },

    { apiId:"DAN.6.10",           theme:"Perseverança", ref:"Daniel 6:10",
      ctx:"Daniel soube que a lei que proibia orar a Deus havia sido assinada — e foi para casa e orou como sempre fazia, três vezes por dia. Sem drama, sem discurso. Perseverança silenciosa e consistente diante da ameaça. O que sustenta a fé num ambiente hostil não é heroísmo esporádico — é o hábito fiel, construído antes da crise." },

    { apiId:"ISA.40.31",          theme:"Perseverança", ref:"Isaías 40:31",
      ctx:"Os que esperam no Senhor renovarão as forças; subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão. Há três ritmos: voar, correr, caminhar. A perseverança inclui os três. Nem sempre você está voando — às vezes você está apenas caminhando. Mas quem espera no Senhor tem força renovada em todos os ritmos." },

    { apiId:"1CO.15.58",          theme:"Perseverança", ref:"1 Coríntios 15:58",
      ctx:"Sede firmes e constantes, sempre abundantes na obra do Senhor, sabendo que o vosso trabalho não é vão no Senhor. Paulo ancora a perseverança na ressurreição — o capítulo 15 inteiro é sobre isso. Se Cristo ressuscitou, o seu trabalho tem peso eterno. Nada feito para Deus se desperdiça. Isso é o que sustenta o crente quando os resultados não aparecem." },

    { apiId:"NUM.13.30",          theme:"Perseverança", ref:"Números 13:30",
      ctx:"Doze espias voltaram da Terra Prometida. Dez viram os gigantes e disseram: não podemos. Calebe viu os mesmos gigantes e disse: subamos, porque certamente a conquistaremos. A perseverança não é cegueira para os obstáculos — é uma perspectiva diferente sobre quem está com você diante deles. Calebe via Deus maior que os gigantes." },

    { apiId:"PHP.3.13-PHP.3.14",  theme:"Perseverança", ref:"Filipenses 3:13-14",
      ctx:"Paulo diz: esqueço o que ficou para trás e me projeto para o que está adiante, correndo para o alvo. A perseverança tem uma direção — para frente. E tem um segredo: esquecer o que ficou para trás. Não negação do passado, mas recusa de deixar que os fracassos anteriores determinem o ritmo do presente." },

    /* ── 36. UNIDADE (12) ── */
    { apiId:"JHN.17.21",          theme:"Unidade",      ref:"João 17:21",
      ctx:"Na oração sacerdotal, Jesus pede ao Pai que todos sejam um, como Ele e o Pai são um. A unidade que Jesus pede não é uniformidade doutrinária forçada — é participação no mesmo tipo de comunhão que existe dentro da Trindade: amor mútuo, honra mútua, propósito compartilhado. E essa unidade tem um propósito evangelístico: para que o mundo creia." },

    { apiId:"PSA.133.1-PSA.133.3", theme:"Unidade",     ref:"Salmos 133:1-3",
      ctx:"Como é bom e agradável que os irmãos vivam em unidade! É como o óleo precioso que desce sobre a barba de Arão — o óleo da unção ungindo o corpo todo. A unidade entre irmãos não é apenas bonita — ela é o lugar onde Deus ordena a bênção. A unção e o poder espiritual fluem em ambientes de unidade genuína." },

    { apiId:"EPH.4.3",            theme:"Unidade",      ref:"Efésios 4:3",
      ctx:"Paulo nos exorta a guardar a unidade do Espírito pelo vínculo da paz. Dois detalhes importantes: a unidade já existe — o Espírito já a criou. E é nossa responsabilidade guardá-la. Não construir, guardar. Isso significa que a divisão é sempre um fracasso em preservar o que Deus já estabeleceu na comunidade do Espírito." },

    { apiId:"1CO.1.10",           theme:"Unidade",      ref:"1 Coríntios 1:10",
      ctx:"A igreja de Corinto estava fragmentada em partidos: uns de Paulo, outros de Apolo, outros de Cefas. E Paulo os confronta diretamente: suplico que todos falem a mesma coisa, que não haja divisões entre vós. As facções na Igreja não são apenas inconvenientes sociais — são contradições diretas ao evangelho de um Cristo que é indivisível." },

    { apiId:"ACT.2.44-ACT.2.45",  theme:"Unidade",      ref:"Atos 2:44-45",
      ctx:"Todos os que criam estavam juntos e tinham tudo em comum. A unidade da igreja primitiva era radical — não apenas doutrinária, mas prática, econômica, cotidiana. Quando o Espírito cai sobre um grupo de pessoas, o resultado visível é que elas passam a tratar os recursos e o sofrimento alheio como seus. A unidade real tem sempre uma dimensão material." },

    { apiId:"ROM.15.5-ROM.15.6",  theme:"Unidade",      ref:"Romanos 15:5-6",
      ctx:"O Deus da perseverança e do encorajamento vos conceda o mesmo pensamento uns para com os outros, para que concordes glorifiqueis ao Deus e Pai de nosso Senhor Jesus Cristo. Paulo mostra que unidade não é resultado do esforço humano — é dom de Deus que permite que vozes diferentes se harmonizem num único glorificar." },

    { apiId:"COL.3.14",           theme:"Unidade",      ref:"Colossenses 3:14",
      ctx:"Acima de tudo isto, porém, revestí-vos de amor, que é o vínculo da perfeição. Paulo lista várias virtudes que o crente deve vestir — misericórdia, bondade, humildade — e no final diz: sobre tudo isso, amor. O amor é o que amarra tudo junto. Sem amor, as virtudes individuais não formam comunidade. Com amor, até os incompatíveis se tornam família." },

    { apiId:"1PE.3.8",            theme:"Unidade",      ref:"1 Pedro 3:8",
      ctx:"Sede todos de um mesmo pensamento, compassivos, amando os irmãos, misericordiosos, humildes. Pedro está escrevendo para pessoas perseguidas e dispersas — que facilmente poderiam se fragmentar sob pressão. E ele chama para unidade que vai contra o instinto natural em tempos difíceis: coração aberto, não fechado; humildade, não defesa própria." },

    { apiId:"AMO.3.3",            theme:"Unidade",      ref:"Amós 3:3",
      ctx:"Andarão dois juntos, sem que estejam de acordo? A pergunta retórica de Amós aponta para uma verdade simples: caminhar junto requer acordo. A unidade na Igreja não acontece por acidente nem por simpatia natural entre as pessoas. Ela exige busca deliberada de alinhamento — ao redor de Cristo, da Palavra e do propósito do Espírito." },

    { apiId:"MAT.18.20",          theme:"Unidade",      ref:"Mateus 18:20",
      ctx:"Onde dois ou três estiverem reunidos em meu nome, ali estou no meio deles. Jesus não diz que a presença d'Ele requer multidão. Ele valoriza o dois ou três que se reúnem em Seu nome — unidos não pela conveniência, não pela simpatia, mas pelo nome de Jesus como centro. A unidade em torno de Cristo é o ambiente da Sua presença manifesta." },

    { apiId:"GAL.3.28",           theme:"Unidade",      ref:"Gálatas 3:28",
      ctx:"Não há judeu nem grego, escravo nem livre, homem nem mulher, porque todos vós sois um em Cristo Jesus. Paulo está dinamitando as hierarquias mais fundamentais do mundo antigo. Em Cristo, as identidades que separavam as pessoas não desaparecem — mas deixam de ser critérios de valor ou exclusão. A unidade do corpo de Cristo é a declaração mais radical de igualdade que já foi feita." },

    { apiId:"PHP.2.2",            theme:"Unidade",      ref:"Filipenses 2:2",
      ctx:"Completai o meu gozo, tendo o mesmo pensamento, o mesmo amor, o mesmo ânimo, sentindo uma só coisa. Paulo pede uma unidade que é ao mesmo tempo interna e relacional: mesmo amor, mesmo pensamento, mesma direção. Isso não é possível por negociação humana. É o resultado do Espírito formando Cristo em cada membro do corpo." },

    /* ── 37. MATURIDADE (12) ── */
    { apiId:"EPH.4.13",           theme:"Maturidade",   ref:"Efésios 4:13",
      ctx:"Paulo descreve a meta da vida cristã: chegar à medida da estatura da plenitude de Cristo. A maturidade espiritual não é um destino fixo que você alcança e fica — é um horizonte que vai crescendo à medida que você se aproxima. O padrão é Cristo. Enquanto houver algo em você que não reflete Cristo, ainda há espaço para crescer." },

    { apiId:"HEB.6.1",            theme:"Maturidade",   ref:"Hebreus 6:1",
      ctx:"O escritor exorta: deixando os princípios elementares da doutrina de Cristo, vamos adiante para a perfeição. O problema que ele identifica é ficar repetindo os fundamentos sem avançar. Maturidade exige movimento. Não abandonar os fundamentos — construir sobre eles. A fé que não cresce estagna. E a estagnação é, a longo prazo, retrocesso." },

    { apiId:"1CO.13.11",          theme:"Maturidade",   ref:"1 Coríntios 13:11",
      ctx:"Quando eu era menino, falava como menino, sentia como menino, pensava como menino; quando me tornei homem, deixei as coisas de menino. A maturidade é natural na criança que cresce — mas precisa ser buscada ativamente no espiritual. Maturidade é quando você para de precisar que tudo gire ao seu redor, que tudo seja como você quer. É quando Cristo se torna o centro." },

    { apiId:"COL.1.28",           theme:"Maturidade",   ref:"Colossenses 1:28",
      ctx:"Paulo descreve seu ministério: advertimos e ensinamos a todo homem, em toda sabedoria, para apresentar todo homem perfeito em Cristo Jesus. A meta do discipulado não é produzir seguidores de Paulo — é apresentar todo homem perfeito, maduro, em Cristo. Maturidade é o destino do processo de formação espiritual, e o ministério existe para isso." },

    { apiId:"2PE.3.18",           theme:"Maturidade",   ref:"2 Pedro 3:18",
      ctx:"Crescei na graça e no conhecimento de nosso Senhor e Salvador Jesus Cristo. Pedro usa dois vetores: graça e conhecimento. Crescer na graça é aprofundar a experiência do amor inmerecido de Deus. Crescer no conhecimento é aprofundar a compreensão de quem Cristo é. Os dois juntos produzem maturidade que não é apenas intelectual nem apenas emocional." },

    { apiId:"ROM.8.29",           theme:"Maturidade",   ref:"Romanos 8:29",
      ctx:"Os que Deus predestinou, predestinou para serem conformados à imagem de Seu Filho. A maturidade cristã tem uma definição precisa: semelhança com Cristo. Não perfeição moral estéril — a imagem viva de Jesus: compaixão, coragem, fidelidade, amor que se sacrifica. Esse é o padrão. Tudo o que Deus permite na sua vida tem esse objetivo em vista." },

    { apiId:"PRO.4.18",           theme:"Maturidade",   ref:"Provérbios 4:18",
      ctx:"O caminho dos justos é como a luz da aurora, que vai brilhando mais e mais até ser dia perfeito. A imagem é de progressão gradual — não de iluminação repentina. Maturidade espiritual é como o amanhecer: imperceptível a cada minuto, mas real na trajetória. Se você olhar para trás com honestidade, verá que hoje reflete mais Cristo do que há um ano." },

    { apiId:"1TI.4.15",           theme:"Maturidade",   ref:"1 Timóteo 4:15",
      ctx:"Paulo instrui Timóteo: ocupa-te destas coisas, entrega-te totalmente a elas, para que o teu progresso seja manifesto a todos. Maturidade não é apenas interna — ela se torna visível. As pessoas ao redor percebem o crescimento de quem está genuinamente sendo transformado por Cristo. A maturidade tem evidências observáveis." },

    { apiId:"GAL.4.19",           theme:"Maturidade",   ref:"Gálatas 4:19",
      ctx:"Paulo usa uma imagem maternal: meus filhozinhos, pelos quais de novo suporto dores de parto, até que Cristo seja formado em vós. Maturidade espiritual é Cristo sendo formado dentro de você — não externamente imitado, mas internamente gerado. O processo dói, como qualquer nascimento. Mas o resultado é Cristo visível em uma vida humana." },

    { apiId:"JAM.1.4",            theme:"Maturidade",   ref:"Tiago 1:4",
      ctx:"A perseverança deve ter obra perfeita, para que sejais perfeitos e completos, em nada deficientes. Tiago liga maturidade e perseverança: a maturidade é o produto de quem não desistiu no processo. As pessoas mais maduras que você conhece não chegaram lá por talento — chegaram por terem permanecido fiéis quando havia todo motivo para largar." },

    { apiId:"PHP.1.6",            theme:"Maturidade",   ref:"Filipenses 1:6",
      ctx:"Tendo por certo que o que em vós começou a boa obra, a aperfeiçoará até ao dia de Jesus Cristo. A responsabilidade maior no processo de maturidade é de Deus — não sua. Você coopera, você busca, mas Quem completa a obra é Ele. Isso não é passividade — é confiança de que o processo que Deus começou em você não vai ficar pela metade." },

    /* ── 38. RENDIÇÃO (12) ── */
    { apiId:"MAT.16.24",          theme:"Rendição",     ref:"Mateus 16:24",
      ctx:"Jesus apresenta a condição do discipulado: neguem-se a si mesmos, tomem a sua cruz e sigam-me. Rendição não é apenas abrir mão de vícios — é abrir mão de si mesmo. É a entrega do controle da própria vida para um novo Senhor. A cruz que Jesus menciona não é a cruz de sofrimento passivo — é a decisão ativa de morrer para a agenda própria." },

    { apiId:"LUK.22.42",          theme:"Rendição",     ref:"Lucas 22:42",
      ctx:"No Getsêmani, Jesus orou: Pai, se queres, passa este cálice de mim; todavia, não se faça a minha vontade, mas a tua. A rendição mais profunda da história foi expressa nessas palavras. Não havia alegria fácil — havia agonia real. E mesmo assim: não a minha vontade. A rendição que Deus pede não ignora o custo. Ela entrega mesmo conhecendo o custo." },

    { apiId:"ROM.6.13",           theme:"Rendição",     ref:"Romanos 6:13",
      ctx:"Apresentai-vos a Deus como instrumentos de justiça. Paulo usa o vocabulário militar — apresentar-se ao comandante. Rendição espiritual é reconhecer que você não é mais seu próprio general. Você foi comprado, você pertence a Cristo, e a decisão diária de se apresentar a Ele como instrumento é o ato de rendição que renova o discipulado todo dia." },

    { apiId:"PRO.3.5-PRO.3.6",    theme:"Rendição",     ref:"Provérbios 3:5-6",
      ctx:"Confia no Senhor de todo o teu coração e não te apoies no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas. Rendição aqui é epistemológica — é entregar o seu próprio entendimento. A inteligência humana é real, mas limitada. Rendição é reconhecer que Deus vê o que você não vê, e confiar nessa visão maior." },

    { apiId:"1PE.5.6",            theme:"Rendição",     ref:"1 Pedro 5:6",
      ctx:"Humilhai-vos, pois, sob a poderosa mão de Deus, para que ele vos exalte no momento oportuno. Pedro usa a imagem de colocar a mão de Deus sobre si — como súdito que se curva diante do rei. Rendição é essa postura: não lutar contra a soberania de Deus, mas se posicionar deliberadamente sob ela. Quem se abaixa assim, Deus levanta no tempo certo." },

    { apiId:"JHN.12.24",          theme:"Rendição",     ref:"João 12:24",
      ctx:"Se o grão de trigo não cair na terra e morrer, ficará só; mas se morrer, produzirá muito fruto. Jesus usa a biologia para descrever a rendição. O grão que não cai, não morre — e não reproduz. A rendição parece perda — e é. Mas é a perda necessária para a multiplicação. Tudo que Deus tem produzido de significativo na história passou por um grão que se rendeu." },

    { apiId:"ISA.6.8",            theme:"Rendição",     ref:"Isaías 6:8",
      ctx:"Depois de ver a visão de Deus e de ser purificado, Isaías ouviu: Quem enviarei, e quem há de ir por nós? E respondeu: Eis-me aqui, envia-me a mim. A rendição completa tem essa ordem: primeiro a visão de Deus, depois a purificação, e só então o sim sem condições. Isaías não respondeu antes de ver Quem estava pedindo. A rendição informada é a mais profunda." },

    { apiId:"MAT.6.24",           theme:"Rendição",     ref:"Mateus 6:24",
      ctx:"Ninguém pode servir a dois senhores. A rendição exclui a divisão de lealdade. Você pode tentar servir a Deus e ao dinheiro, à sua própria vontade e à vontade d'Ele — mas não dá para fazer os dois bem. Rendição é a decisão de qual senhor ocupa o trono da sua vida, reconhecendo que o trono tem lugar para apenas um." },

    { apiId:"ACT.9.6",            theme:"Rendição",     ref:"Atos 9:6",
      ctx:"Paulo, derrubado no caminho de Damasco, pergunta: Senhor, que queres que eu faça? Em questão de segundos, o maior perseguidor da Igreja se torna o seu maior missionário — não porque ganhou um argumento, mas porque se rendeu. A rendição de Paulo foi abrupta, radical e total. A maioria das rendições não acontece assim — mas o espírito é o mesmo." },

    { apiId:"MRK.10.21",          theme:"Rendição",     ref:"Marcos 10:21",
      ctx:"Para o jovem rico, Jesus pediu exatamente o que ele não estava disposto a render: as riquezas. Jesus foi ao ponto. A rendição que Deus pede sempre toca no que você mais segura. Não é crueldade — é cirurgia. Deus sabe exatamente o que está no lugar d'Ele no seu coração. E Ele não aceita compartilhar o trono com o que te mantém preso." },

    { apiId:"2CO.5.15",           theme:"Rendição",     ref:"2 Coríntios 5:15",
      ctx:"Cristo morreu por todos, para que os que vivem não vivam mais para si mesmos, mas para Aquele que por eles morreu. A rendição tem uma base teológica: o que Cristo fez. Você não se rende por obrigação religiosa — você se rende porque percebeu que Alguém morreu por você, e que continuar vivendo para si mesmo é um desperdício trágico dessa dádiva." },

    { apiId:"DEU.6.5",            theme:"Rendição",     ref:"Deuteronômio 6:5",
      ctx:"Amarás o Senhor teu Deus de todo o teu coração, de toda a tua alma e de toda a tua força. Rendição completa não é a entrega do que sobra — é a entrega do todo: coração, alma, força. Jesus chamou esse versículo de o maior mandamento. Porque quando você se rende completamente a Deus, todos os outros mandamentos fluem naturalmente." },

    /* ── 39. DISCIPLINA (12) ── */
    { apiId:"HEB.12.11",          theme:"Disciplina",   ref:"Hebreus 12:11",
      ctx:"A disciplina no momento não parece motivo de alegria, mas de tristeza; depois, porém, produz fruto pacífico de justiça. O autor não romantiza a disciplina — ele é honesto: dói. Mas a perspectiva muda quando você olha para o fruto produzido. A disciplina de Deus não é rejeição — é o trabalho de um Pai que tem mais interesse no seu futuro do que no seu conforto presente." },

    { apiId:"PRO.12.1",           theme:"Disciplina",   ref:"Provérbios 12:1",
      ctx:"Quem ama a instrução ama o conhecimento, mas quem odeia a repreensão é estúpido. Provérbios é direto ao ponto: receber disciplina é sabedoria; resistir a ela é estupidez. A questão não é se você vai precisar de correção — vai. A questão é se você vai recebê-la com humildade, que permite crescimento, ou com orgulho, que bloqueia." },

    { apiId:"1CO.9.27",           theme:"Disciplina",   ref:"1 Coríntios 9:27",
      ctx:"Paulo diz: esmurro e escravizo o meu corpo para que, tendo pregado aos outros, eu mesmo não venha a ser reprovado. O homem que escreveu metade do Novo Testamento praticava autodisciplina rigorosa. Não porque o corpo era mau — mas porque a liberdade sem disciplina destrói o que deveria proteger. Disciplina é o que mantém o pregador congruente com o que prega." },

    { apiId:"PRO.13.24",          theme:"Disciplina",   ref:"Provérbios 13:24",
      ctx:"Quem poupa a vara odeia o filho; mas quem o ama, desde cedo o disciplina. A disciplina é prova de amor, não de dureza. O pai que nunca corrige está, na verdade, investindo menos no filho do que aquele que tem a coragem de dizer não. O amor que não disciplina é sentimental demais para ser verdadeiro — porque evita o desconforto mas ignora o destino." },

    { apiId:"REV.3.19",           theme:"Disciplina",   ref:"Apocalipse 3:19",
      ctx:"Eu repreendo e disciplino a todos os que amo; sê, pois, zeloso e arrepende-te. Cristo falando à Igreja: a disciplina é ato de amor. Não é punição de um Deus irritado — é cuidado de um Cristo que não está disposto a deixar você estagnado onde está. Quando a vida traz correção, a pergunta não é 'Deus me abandonou?' mas 'O que Ele está trabalhando aqui?'" },

    { apiId:"1TI.4.7-1TI.4.8",   theme:"Disciplina",   ref:"1 Timóteo 4:7-8",
      ctx:"Exercita-te para a piedade, porque o exercício físico para pouco aproveita, mas a piedade é proveitosa para tudo. Paulo usa o vocabulário do atleta — exercitar, treinar. A disciplina espiritual não acontece por osmose: você precisa praticar, repetir, criar hábitos. A piedade não é talento natural — é músculo espiritual construído com o tempo." },

    { apiId:"PSA.119.67",         theme:"Disciplina",   ref:"Salmos 119:67",
      ctx:"Antes de ser afligido andava desgarrado, mas agora guardo a tua palavra. O salmista olha para trás e reconhece: a disciplina me trouxe de volta. O sofrimento que parecia destruição foi, na realidade, o que o reconduziu ao lugar certo. Às vezes Deus usa a disciplina não como punição, mas como GPS — uma correção de rota que te leva de volta ao caminho." },

    { apiId:"GAL.5.23",           theme:"Disciplina",   ref:"Gálatas 5:23",
      ctx:"Paulo lista o domínio próprio como fruto do Espírito Santo. Isso é significativo: disciplina não é produzida pelo esforço da carne — é fruto do Espírito. Quando você está cheio do Espírito Santo, um dos resultados visíveis é um crescente domínio de si mesmo. A santidade não é conquistada pela força de vontade — é o resultado de estar rendido ao Espírito." },

    { apiId:"2PE.1.5-2PE.1.6",    theme:"Disciplina",   ref:"2 Pedro 1:5-6",
      ctx:"Pedro lista as virtudes que devem ser adicionadas à fé, e no meio da lista está o domínio próprio. A disciplina não é a virtude mais glamorosa — mas é a estrutura que sustenta todas as outras. Sem disciplina, o conhecimento vira arrogância, a coragem vira impulsividade, e o amor vira sentimentalismo sem durabilidade." },

    { apiId:"LAM.3.27",           theme:"Disciplina",   ref:"Lamentações 3:27",
      ctx:"Bom é ao homem que suporte o jugo desde a sua juventude. Jeremias, escrevendo do fundo do sofrimento, diz que aprender a suportar o jugo cedo na vida é bom. A disciplina aprendida quando jovem forma o caráter que vai sustentar quando a vida pesar. O músculo espiritual que não é exercitado na juventude custa muito mais a desenvolver depois." },

    { apiId:"DAN.1.8",            theme:"Disciplina",   ref:"Daniel 1:8",
      ctx:"Daniel propôs em seu coração que não se contaminaria com a comida do rei. Uma decisão pequena, silenciosa, feita antes da pressão chegar. A disciplina de Daniel foi tomada preventivamente — ele estabeleceu limites antes de estar na situação de crise. A disciplina espiritual mais eficaz é aquela que você decide na tranquilidade, não na hora da tentação." },

    { apiId:"MAT.5.29",           theme:"Disciplina",   ref:"Mateus 5:29",
      ctx:"Se o teu olho direito te faz tropeçar, arranca-o e lança-o fora. Jesus usa hipérbole radical para ensinar uma coisa real: a disciplina às vezes exige amputação. Não de membros físicos — mas de hábitos, relações, conteúdos que alimentam o que deveria morrer. A disciplina séria não negocia com o que está destruindo você." },

    /* ── 40. BATALHA ESPIRITUAL (12) ── */
    { apiId:"EPH.6.12",           theme:"Batalha Espiritual", ref:"Efésios 6:12",
      ctx:"A nossa luta não é contra o sangue e a carne, mas contra os principados, contra as potestades. Paulo está desmistificando onde está o inimigo real. O conflito entre pessoas, nações, famílias — tem uma dimensão espiritual por trás. Quando você identifica o inimigo correto, você para de usar as armas erradas. Não se luta contra espíritos com métodos carnais." },

    { apiId:"2CO.10.3-2CO.10.4",  theme:"Batalha Espiritual", ref:"2 Coríntios 10:3-4",
      ctx:"As armas da nossa batalha não são carnais, mas poderosas em Deus para demolir fortalezas. Paulo foi acusado de ser fraco pessoalmente. E ele responde: minha batalha não é no nível onde vocês estão medindo. As fortalezas que ele derruba são mentalidades, argumentos, especulações — e as armas para derrubar essas fortalezas são espirituais." },

    { apiId:"1PE.5.8",            theme:"Batalha Espiritual", ref:"1 Pedro 5:8",
      ctx:"Sede sóbrios e vigilantes. O diabo, como leão que ruge, anda em derredor, procurando alguém para devorar. A batalha espiritual começa com sobriedade — a recusa de ser anestesiado pelo mundo. O leão que ruge não ataca o rebanho vigilante — ele caça o distraído, o isolado, o que não percebe o perigo. Vigilância é a primeira linha de defesa." },

    { apiId:"JAS.4.7",            theme:"Batalha Espiritual", ref:"Tiago 4:7",
      ctx:"Sujeitai-vos a Deus; resistí ao diabo, e ele fugirá de vós. Dois movimentos, nessa ordem. A ordem importa: primeiro sujeição a Deus, depois resistência ao diabo. Quem resiste ao diabo sem estar sujeito a Deus está lutando sem armadura. Mas quem primeiro se rende a Deus descobre que a resistência que vem de dentro d'Ele faz o inimigo recuar." },

    { apiId:"REV.12.11",          theme:"Batalha Espiritual", ref:"Apocalipse 12:11",
      ctx:"Os crentes venceram o diabo pelo sangue do Cordeiro, pela palavra do seu testemunho, e porque não amaram tanto a sua vida que temessem a morte. Três armas: sangue de Cristo, testemunho pessoal, e desapego da própria vida. A vitória espiritual não vem de rituais ou fórmulas — vem de estar fundamentado na obra de Cristo e disposto a qualquer custo." },

    { apiId:"2TI.2.3-2TI.2.4",   theme:"Batalha Espiritual", ref:"2 Timóteo 2:3-4",
      ctx:"Sofre as dificuldades como bom soldado de Jesus Cristo. Nenhum soldado em serviço se envolve nos negócios desta vida. Paulo usa a imagem militar para descrever o cristão: soldado que não divide atenção, que tem uma missão clara, que aceita o sofrimento como parte da campanha. O soldado de Cristo não é surpreso pelas baixas — ele veio preparado." },

    { apiId:"MAT.4.4",            theme:"Batalha Espiritual", ref:"Mateus 4:4",
      ctx:"No deserto, quando tentado, Jesus usou uma única arma: está escrito. A Palavra de Deus foi a espada que Jesus usou contra cada tentação do diabo. Não arguição filosófica, não experiência mística — a Palavra escrita. A batalha espiritual começa na mente, e a arma eficaz no campo mental é a Palavra de Deus interiorizada e falada em voz alta." },

    { apiId:"EPH.6.17",           theme:"Batalha Espiritual", ref:"Efésios 6:17",
      ctx:"Tomai o capacete da salvação e a espada do Espírito, que é a palavra de Deus. Em toda a armadura de Deus, há apenas uma arma ofensiva: a Palavra. O resto é defesa. A batalha espiritual se ganha não apenas defendendo — mas avançando com a Palavra. Cada proclamação fiel do evangelho é um avanço no território do inimigo." },

    { apiId:"ZEC.3.2",            theme:"Batalha Espiritual", ref:"Zacarias 3:2",
      ctx:"O Senhor disse ao adversário: o Senhor te repreenda, Satanás. A batalha espiritual tem uma dimensão que está acima do crente: o próprio Senhor que repreende o acusador. Quando você enfrenta acusação espiritual — vozes que dizem que você não presta, que está perdido — lembre: a repressão do adversário não é sua tarefa. É tarefa do Senhor." },

    { apiId:"PSA.91.11",          theme:"Batalha Espiritual", ref:"Salmos 91:11",
      ctx:"Ele ordenará seus anjos a teu respeito, para te guardar em todos os teus caminhos. A batalha espiritual não é travada sozinha — há exércitos angélicos envolvidos. Quando Eliseu pediu que os olhos do seu servo fossem abertos, ele viu: mais os que estavam com eles do que os que estavam com os inimigos. A batalha espiritual é desigual — a favor do crente." },

    { apiId:"1JN.4.4",            theme:"Batalha Espiritual", ref:"1 João 4:4",
      ctx:"Maior é o que está em vós do que o que está no mundo. João escreve para crentes que estavam rodeados de falsos profetas e espíritos contrários ao evangelho. E a garantia que ele dá é interna: Quem habita em você é maior. A batalha espiritual não é entre forças iguais. O Espírito Santo que habita no crente é infinitamente superior a qualquer força que se oponha." },

    { apiId:"NEH.4.14",           theme:"Batalha Espiritual", ref:"Neemias 4:14",
      ctx:"Neemias exorta o povo ameaçado: Lembrai-vos do Senhor, que é grande e tremendo. Quando o inimigo ameaça paralisar a obra de Deus, a resposta de Neemias não é melhor estratégia — é lembrar quem é Deus. Na batalha espiritual, a maior arma é a memória: lembrar quem você está servindo, e o que Ele já fez." },

    /* ── 41. VITÓRIA (12) ── */
    { apiId:"1CO.15.57",          theme:"Vitória",      ref:"1 Coríntios 15:57",
      ctx:"Graças a Deus, que nos dá a vitória por meio de nosso Senhor Jesus Cristo. Paulo está no final de um capítulo inteiro sobre a ressurreição — e a vitória sobre a morte é o clímax de tudo. A vitória não é conquistada pelo crente — é recebida. É dada. O tempo verbal é presente: Deus nos dá, continuamente. A vitória de Cristo sobre o sepulcro é a sua vitória hoje." },

    { apiId:"ROM.8.37",           theme:"Vitória",      ref:"Romanos 8:37",
      ctx:"Em todas estas coisas somos mais que vencedores por meio d'Aquele que nos amou. 'Mais que vencedores' — Paulo não encontra um único verbo para expressar a extensão da vitória. A linguagem transborda. E o fundamento não é o desempenho do crente — é o amor d'Aquele que venceu. Você vence porque está unido ao Vencedor." },

    { apiId:"JHN.16.33",          theme:"Vitória",      ref:"João 16:33",
      ctx:"No mundo tereis tribulações; mas tende bom ânimo, eu venci o mundo. Jesus não prometeu ausência de tribulação — prometeu que Ele já venceu o que vai te atacar. A vitória cristã não é viver sem oposição — é saber que o inimigo que você enfrenta já foi derrotado pela ressurreição. O resultado final não está em suspense." },

    { apiId:"REV.3.21",           theme:"Vitória",      ref:"Apocalipse 3:21",
      ctx:"Ao vencedor, eu lhe concederei sentar-se comigo no meu trono, assim como eu também venci e me sentei com meu Pai no seu trono. O Cristo ressurreto convida o crente perseverante para compartilhar do seu próprio trono. A vitória final do crente não é apenas pessoal — é participação na soberania de Cristo sobre toda a criação." },

    { apiId:"1JN.5.4",            theme:"Vitória",      ref:"1 João 5:4",
      ctx:"Tudo o que é nascido de Deus vence o mundo, e esta é a vitória que vence o mundo: a nossa fé. A fé é a vitória. Não a fé como sentimento — mas como fundamento. Quando você está firmado em Cristo, o mundo com toda a sua pressão, sedução e ameaça não consegue te arrancar do lugar onde você está. Isso é vencer." },

    { apiId:"DEU.20.4",           theme:"Vitória",      ref:"Deuteronômio 20:4",
      ctx:"Porque o Senhor vosso Deus é o que vai convosco, para pelear por vós contra os vossos inimigos, para salvar-vos. A vitória de Israel nas batalhas não era resultado de superioridade militar — era resultado da presença de Deus. Esse princípio não mudou. A vitória nas batalhas que você enfrenta hoje vem de Quem está indo à frente com você." },

    { apiId:"2CH.20.15",          theme:"Vitória",      ref:"2 Crônicas 20:15",
      ctx:"Não temais nem vos assusteis por causa desta grande multidão, porque a batalha não é vossa, mas de Deus. Josafá enfrentava exércitos muito maiores. E a palavra do Senhor foi: não é sua batalha. A vitória mais completa que Josafá alcançou na vida veio sem que ele precisasse lutar — veio de colocar a batalha nas mãos de Deus e adorar." },

    { apiId:"ISA.54.17",          theme:"Vitória",      ref:"Isaías 54:17",
      ctx:"Nenhuma arma forjada contra ti prosperará. Não que nenhuma arma será forjada — será. Mas nenhuma prosperará. A vitória prometida não é a ausência de oposição; é a garantia de que a oposição não vai cumprir o objetivo de destruir você. Isso não é otimismo ingênuo — é promessa do Deus que conhece cada inimigo e cada arma." },

    { apiId:"PSA.20.7",           theme:"Vitória",      ref:"Salmos 20:7",
      ctx:"Uns confiam em carros e outros em cavalos, mas nós nos lembramos do nome do Senhor nosso Deus. Davi escreve isso antes de uma batalha. A vitória não está no equipamento mais avançado — está em quem você está servindo. A história do povo de Deus é uma série de vitórias improváveis que só se explicam pelo Deus que estava com eles." },

    { apiId:"JOS.1.5",            theme:"Vitória",      ref:"Josué 1:5",
      ctx:"Ninguém te poderá resistir em todos os dias da tua vida; como fui com Moisés, assim serei contigo; não te deixarei, nem te abandonarei. Deus não promete ausência de resistência — promete que nenhuma resistência vai prevalecer. A vitória de Josué ao longo de décadas de batalha tinha uma base: a presença contínua de Deus que nunca foi embora." },

    { apiId:"PRO.21.31",          theme:"Vitória",      ref:"Provérbios 21:31",
      ctx:"O cavalo prepara-se para o dia da batalha, mas do Senhor provém a vitória. Prepare-se. Treine. Seja diligente. Provérbios não prega preguiça espiritual. Mas reconhece: depois de fazer tudo o que é possível fazer, a vitória pertence a Deus. Humildade e preparação não são opostas — são complementares na vida do crente que busca a vitória." },

    { apiId:"1SA.17.47",          theme:"Vitória",      ref:"1 Samuel 17:47",
      ctx:"Toda esta multidão saberá que o Senhor salva, não com espada nem com lança; porque do Senhor é a batalha. Davi disse isso antes de enfrentar Golias. Sem armadura, com uma funda. E ganhou. A vitória de Davi sobre Golias foi tão impossível que só podia ser de Deus — e foi exatamente assim que Deus quis que fosse. Para que ninguém duvidasse de quem havia vencido." },

    /* ── 42. AVIVAMENTO (12) ── */
    { apiId:"2CH.7.14",           theme:"Avivamento",   ref:"2 Crônicas 7:14",
      ctx:"Se o meu povo, que se chama pelo meu nome, se humilhar e orar, e buscar a minha face, e se converter dos seus maus caminhos, então eu ouvirei dos céus, perdoarei os seus pecados e sanarei a sua terra. As condições do avivamento são as mesmas em todas as gerações: humildade, oração, busca da face de Deus, e arrependimento. Avivamento não começa na rua — começa no coração do povo de Deus." },

    { apiId:"PSA.85.6",           theme:"Avivamento",   ref:"Salmos 85:6",
      ctx:"Não tornarás a nos dar vida, para que o teu povo se alegre em ti? O salmista ora por avivamento usando a palavra 'tornar' — ele já experimentou a vida de Deus antes, e agora clama pelo retorno dessa experiência. Avivamento é sempre uma memória e uma esperança ao mesmo tempo: o que Deus já fez antes é a evidência de que Ele pode fazer de novo." },

    { apiId:"HAB.3.2",            theme:"Avivamento",   ref:"Habacuque 3:2",
      ctx:"Senhor, ouvi a tua voz e temi; aviva a tua obra no meio dos anos. Habacuque ora por avivamento com urgência: no meio dos anos — não esperar pelo tempo ideal. Avivamento é sempre uma interrupção urgente que Deus faz no curso natural das coisas. O crente que clama por avivamento reconhece que o estado atual da Igreja não é suficiente." },

    { apiId:"ACT.3.19",           theme:"Avivamento",   ref:"Atos 3:19",
      ctx:"Arrependei-vos e convertei-vos, para que os vossos pecados sejam apagados, a fim de que venham os tempos do refrigério da parte do Senhor. Pedro liga arrependimento e refrigério — a palavra usada para os tempos de avivamento. Não há refrigério espiritual sem arrependimento anterior. O avivamento que Deus derrama é sempre recebido por corações que abriram mão do que estava ocupando o lugar d'Ele." },

    { apiId:"ISA.44.3",           theme:"Avivamento",   ref:"Isaías 44:3",
      ctx:"Porque derramarei água sobre o sedento e correntes sobre o solo árido; derramarei meu Espírito sobre a tua descendência. Água derramada sobre terra árida — essa é a imagem do avivamento. Não gotejamento, não irrigação gradual — derramamento. O Espírito de Deus invadindo uma cultura, uma cidade, uma geração que estava seca. Avivamento é chuva sobre o deserto." },

    { apiId:"EZK.37.3-EZK.37.5", theme:"Avivamento",   ref:"Ezequiel 37:3-5",
      ctx:"No vale dos ossos secos, Deus pergunta: podem estes ossos reviver? E Ezequiel, com sabedoria, responde: só tu o sabes. Então Deus ordena que ele profetize. Avivamento começa com a declaração da Palavra de Deus sobre o que está morto. Os ossos secos de uma geração podem reviver — mas alguém precisa profetizar. O avivamento é precedido por pregação fiel." },

    { apiId:"JOL.2.28",           theme:"Avivamento",   ref:"Joel 2:28",
      ctx:"Depois disto, derramarei o meu Espírito sobre toda a carne; os vossos filhos e as vossas filhas profetizarão. Pedro citou essa profecia no Pentecostes — era o cumprimento do que Joel havia anunciado. Mas o que aconteceu em Pentecostes foi primícias, não totalidade. A promessa é de um derramamento que alcança toda carne, toda geração, toda nação." },

    { apiId:"HOS.10.12",          theme:"Avivamento",   ref:"Oseias 10:12",
      ctx:"Semeai para vós em justiça, ceifai com misericórdia; arai o pousio, pois é tempo de buscar ao Senhor, até que venha e chova a justiça sobre vós. Oseias apresenta o avivamento como resultado de um preparo: arar o solo endurecido do coração, semear em justiça, e então aguardar a chuva de Deus. Avivamento exige tanto preparo humano quanto soberania divina." },

    { apiId:"ROM.13.11",          theme:"Avivamento",   ref:"Romanos 13:11",
      ctx:"É já hora de vós despertardes do sono, porque agora a salvação está mais perto de nós do que quando cremos. O avivamento começa com um despertar — do sono espiritual, da rotina sem vida, do cristianismo de hábito sem encontro real. Paulo fala com urgência: é hora. Não amanhã. Avivamento começa quando o povo de Deus para de dormir." },

    { apiId:"ACT.2.2-ACT.2.4",   theme:"Avivamento",   ref:"Atos 2:2-4",
      ctx:"Veio de repente do céu um som, como se soprara um vento impetuoso. Houve fogo. E foram todos cheios do Espírito Santo. Pentecostes é o protótipo de todo avivamento: súbito, soberano, irresistível. Não foi produzido pelo planejamento pastoral — foi derramado por Deus sobre pessoas que estavam unidas em oração. Avivamento é sempre mais de Deus do que do homem." },

    { apiId:"PSA.80.18-PSA.80.19", theme:"Avivamento",  ref:"Salmos 80:18-19",
      ctx:"Não nos abandonaremos de ti; aviva-nos, e invocaremos o teu nome. Restaura-nos, ó Deus dos Exércitos. O salmista conecta avivamento e louvor: quando Deus nos aviva, invocamos o Seu nome. A consequência do avivamento é sempre adoração. Uma geração avivada é uma geração que não consegue ficar quieta — porque o que está dentro dela precisa sair em louvor." },

    { apiId:"ISA.57.15",          theme:"Avivamento",   ref:"Isaías 57:15",
      ctx:"O Alto e o Sublime que habita a eternidade disse: habito também com o contrito e humilde de espírito, para reviver o espírito dos humildes e reanimar o coração dos contritos. Deus promete reanimar — o verbo usado é literalmente avivamento. E o endereço onde esse avivamento acontece é nos humildes e contritos. Avivamento não começa nos palcos — começa nos joelhos." },

    /* ── 43. INTIMIDADE COM DEUS (12) ── */
    { apiId:"PSA.27.4",           theme:"Intimidade com Deus", ref:"Salmos 27:4",
      ctx:"Uma coisa pedi ao Senhor, e a buscarei: que eu possa morar na casa do Senhor todos os dias da minha vida, para contemplar a beleza do Senhor. Davi tinha um único desejo central: estar na presença de Deus. Não pede milagres, não pede vitórias sobre inimigos — pede estar perto. A intimidade com Deus não é meio para um fim — ela própria é o fim." },

    { apiId:"EXO.33.11",          theme:"Intimidade com Deus", ref:"Êxodo 33:11",
      ctx:"E falava o Senhor com Moisés face a face, como se alguém fala com o seu amigo. Face a face. Como amigo. Em um mundo onde os sacerdotes tremiam de entrar no lugar santíssimo, Moisés tinha conversas. A intimidade com Deus não é prerrogativa de super-heróis da fé — é o resultado de buscar consistentemente a Sua face, dia após dia." },

    { apiId:"JHN.15.5",           theme:"Intimidade com Deus", ref:"João 15:5",
      ctx:"Eu sou a videira; vós sois os ramos. O que permanece em mim e eu nele, esse dá muito fruto. A intimidade que Jesus descreve não é uma experiência mística ocasional — é permanência. Ficar. Abrigar-se. O fruto não é produto do esforço — é o resultado natural de estar conectado à fonte. O ramo não se esforça para dar uvas — ele apenas permanece na videira." },

    { apiId:"PSA.139.1-PSA.139.3", theme:"Intimidade com Deus", ref:"Salmos 139:1-3",
      ctx:"Ó Senhor, tu me sondas e me conheces; tu sabes quando me sento e quando me levanto. A intimidade com Deus começa com uma percepção: Ele já te conhece completamente. Antes de você buscar conhecê-Lo, Ele já te conhecia. Isso não é assustador — é profundamente libertador. Você não precisa fingir na presença d'Ele. Ele já sabe tudo e ainda assim se aproxima." },

    { apiId:"HOS.6.3",            theme:"Intimidade com Deus", ref:"Oseias 6:3",
      ctx:"E conheceremos, e prosseguiremos a conhecer ao Senhor; como a alva é certa a sua saída. O profeta Oseias usa o verbo conhecer no sentido hebraico mais profundo — que inclui experiência, não apenas informação. E usa o gerúndio: prosseguiremos a conhecer. A intimidade com Deus não tem ponto de chegada — tem ritmo de progressão contínua." },

    { apiId:"ISA.43.4",           theme:"Intimidade com Deus", ref:"Isaías 43:4",
      ctx:"Porque és precioso aos meus olhos, e glorioso, e eu te amei. Deus fala isso diretamente ao Seu povo — não como declaração de teologia, mas como revelação de afeto. A intimidade com Deus não é fria nem burocrática. Ele usa a linguagem do amor pessoal: você é precioso aos meus olhos. Isso não é metáfora poética — é a postura real de Deus em relação a você." },

    { apiId:"MRK.1.35",           theme:"Intimidade com Deus", ref:"Marcos 1:35",
      ctx:"De manhã cedo, Jesus levantou-se, e foi a um lugar deserto, e ali orava. No dia mais movimentado descrito no Evangelho de Marcos, Jesus acordou cedo e foi orar sozinho. A intimidade com o Pai não era opcional para Jesus — era o combustível que alimentava tudo. Se o Filho precisava de momentos de estar só com o Pai, o que dizer do discípulo?" },

    { apiId:"SNG.2.16",           theme:"Intimidade com Deus", ref:"Cantares 2:16",
      ctx:"O meu amado é meu e eu sou dele. Cantares é o único livro da Bíblia que descreve o relacionamento entre Deus e o Seu povo em linguagem de amor conjugal — e os escritores do Novo Testamento confirmam essa leitura. A intimidade que Deus deseja não é a do servo obediente — é a do amado que pertence ao amado. É recíproca, exclusiva, apaixonada." },

    { apiId:"JAM.4.8",            theme:"Intimidade com Deus", ref:"Tiago 4:8",
      ctx:"Chegai-vos a Deus, e ele se chegará a vós. Tiago formula a reciprocidade mais simples e mais profunda da vida espiritual. Deus não está distante esperando que você prove que merece a aproximação. Quando você se move em direção a Ele, Ele se move em direção a você. A intimidade é responsabilidade compartilhada — e Deus sempre honra o seu passo." },

    { apiId:"REV.3.20",           theme:"Intimidade com Deus", ref:"Apocalipse 3:20",
      ctx:"Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir a porta, entrarei em sua casa e cearei com ele, e ele comigo. A ceia no mundo antigo era intimidade máxima — compartilhar a refeição significava comunhão real. Cristo não está pedindo para fazer um discurso — está pedindo para ceiar com você. A intimidade que Ele oferece é cotidiana, pessoal, à mesa." },

    { apiId:"LUK.10.39",          theme:"Intimidade com Deus", ref:"Lucas 10:39",
      ctx:"Maria sentou-se aos pés do Senhor e ouvia a Sua palavra. Marta estava ocupada com o serviço — bom, necessário. Mas Jesus disse que Maria havia escolhido a boa parte. A intimidade com Deus começa por aprender a estar, a sentar, a ouvir — antes de servir. O serviço que não nasce da intimidade vira obrigação. O que nasce dela é fruto." },

    /* ── 44. REVELAÇÃO (12) ── */
    { apiId:"1CO.2.9-1CO.2.10",   theme:"Revelação",    ref:"1 Coríntios 2:9-10",
      ctx:"O que os olhos não viram, nem os ouvidos ouviram, e não subiu ao coração do homem, são as coisas que Deus preparou para os que o amam. Mas Deus no-las revelou pelo Espírito. A revelação divina não é descoberta humana — é descida de Deus. O Espírito Santo sonda as profundezas de Deus e revela ao crente o que nenhum esforço intelectual alcançaria." },

    { apiId:"EPH.1.17-EPH.1.18",  theme:"Revelação",    ref:"Efésios 1:17-18",
      ctx:"Paulo ora para que Deus dê um espírito de sabedoria e revelação no pleno conhecimento d'Ele, e que os olhos do coração sejam iluminados. Há olhos físicos e há olhos do coração. A revelação que Paulo pede não é informação — é iluminação. Os mesmos fatos passam a ser vistos com clareza sobrenatural quando o Espírito ilumina o entendimento." },

    { apiId:"DAN.2.22",           theme:"Revelação",    ref:"Daniel 2:22",
      ctx:"Ele revela as coisas profundas e ocultas; conhece o que está em trevas, e com Ele mora a luz. Daniel disse isso ao receber a revelação do sonho do rei Nabucodonosor. A revelação divina não está limitada pelo contexto humano — Deus conhece o que está nas trevas e revela no tempo certo, ao coração preparado para receber." },

    { apiId:"AMO.3.7",            theme:"Revelação",    ref:"Amós 3:7",
      ctx:"Com efeito, o Senhor Deus não fará coisa alguma sem primeiro revelar o seu segredo aos seus servos, os profetas. Deus não opera em silêncio absoluto — Ele fala. A revelação profética não é exceção curiosa no Antigo Testamento — é expressão do caráter comunicativo de Deus. Ele é um Deus que fala. A questão é se há ouvidos atentos para ouvir." },

    { apiId:"MAT.16.17",          theme:"Revelação",    ref:"Mateus 16:17",
      ctx:"Bem-aventurado és tu, Simão Barjonas, porque não foi a carne e o sangue que isso te revelou, mas meu Pai que está nos céus. Quando Pedro confessou que Jesus era o Cristo, Jesus não o elogiou pela inteligência — mas pela receptividade à revelação do Pai. Entender quem Jesus é não é conclusão lógica — é revelação que vem do alto." },

    { apiId:"LUK.24.45",          theme:"Revelação",    ref:"Lucas 24:45",
      ctx:"Então lhes abriu o entendimento para compreenderem as Escrituras. Jesus não apenas ensinou — Ele abriu o entendimento. A Bíblia pode ser lida com entendimento fechado — e permanece letra sem vida. Quando Jesus abre o entendimento, o mesmo texto que parecia árido passa a transbordar em vida. A revelação é a abertura sobrenatural da mente para o sentido espiritual." },

    { apiId:"1SA.3.21",           theme:"Revelação",    ref:"1 Samuel 3:21",
      ctx:"O Senhor tornou a aparecer em Siló; porque o Senhor se revelou a Samuel em Siló, pela palavra do Senhor. A revelação a Samuel começou com uma voz na noite que ele não reconhecia — e que precisou de Eli para identificar. A receptividade à revelação às vezes requer aprendizado com os mais velhos na fé: aprender a reconhecer a voz de Deus." },

    { apiId:"JHN.14.26",          theme:"Revelação",    ref:"João 14:26",
      ctx:"O Consolador, o Espírito Santo, que o Pai enviará em meu nome, esse vos ensinará todas as coisas e vos fará lembrar de tudo o que vos tenho dito. A revelação do Espírito não substitui o que Jesus ensinou — ela ilumina. Ele recorda, aprofunda, aplica. O Espírito Santo é o principal agente de revelação na vida do crente depois da ressurreição. Ele está ensinando agora." },

    { apiId:"PRO.29.18",          theme:"Revelação",    ref:"Provérbios 29:18",
      ctx:"Quando não há visão profética, o povo se torna indisciplinado. Revelação e direção andam juntas. A ausência de revelação profética não é apenas privação espiritual — ela tem consequências práticas para o comportamento do povo. Uma comunidade sem revelação perde coesão, direção e disciplina. A revelação de Deus é o que mantém o povo orientado." },

    { apiId:"ISA.55.8-ISA.55.9",  theme:"Revelação",    ref:"Isaías 55:8-9",
      ctx:"Os meus pensamentos não são os vossos pensamentos, nem os vossos caminhos os meus caminhos. Como os céus são mais altos do que a terra, assim os meus caminhos são mais altos do que os vossos caminhos. A revelação é necessária exatamente porque os pensamentos de Deus são outros. Sem revelação, o crente navegaria com uma bússola humana tentando encontrar destinos que só existem no mapa de Deus." },

    { apiId:"JHN.8.32",           theme:"Revelação",    ref:"João 8:32",
      ctx:"Conhecereis a verdade, e a verdade vos libertará. Jesus conecta revelação e libertação. A verdade que liberta não é apenas correta — é revelada. Quando Deus revela uma verdade que vai contra o que você sempre acreditou sobre si mesmo, sobre Ele, sobre o mundo, essa revelação tem poder de transformar o que anos de esforço não conseguiram." },

    /* ── 45. PACIÊNCIA (12) ── */
    { apiId:"JAM.5.11",           theme:"Paciência",    ref:"Tiago 5:11",
      ctx:"Ouvistes a paciência de Jó, e vistes o fim que o Senhor lhe deu. A paciência de Jó não era serena — era angustiada, protestante, às vezes raivosa. Mas ela permaneceu. E o fim que o Senhor deu foi restauração. Paciência não é ausência de lamento — é recusa de abandonar a fé no meio do lamento. Deus honra esse tipo de paciência." },

    { apiId:"PSA.37.7",           theme:"Paciência",    ref:"Salmos 37:7",
      ctx:"Descansa no Senhor e aguarda por Ele; não te irrites com o que prospera em seu caminho. O salmista conecta paciência e descanso — não são opostos do agir, mas da ansiedade. Esperar por Deus não é passividade — é a recusa de tomar o controle da situação quando Deus ainda não mostrou o próximo passo. E é a recusa de se irritar com quem parece vencer sem Deus." },

    { apiId:"LAM.3.26",           theme:"Paciência",    ref:"Lamentações 3:26",
      ctx:"Bom é aguardar em silêncio a salvação do Senhor. Do livro mais trágico das Escrituras vem uma das afirmações mais serenas: bom é esperar em silêncio. O silêncio aqui não é resignação vazia — é a profundeza de quem passou pelo sofrimento e chegou a um lugar onde a fé não precisa mais gritar para ser real." },

    { apiId:"ISA.64.4",           theme:"Paciência",    ref:"Isaías 64:4",
      ctx:"Desde os tempos antigos não se ouviu, nem com os ouvidos se percebeu, nem com os olhos se viu outro Deus além de ti, que age a favor dos que nele confiam. Deus age — mas a favor de quem espera. A paciência não é passiva diante de um Deus inativo. É ativa diante de um Deus que está trabalhando nos bastidores por quem confia n'Ele." },

    { apiId:"HEB.10.36",          theme:"Paciência",    ref:"Hebreus 10:36",
      ctx:"Necessitais de perseverança para que, tendo cumprido a vontade de Deus, possais receber o que foi prometido. Entre fazer a vontade de Deus e receber a promessa existe um intervalo — e esse intervalo se atravessa com paciência. A promessa é certa. Mas o caminho entre onde você está e onde Deus prometeu exige a disposição de continuar confiando no intervalo." },

    { apiId:"ROM.15.4",           theme:"Paciência",    ref:"Romanos 15:4",
      ctx:"Tudo o que dantes foi escrito, para nosso ensino foi escrito, a fim de que pela perseverança e pela consolação das Escrituras tenhamos esperança. A paciência é alimentada pela Palavra. As histórias de Abraão esperando, de José sofrendo, de Davi fugindo — não estão na Bíblia para enfeite histórico. Estão para ensinar ao crente a paciência necessária para receber o que foi prometido." },

    { apiId:"2PE.3.9",            theme:"Paciência",    ref:"2 Pedro 3:9",
      ctx:"O Senhor não retarda a sua promessa, como alguns a julgam demorada; pelo contrário, é longânimo para convosco. A demora de Deus não é esquecimento nem indiferença — é longanimidade. O que parece lentidão do ponto de vista humano é misericórdia do ponto de vista divino. Paciência é ter perspectiva o suficiente para ver o atraso de Deus como bondade." },

    { apiId:"MIC.7.7",            theme:"Paciência",    ref:"Miquéias 7:7",
      ctx:"Eu, porém, esperarei pelo Senhor; aguardarei o Deus da minha salvação; o meu Deus me ouvirá. Miquéias usa quatro verbos de espera — e todos eles são ativos. Esperar, aguardar, esperar de novo. A paciência bíblica não é cruzar os braços — é manter os olhos fixos no Deus que certamente responde, mesmo quando a resposta ainda não chegou." },

    { apiId:"REV.14.12",          theme:"Paciência",    ref:"Apocalipse 14:12",
      ctx:"Aqui está a paciência dos santos: os que guardam os mandamentos de Deus e a fé em Jesus. João viu visões de tribulação intensa — e no meio delas identificou o que sustenta o povo de Deus: paciência. Não paciência passiva, mas paciência que guarda mandamentos e mantém a fé. A paciência apocalíptica é a forma mais refinada de fidelidade a Cristo." },

    { apiId:"LUK.21.19",          theme:"Paciência",    ref:"Lucas 21:19",
      ctx:"Pela vossa perseverança haveis de salvar a vossa alma. Jesus fala para discípulos que serão entregues, perseguidos, odiados. E a instrução final é: pela paciência vocês salvarão a alma. Não pela habilidade, não pelo poder — pela disposição de permanecer até o fim. A paciência que Jesus pede é a que permanece mesmo quando perder tudo parece inevitável." },

    { apiId:"ROM.5.3-ROM.5.4",    theme:"Paciência",    ref:"Romanos 5:3-4",
      ctx:"A tribulação produz perseverança, e a perseverança, caráter experimentado; e o caráter experimentado, esperança. Paulo descreve a cadeia de formação. A paciência não é o ponto de chegada — é o elo que une tribulação e caráter. Sem paciência, o sofrimento não produz nada útil; com ela, transforma-se em fundação sobre a qual o caráter real é construído." },

    { apiId:"GAL.6.9",            theme:"Paciência",    ref:"Gálatas 6:9",
      ctx:"Não nos cansemos de fazer o bem; pois a seu tempo ceifaremos, se não desanimarmos. Paulo fala de colheita certa — mas no tempo certo, não no tempo de quem plantou. A paciência no fazer o bem é especialmente difícil porque o bem feito muitas vezes não é reconhecido imediatamente. Mas a colheita vem. A sementeira fiel será honrada por Deus." },

    /* ── 46. MOTIVAÇÃO (12) ── */
    { apiId:"COL.3.23-COL.3.24",  theme:"Motivação",    ref:"Colossenses 3:23-24",
      ctx:"Tudo o que fizerdes, fazei-o de todo o coração, como para o Senhor e não para os homens. A motivação cristã transforma a natureza de cada tarefa. Quando você serve ao Senhor, não há trabalho insignificante. O empregado que trabalha com esse entendimento tem uma motivação que o chefe não consegue dar nem tirar — porque ela vem de uma audiência diferente." },

    { apiId:"1CO.10.31",          theme:"Motivação",    ref:"1 Coríntios 10:31",
      ctx:"Quer, pois, comais quer bebais, ou façais qualquer outra coisa, fazei tudo para a glória de Deus. Paulo inclui até o comer e o beber na esfera da motivação cristã. Não há compartimentos na vida do crente: nem o mais corriqueiro está fora do alcance da glória de Deus. Motivação não é apenas para as ações heroicas — é o espírito que impregna as menores." },

    { apiId:"2CO.5.14",           theme:"Motivação",    ref:"2 Coríntios 5:14",
      ctx:"O amor de Cristo nos constrange. Paulo usa uma palavra forte — constrager, compelir. Não é motivação sutil. O amor de Cristo é uma força que empurra para frente, que não deixa ficar parado. A melhor motivação para o ministério, para o serviço, para o sacrifício não é obrigação nem medo — é amor de Cristo que transborda." },

    { apiId:"HEB.12.2",           theme:"Motivação",    ref:"Hebreus 12:2",
      ctx:"Olhando para Jesus, autor e consumador da fé, o qual, pelo gozo que lhe estava proposto, suportou a cruz. A motivação de Jesus na cruz foi o gozo que estava além da dor — a redenção da humanidade, a reconciliação com o Pai, a reunião com os filhos. A motivação mais poderosa para qualquer sacrifício é a visão clara do que está do outro lado." },

    { apiId:"PHP.3.14",           theme:"Motivação",    ref:"Filipenses 3:14",
      ctx:"Prossigo para o alvo, para o prêmio da soberana vocação de Deus em Cristo Jesus. Paulo usa vocabulário de atleta: alvo, prêmio, prosseguir. A motivação que ele descreve é direcionada — tem um alvo. A fé sem alvo perde a energia. Mas quando você sabe para onde está indo e que Deus colocou esse alvo, a motivação não depende das circunstâncias do dia." },

    { apiId:"1TI.1.12",           theme:"Motivação",    ref:"1 Timóteo 1:12",
      ctx:"Agradecido estou àquele que me deu força: Cristo Jesus nosso Senhor, porque me considerou fiel, colocando-me no ministério. Paulo nunca esqueceu do que foi — perseguidor. E essa memória, longe de paralisá-lo, se tornou sua maior motivação. Quem recebeu muito é motivado a dar muito. A consciência da graça recebida é a fonte de motivação mais duradoura." },

    { apiId:"ROM.12.11",          theme:"Motivação",    ref:"Romanos 12:11",
      ctx:"No zelo, não negligentes; fervorosos no espírito; servindo ao Senhor. Paulo lista três qualidades da motivação: zeloso — não preguiçoso; fervoroso — espiritualmente aceso; servindo ao Senhor — com a audiência certa. A motivação que perde fogo é a que está servindo à audiência errada. Quem serve ao Senhor não precisa de aprovação humana para continuar." },

    { apiId:"NEH.2.17",           theme:"Motivação",    ref:"Neemias 2:17",
      ctx:"Vinde, reedifiquemos os muros de Jerusalém para que não sejamos mais opróbrio. Neemias motivou um povo desanimado com uma visão clara do propósito: não é apenas construir muros — é restaurar a dignidade de um povo. A motivação que move multidões sempre começa com uma visão de para que o trabalho existe, além do trabalho em si." },

    { apiId:"ACT.20.24",          theme:"Motivação",    ref:"Atos 20:24",
      ctx:"Mas de nenhuma coisa faço caso, nem tenho a minha vida por preciosa, contanto que complete a minha carreira e o ministério que recebi do Senhor Jesus. A motivação de Paulo era de uma radicalidade impressionante: a própria vida era secundária diante do ministério recebido. Motivação que não está disposta a custar nada acaba no primeiro obstáculo." },

    { apiId:"JHN.15.16",          theme:"Motivação",    ref:"João 15:16",
      ctx:"Não fostes vós que me escolhestes a mim, mas eu vos escolhi a vós. A motivação do crente está fundamentada numa escolha que precedeu a sua. Você não está servindo a Deus para ganhar aceitação — você foi escolhido antes de provar qualquer coisa. Essa segurança liberta a motivação de toda ansiedade de desempenho." },

    { apiId:"ECC.9.10",           theme:"Motivação",    ref:"Eclesiastes 9:10",
      ctx:"Tudo o que a tua mão encontrar para fazer, faze-o com todo o teu vigor. Qohéleth chega a uma conclusão prática: já que a vida é breve, faça o que faz com tudo que tem. Não procrastine, não faça pela metade, não espere condições perfeitas. A motivação saudável é aquela que se aplica à realidade do presente — não fica esperando uma situação ideal." },

    { apiId:"MAT.25.21",          theme:"Motivação",    ref:"Mateus 25:21",
      ctx:"Muito bem, servo bom e fiel! Foste fiel no pouco, sobre o muito te colocarei. O que motiva o servo fiel não é o tamanho da responsabilidade — é a fidelidade ao que foi confiado, qualquer que seja o tamanho. A perspectiva da avaliação final de Cristo é a motivação que sustenta o serviço fiel no anonimato, quando ninguém está vendo." },

    /* ── 47. GRATIDÃO (12) ── */
    { apiId:"1TH.5.18",           theme:"Gratidão",     ref:"1 Tessalonicenses 5:18",
      ctx:"Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco. Em tudo — não por tudo, mas em tudo. Paulo não está pedindo que você finja que o sofrimento é bom. Está pedindo que você encontre razão para gratidão mesmo dentro do difícil. É possível dar graças por um Deus fiel no meio de uma situação que ainda não se resolveu." },

    { apiId:"PHP.4.6",            theme:"Gratidão",     ref:"Filipenses 4:6",
      ctx:"Não andeis ansiosos por coisa alguma; mas em tudo fazei os vossos pedidos conhecidos diante de Deus, por meio de oração e súplica com ação de graças. Paulo não pede apenas oração — pede oração com gratidão. A gratidão transforma a qualidade da oração: em vez de chegar a Deus em pânico, você chega reconhecendo que Ele já foi fiel antes." },

    { apiId:"COL.3.15",           theme:"Gratidão",     ref:"Colossenses 3:15",
      ctx:"E sede agradecidos. A frase mais curta do texto — mas talvez a mais profunda. Paulo lista muitas virtudes e no final diz: e sejam gratos. A gratidão é o verniz que dá brilho a todas as outras virtudes. Bondade sem gratidão vira obrigação. Serviço sem gratidão vira ressentimento. A gratidão é o que mantém tudo no motivo certo." },

    { apiId:"HEB.12.28",          theme:"Gratidão",     ref:"Hebreus 12:28",
      ctx:"Tendo, pois, recebido um reino inabalável, retenhamos a graça, e com ela sirvamos a Deus de modo agradável, com reverência e temor. A gratidão aqui está ligada à percepção do que foi recebido: um reino inabalável. Quando você tem consciência do peso do que Deus já deu, a gratidão não é algo que você produz por esforço — ela transborda da percepção." },

    { apiId:"LUK.17.17-LUK.17.18", theme:"Gratidão",   ref:"Lucas 17:17-18",
      ctx:"Não foram dez os purificados? Onde estão os outros nove? Dos dez leprosos curados, um voltou para agradecer — e Jesus notou a ausência dos outros nove. Gratidão não é algo que acontece automaticamente quando você recebe uma bênção. É uma escolha que poucos fazem. E é uma escolha que Deus nota — tanto quando está presente quanto quando está ausente." },

    { apiId:"PSA.103.2",          theme:"Gratidão",     ref:"Salmos 103:2",
      ctx:"Bendize, ó minha alma, ao Senhor, e não te esqueças de nenhum dos Seus benefícios. A gratidão bíblica é memória ativa. O salmista sabe que a alma esquece o que Deus fez — e por isso comanda a si mesmo: não esqueças. A prática de lembrar das bênçãos de Deus não é piegas — é espiritual. A ingratidão começa sempre no esquecimento." },

    { apiId:"2CO.9.15",           theme:"Gratidão",     ref:"2 Coríntios 9:15",
      ctx:"Graças a Deus pelo seu dom inefável! No final de uma seção sobre oferta generosa, Paulo termina com uma exclamação de gratidão pelo Filho. A dádiva de Cristo é tão grande que ultrapassa a capacidade de descrição — inefável. Quando você vê o Dom que Deus deu em Cristo, todas as outras expressões de gratidão ficam em perspectiva certa." },

    { apiId:"JHN.6.11",           theme:"Gratidão",     ref:"João 6:11",
      ctx:"Jesus tomou os pães e, tendo dado graças, distribuiu. Antes de realizar o milagre de alimentar cinco mil pessoas, Jesus deu graças por cinco pães e dois peixes — completamente insuficientes para a necessidade. Gratidão antes do milagre, não depois. Agradecer pelo pouco que você tem é o ato de fé que antecede o que Deus vai multiplicar." },

    { apiId:"PSA.100.4",          theme:"Gratidão",     ref:"Salmos 100:4",
      ctx:"Entrai pelas suas portas com ação de graças, pelos seus átrios com louvor. A gratidão é a porta de entrada para a presença de Deus. Não um ritual religioso — uma postura de coração. Quando você chega a Deus reconhecendo o que Ele já fez, você entra numa dimensão de adoração que o pedido sozinho nunca alcançaria." },

    { apiId:"DAN.6.10",           theme:"Gratidão",     ref:"Daniel 6:10",
      ctx:"Daniel ajoelhou-se três vezes ao dia, orando e louvando a Deus, como costumava fazer antes. O detalhe 'louvando' está presente mesmo diante da ameaça de morte. A gratidão de Daniel não era condicional ao ambiente favorável — era hábito profundamente enraizado que nem decreto real conseguia apagar. Esse é o destino da gratidão que se torna caráter." },

    { apiId:"REV.7.12",           theme:"Gratidão",     ref:"Apocalipse 7:12",
      ctx:"A bênção e a glória e a sabedoria e a ação de graças e a honra e o poder e a força sejam ao nosso Deus eternamente. No céu, entre todas as coisas que os seres celestiais fazem, a ação de graças ocupa lugar central. A gratidão não é virtude que caduca com o fim da vida — ela é prática eterna, porque o que Deus fez sempre merecerá reconhecimento." },

    /* ── 48. OBEDIÊNCIA (12) ── */
    { apiId:"JHN.14.15",          theme:"Obediência",   ref:"João 14:15",
      ctx:"Se me amardes, guardareis os meus mandamentos. Jesus conecta obediência e amor — não como condição para ser amado, mas como consequência de amar. A obediência que brota do amor é completamente diferente da obediência que nasce do medo. Uma é expressão de relacionamento; a outra é tentativa de gerenciar punição. Jesus pede a primeira." },

    { apiId:"1SA.15.22",          theme:"Obediência",   ref:"1 Samuel 15:22",
      ctx:"Porventura tem o Senhor tanto prazer em holocaustos e sacrifícios como em se obedecer à voz do Senhor? Eis que a obediência é melhor do que o sacrifício. Samuel disse isso a Saul, que havia desobedecido a Deus e tentado compensar com sacrifício. A religiosidade externa nunca compensa a desobediência interna. Deus quer o coração que obedece — não a oferta que substitui o obedecer." },

    { apiId:"ACT.5.29",           theme:"Obediência",   ref:"Atos 5:29",
      ctx:"É necessário obedecer a Deus antes que aos homens. Pedro disse isso ao Sinédrio — que tinha autoridade legal e poder punitivo sobre ele. A obediência a Deus não elimina o respeito à autoridade humana — mas estabelece uma hierarquia clara quando entram em conflito. Há um momento em que o crente precisa saber a quem obedece em última instância." },

    { apiId:"DEU.11.1",           theme:"Obediência",   ref:"Deuteronômio 11:1",
      ctx:"Amarás, pois, ao Senhor teu Deus, e guardarás os Seus preceitos, os Seus estatutos, os Seus juízos e os Seus mandamentos todos os dias. A obediência aqui está precedida pelo amor — e o amor precedido pela memória do que Deus fez. Moisés não pede obediência como dever frio. Ele a pede como resposta natural de um povo que experimentou a fidelidade de Deus." },

    { apiId:"ISA.1.19",           theme:"Obediência",   ref:"Isaías 1:19",
      ctx:"Se quiserdes e ouvirdes, comereis o bem da terra. Deus coloca uma conexão simples: obediência e bênção. Não como negociação comercial — como princípio de Reino. A terra que Deus prometeu não é alcançada pelo talento nem pela força — é habitada por quem ouve e obedece. A obediência abre portas que nenhuma outra chave consegue abrir." },

    { apiId:"ROM.6.17",           theme:"Obediência",   ref:"Romanos 6:17",
      ctx:"Mas graças a Deus, que, embora fôsseis escravos do pecado, obedecestes de coração ao padrão de ensino ao qual fostes entregues. A obediência que Paulo descreve aqui é de coração — não superficial, não apenas comportamental. E o movimento é de dentro para fora: o coração foi entregue a um padrão de ensino, e a vida seguiu. Obediência real sempre começa por dentro." },

    { apiId:"PHP.2.8",            theme:"Obediência",   ref:"Filipenses 2:8",
      ctx:"Humilhou-se a si mesmo, tornando-se obediente até a morte e morte de cruz. A maior expressão de obediência na história foi a de Cristo no Getsêmani e no Calvário. Quando Paulo pede obediência aos filipenses no versículo seguinte, ele acabou de mostrar o padrão: o próprio Jesus. A obediência do crente é participação no espírito de Cristo." },

    { apiId:"JAS.1.22",           theme:"Obediência",   ref:"Tiago 1:22",
      ctx:"Sede cumpridores da palavra e não somente ouvintes, iludindo-vos a vós mesmos. Tiago denuncia uma forma específica de autoengano: ouvir sem obedecer. A escuta da Palavra sem aplicação não é neutra — ela endurece. Quanto mais você ouve e não faz, mais difícil fica fazer. Obediência é a tradução da fé em realidade cotidiana." },

    { apiId:"LUK.6.46",           theme:"Obediência",   ref:"Lucas 6:46",
      ctx:"Por que me chamais Senhor, Senhor, e não fazeis o que eu digo? A pergunta de Jesus é uma das mais desconcertantes do Evangelho. Chamar Jesus de Senhor sem obedecer ao que Ele diz não é fé — é uma contradição verbal. Senhor implica soberania. Soberania implica que o que Ele diz vale. A obediência é a prova de que o título que você usa é real." },

    { apiId:"HEB.11.8",           theme:"Obediência",   ref:"Hebreus 11:8",
      ctx:"Pela fé, Abraão, sendo chamado, obedeceu, saindo para um lugar que havia de receber por herança; e partiu sem saber para onde ia. A obediência de Abraão foi radical: sem destino conhecido, sem certeza humana, apenas na base da palavra de Deus. A obediência que a fé produz não espera pela compreensão completa — ela age na confiança de Quem chamou." },

    { apiId:"MRK.1.18",           theme:"Obediência",   ref:"Marcos 1:18",
      ctx:"E logo deixaram as redes e o seguiram. Marcos usa a palavra 'logo' — imediato. Quando Jesus chamou os primeiros discípulos, a obediência não foi processada, negociada nem adiada. Era redes no chão e pés em movimento. A velocidade da obediência revela o nível de confiança em quem está chamando." },

    { apiId:"EXO.19.5",           theme:"Obediência",   ref:"Êxodo 19:5",
      ctx:"Se diligentemente ouvirdes a minha voz e guardardes a minha aliança, então sereis a minha propriedade peculiar dentre todos os povos. A obediência do povo de Deus não é a de servos que temem o capataz — é a de um povo que foi escolhido para ser propriedade peculiar. A obediência é o lado do crente na aliança com o Deus que já prometeu fidelidade." },

      /* ── 49. JESUS CRISTO (12) ── */
    { apiId:"JHN.1.14",            theme:"Jesus Cristo",  ref:"João 1:14",
        ctx:"O Verbo se fez carne e habitou entre nós. Esse é o versículo mais explosivo da história: o eterno se tornou temporal, o infinito se tornou finito. Deus não enviou uma mensagem — Ele mesmo veio. E não veio de forma gloriosa, num palácio. Veio como bebê, numa estrebaria. A encarnação é a declaração mais radical de amor que o universo já viu." },
  
      { apiId:"COL.1.15",            theme:"Jesus Cristo",  ref:"Colossenses 1:15",
        ctx:"Paulo chama Jesus de imagem do Deus invisível — o primogênito de toda a criação. Isso não é metáfora. É a afirmação de que se você quer saber como Deus é, olhe para Jesus. Toda a bondade, toda a santidade, toda a misericórdia de Deus foi comprimida num corpo humano e colocada diante dos seus olhos." },
  
      { apiId:"PHP.2.9-PHP.2.10",    theme:"Jesus Cristo",  ref:"Filipenses 2:9-10",
        ctx:"Por causa da obediência até a morte, Deus exaltou Jesus e lhe deu o nome acima de todo nome. A exaltação de Cristo não é separada da cruz — ela é a resposta do Pai à entrega do Filho. Um dia todo joelho dobrar e toda língua confessar: Jesus Cristo é o Senhor. Isso ainda vai acontecer. E é melhor dobrar agora por amor do que dobrar depois por obrigação." },
  
      { apiId:"HEB.4.15",            theme:"Jesus Cristo",  ref:"Hebreus 4:15",
        ctx:"Não temos um sumo sacerdote que não possa compadecer-se das nossas fraquezas. Jesus não é um Deus distante que observa o sofrimento humano de longe. Ele teve fome, teve medo, sofreu rejeição, sentiu a dor da traição. Ele sabe o que é estar onde você está. E por isso ele intercede — não com indiferença, mas com compaixão real." },
  
      { apiId:"JHN.11.25",           theme:"Jesus Cristo",  ref:"João 11:25",
        ctx:"Jesus disse isso diante do túmulo de Lázaro, para uma irmã destroçada pelo luto. Eu sou a ressurreição e a vida. Não 'eu vou ressuscitar os mortos um dia'. Eu sou. Presente. Ativo. A ressurreição não é um evento futuro distante — é uma Pessoa que está com você agora. E quem tem essa Pessoa tem a vitória sobre a morte." },
  
      { apiId:"MAT.11.28",           theme:"Jesus Cristo",  ref:"Mateus 11:28",
        ctx:"Essa é a voz de Jesus para todos os que estão esgotados — esgotados de tentar, de performar, de carregar peso que nunca deveriam carregar. Vinde a mim. Não para um sistema religioso, não para uma lista de regras — a Ele mesmo. O descanso que Jesus oferece não é ausência de atividade. É presença d'Aquele que tira o peso do ombro e o coloca nos Seus." },
  
      { apiId:"COL.2.9",             theme:"Jesus Cristo",  ref:"Colossenses 2:9",
        ctx:"Em Cristo habita corporalmente toda a plenitude da divindade. Paulo diz isso para uma igreja que estava sendo tentada a adicionar filosofia, misticismo e ritual à fé. A resposta é: em Cristo você já tem tudo. Não precisa de mais nada além d'Ele. Você não precisa de um Cristo mais espiritualidade humana — Cristo é suficiente." },
  
      { apiId:"ISA.53.5",            theme:"Jesus Cristo",  ref:"Isaías 53:5",
        ctx:"Escrito 700 anos antes da cruz, esse versículo descreve com precisão o que Jesus carregou no Calvário. Ele foi ferido pelas nossas transgressões, moído pelas nossas iniquidades. Não pelos Seus pecados — pelos seus. Cada ferida Dele tem o seu nome. Cada açoite Dele foi sofrido no Seu lugar. Isso é substituição — e é a base de tudo que você tem em Deus." },
  
      { apiId:"ACT.4.12",            theme:"Jesus Cristo",  ref:"Atos 4:12",
        ctx:"Pedro disse isso diante do Sinédrio, depois de curar um coxo no nome de Jesus. E foi direto: não há salvação em nenhum outro. Não há outro nome debaixo do céu dado aos homens pelo qual devamos ser salvos. Numa cultura que quer dizer que todos os caminhos levam a Deus, essa declaração é incômoda — mas é a verdade que salva." },
  
      { apiId:"REV.1.17-REV.1.18",   theme:"Jesus Cristo",  ref:"Apocalipse 1:17-18",
        ctx:"João cai como morto diante do Cristo glorificado. E Jesus coloca a mão sobre ele e diz: não temas. Eu sou o primeiro e o último. Eu tenho as chaves da morte e do inferno. Esse é o Cristo total — não só o manso de Belém, não só o servo do Calvário. É o Rei ressurreto, com toda autoridade, e ainda assim dizendo ao Seu servo: não temas." },
  
      { apiId:"JHN.14.6",            theme:"Jesus Cristo",  ref:"João 14:6",
        ctx:"Tomé perguntou como chegar ao Pai, e Jesus respondeu com uma das afirmações mais absolutas que já saíram de lábios humanos: Eu sou o caminho, a verdade e a vida. Não um caminho entre outros. Não uma verdade parcial. Não uma forma de vida entre várias. O artigo definido não foi acidente — Jesus é a única rota de acesso ao Pai." },
  
      { apiId:"ROM.8.34",            theme:"Jesus Cristo",  ref:"Romanos 8:34",
        ctx:"Quem é que condena? Cristo Jesus é quem morreu, sim, e ressuscitou, e está à direita de Deus, e também intercede por nós. Enquanto o acusador trabalha para te condenar, Jesus trabalha para te defender. Ele não apenas morreu pelo seu pecado — Ele está agora mesmo, neste momento, intercedendo por você diante do Pai. Isso é o que você tem em Cristo." },
  
      /* ── 50. UNÇÃO (12) ── */
      { apiId:"ISA.61.1",            theme:"Unção",         ref:"Isaías 61:1",
        ctx:"Esse é o texto que Jesus leu na sinagoga de Nazaré e declarou: hoje se cumpriu esta Escritura. A unção do Espírito não é ornamento — é equipamento. O ungido foi enviado para curar os quebrantados, proclamar liberdade aos cativos, abrir os olhos dos cegos. A unção sempre tem um alvo: as necessidades humanas. Não é para impressionar — é para libertar." },
  
      { apiId:"1JN.2.27",            theme:"Unção",         ref:"1 João 2:27",
        ctx:"João escreve para uma comunidade que estava sendo enganada por falsos mestres. E ele lembra: a unção que vocês receberam de Cristo permanece em vocês. O Espírito Santo não é um visitante ocasional — Ele habita. E a unção Dele ensina de dentro para fora, com autoridade que nenhum mestre humano consegue substituir." },
  
      { apiId:"ZEC.4.6",             theme:"Unção",         ref:"Zacarias 4:6",
        ctx:"Deus disse isso a Zorobabel, que estava tentando reconstruir o templo com recursos humanos mínimos. Não por força nem por violência, mas pelo meu Espírito. A unção não é um acréscimo ao esforço humano — ela é o que torna o esforço humano capaz de fazer o que é impossível. Zorobabel não tinha exército nem dinheiro. Tinha a unção. Era suficiente." },
  
      { apiId:"ACT.10.38",           theme:"Unção",         ref:"Atos 10:38",
        ctx:"Pedro descreveu o ministério de Jesus para Cornélio com uma frase: Deus o ungiu com o Espírito Santo e com poder, e ele andou fazendo o bem e curando todos os oprimidos pelo diabo. A unção e o poder andam juntos — mas o fruto deles é prático: fazer o bem, curar, libertar. A unção autêntica sempre transforma vidas reais, não apenas momentos de culto." },
  
      { apiId:"PSA.23.5",            theme:"Unção",         ref:"Salmos 23:5",
        ctx:"Ungiste a minha cabeça com óleo — e isso acontece à mesa, na presença dos inimigos. A unção de Deus não chega apenas nos momentos de paz. Ela chega exatamente quando você está rodeado de adversários, de pressão, de ameaça. A unção é o sinal visível de que Deus escolheu você naquele momento — e nenhum inimigo pode cancelar o que Deus confirma." },
  
      { apiId:"LUK.4.18",            theme:"Unção",         ref:"Lucas 4:18",
        ctx:"Jesus leu Isaías 61 e declarou seu cumprimento naquele dia. O Espírito do Senhor está sobre mim — não estava, não vai estar. Está. A unção de Cristo era presente, ativa e direcionada: para os pobres, os cativos, os cegos, os oprimidos. A unção não é um estado permanente de destaque espiritual — é uma comissão com missão definida e pessoas definidas para alcançar." },
  
      { apiId:"1SA.16.13",           theme:"Unção",         ref:"1 Samuel 16:13",
        ctx:"Samuel ungiu Davi no meio dos seus irmãos — o menor, o que nem havia sido chamado para a cerimônia. E o Espírito do Senhor veio com poder sobre Davi desde aquele dia em diante. A unção não segue os critérios humanos de tamanho, posição ou currículo. Deus unge quem Ele escolhe. E quando Ele escolhe, o Espírito vem — e permanece." },
  
      { apiId:"2CO.1.21",            theme:"Unção",         ref:"2 Coríntios 1:21",
        ctx:"Paulo diz que é Deus quem nos confirma em Cristo e nos ungiu. A unção não é algo que você produz em si mesmo, que você conquista pela dedicação espiritual intensa. É Deus que ungiu. Toda a obra de confirmação, de estabelecimento, de equipamento — vem d'Ele. O crente recebe; Deus é quem concede." },
  
      { apiId:"EXO.30.30",           theme:"Unção",         ref:"Êxodo 30:30",
        ctx:"Aarão e seus filhos foram ungidos para o serviço sacerdotal — separados, consagrados, identificados como pertencentes a Deus para uma função específica. A unção no Antigo Testamento era sinal de separação: esta pessoa foi retirada do ordinário e destinada ao sagrado. Para o crente do Novo Testamento, a unção do Espírito cumpre esse mesmo propósito: você foi separado para Deus." },
  
      { apiId:"1KI.19.16",           theme:"Unção",         ref:"1 Reis 19:16",
        ctx:"Deus ordenou a Elias que ungisse Eliseu como profeta em seu lugar. A unção é transferível na soberania de Deus — não como posse pessoal, mas como delegação divina. Eliseu pediu dobrada porção do espírito de Elias, e a recebeu. Isso revela que a unção não é limitada pela capacidade humana — é limitada apenas pela vontade de Deus em concedê-la." },
  
      { apiId:"PSA.45.7",            theme:"Unção",         ref:"Salmos 45:7",
        ctx:"Deus te ungiu com óleo de alegria mais do que aos teus companheiros. Hebreus cita esse versículo aplicado a Cristo — o Ungido acima de todos os ungidos. A unção mais profunda já dada foi a do Filho. E o que é dado ao Filho transborda para os que estão n'Ele. A unção que o crente recebe é participação na unção de Cristo." },
  
      { apiId:"ACT.1.8",             theme:"Unção",         ref:"Atos 1:8",
        ctx:"Recebereis poder quando o Espírito Santo vier sobre vós — e sereis minhas testemunhas. Jesus conectou diretamente a vinda do Espírito com o poder para testemunhar. A unção do Pentecostes não foi um fenômeno de uma geração. Foi o padrão para a missão da Igreja. Você não foi chamado a testemunhar no seu próprio poder — foi chamado a esperar pelo poder que equipa." },
  
      { apiId:"ISA.10.27",           theme:"Unção",         ref:"Isaías 10:27",
        ctx:"O jugo será destruído por causa da unção. Essa imagem é de um boi carregando um jugo pesado no pescoço — e a gordura resultante do crescimento saudável do animal que parte o jugo. A unção não apenas alivia o peso — ela quebra o instrumento da opressão. Há coisas que o esforço humano não consegue romper. A unção quebra." },
  
      /* ── 51. DONS E TALENTOS (12) ── */
      { apiId:"ROM.12.6-ROM.12.8",   theme:"Dons e Talentos", ref:"Romanos 12:6-8",
        ctx:"Paulo lista dons diferentes — profecia, serviço, ensino, exortação, generosidade, liderança, misericórdia — e diz: use cada um conforme a graça que foi dada. O ponto não é o dom em si. É que cada dom veio de uma graça recebida. Você não é dono do seu talento — você é administrador de algo que Deus depositou em você para servir os outros." },
  
      { apiId:"1CO.12.4-1CO.12.6",   theme:"Dons e Talentos", ref:"1 Coríntios 12:4-6",
        ctx:"Há diversidade de dons, mas um mesmo Espírito. Paulo repete três vezes a mesma estrutura: diversidade na expressão, unidade na origem. Isso mata dois problemas de uma vez: o orgulho de quem tem certos dons, e a insegurança de quem tem outros. Todos vieram do mesmo Espírito, para o mesmo propósito, para o mesmo Senhor." },
  
      { apiId:"MAT.25.14-MAT.25.15", theme:"Dons e Talentos", ref:"Mateus 25:14-15",
        ctx:"Na parábola dos talentos, o senhor distribui a cada servo segundo a sua própria capacidade — não igualmente, mas proporcionalmente. Deus conhece o que você pode administrar. A questão não é quanto você recebeu; é o que você fez com o que recebeu. O servo que ganhou dois foi tão elogiado quanto o que ganhou cinco. O critério é fidelidade, não volume." },
  
      { apiId:"1PE.4.10",            theme:"Dons e Talentos", ref:"1 Pedro 4:10",
        ctx:"Cada um administre o dom que recebeu como bom mordomo da multiforme graça de Deus. A palavra mordomo muda tudo. Mordomo não é dono — é responsável pelo que pertence ao outro. Seus dons não existem para o seu sucesso pessoal, para a sua plataforma, para o seu destaque. Existem para servir. E a prestação de contas será ao Dono, não à plateia." },
  
      { apiId:"EXO.31.2-EXO.31.3",   theme:"Dons e Talentos", ref:"Êxodo 31:2-3",
        ctx:"Deus disse a Moisés que havia chamado Bezalel e o encheu do Espírito de Deus, de sabedoria, inteligência, conhecimento e toda a habilidade artesanal. O primeiro homem descrito nas Escrituras como cheio do Espírito de Deus era um artesão — não um profeta, não um sacerdote. Deus unge habilidades manuais, criativas e técnicas tanto quanto unge ministérios espirituais." },
  
      { apiId:"PRO.22.29",           theme:"Dons e Talentos", ref:"Provérbios 22:29",
        ctx:"Viste um homem hábil na sua obra? Ele se colocará diante de reis. A excelência no uso dos seus dons abre portas que nenhum relacionamento humano conseguiria abrir. Não é o favor humano que leva você às salas certas — é o desenvolvimento fiel daquilo que Deus colocou em você. A habilidade cultivada tem alcance providencial." },
  
      { apiId:"1CO.12.7",            theme:"Dons e Talentos", ref:"1 Coríntios 12:7",
        ctx:"A manifestação do Espírito é dada para o proveito de todos. Paulo elimina de vez a ideia de que os dons espirituais existem para a edificação pessoal de quem os recebe. Cada dom foi projetado para fora — para a comunidade, para o corpo. Quando você usa seus dons para si mesmo, você está usando mal o que foi dado para outros." },
  
      { apiId:"2TI.1.6",             theme:"Dons e Talentos", ref:"2 Timóteo 1:6",
        ctx:"Paulo exorta Timóteo a ativar o dom de Deus que estava nele pela imposição das mãos. A imagem é de brasa: o dom está lá, mas precisa ser soprado, alimentado, avivado. Dons dados por Deus podem adormecer por timidez, insegurança ou negligência. A responsabilidade de avivar o que foi dado é do portador do dom — não de mais ninguém." },
  
      { apiId:"EPH.4.11-EPH.4.12",   theme:"Dons e Talentos", ref:"Efésios 4:11-12",
        ctx:"Cristo deu apóstolos, profetas, evangelistas, pastores e mestres com uma finalidade: equipar os santos para a obra do ministério. Os dons ministeriais não existem para concentrar o serviço numa elite espiritual — existem para equipar o povo de Deus a servir. O destino do dom sempre é o fortalecimento do corpo inteiro, nunca o prestígio de quem o carrega." },
  
      { apiId:"MAT.5.15",            theme:"Dons e Talentos", ref:"Mateus 5:15",
        ctx:"Jesus disse que ninguém acende uma candeia e a coloca debaixo do alqueire. Há um absurdo intencional na imagem: para que acender uma luz se você vai escondê-la? Esconder seus dons por humildade mal entendida não é virtude — é desperdício. A luz foi feita para iluminar. O dom foi feito para ser exercido. Colocá-lo debaixo do alqueire prejudica todos ao redor." },
  
      { apiId:"1CO.14.12",           theme:"Dons e Talentos", ref:"1 Coríntios 14:12",
        ctx:"Paulo diz: já que vocês são zelosos pelos dons espirituais, busquem ser abundantes naqueles que edificam a Igreja. O entusiasmo pelos dons é bom — mas ele precisa ser direcionado. O critério de Paulo para avaliar um dom em funcionamento é simples: a Igreja está sendo edificada? Não: você está se sentindo mais espiritual?" },
  
      { apiId:"JHN.3.27",            theme:"Dons e Talentos", ref:"João 3:27",
        ctx:"João Batista disse: o homem não pode receber coisa alguma, se não lhe for dada do céu. Ele disse isso num momento em que seus próprios discípulos estavam com ciúmes de Jesus crescendo. E João não sentiu ameaça — porque sabia que o que ele tinha veio de cima, não de si mesmo. Quando você sabe que seu dom veio de Deus, você não precisa competir com ninguém." },
];