let dicionarioPaises = {};
let dicionarioPaisesInverso = {};
let dicionarioMoedas = {};
let dicionarioCapitais = {};
let dicionarioLinguas = {};
let dicionarioRegioes = {};
let dicionarioSubRegioes = {};

// Tradução dos nomes dos países para json

fetch("Traduções/Tradução_Países.json")
     .then((response) => response.json())
     .then((data) => {
          dicionarioPaises = data;

          // Trocando o valor dos países, para aceitar nomes em português
          for (const [ingles, portugues] of Object.entries(dicionarioPaises)) {
               dicionarioPaisesInverso[portugues.toLowerCase()] = ingles;
          }

          console.log("Dicionário de países carregado.");
     })
     .catch((error) => {
          console.log("Erro ao carregar o dicionário de países: ", error);
     });

// Tradução das moedas

fetch("Traduções/Tradução_Moedas.json")
     .then((response) => response.json())
     .then((data) => {
          dicionarioMoedas = data;

          console.log("Dicionário de moedas carregado.");
     })
     .catch((error) => {
          console.log("Erro ao carregar o dicionário de moedas: ", error);
     });

// Tradução das capitais

fetch("Traduções/Tradução_Capitais.json")
     .then((response) => response.json())
     .then((data) => {
          dicionarioCapitais = data;

          console.log("Dicionário de capitais carregado.");
     })
     .catch((error) => {
          console.error("Erro ao carregar o dicionário de moedas: ", error);
     });

// Tradução dos idiomas

fetch("Traduções/Tradução_Línguas.json")
     .then((response) => response.json())
     .then((data) => {
          dicionarioLinguas = data;

          console.log("Dicionário de línguas carregadas.");
     })
     .catch((error) => {
          console.log("Erro ao carregar o dicionário de línguas: ", error);
     });

// Tradução das regiões

fetch("Traduções/Tradução_Regiões.json")
     .then((response) => response.json())
     .then((data) => {
          dicionarioRegioes = data;

          console.log("Dicionário de regiões carregado.");
     })
     .catch((error) => {
          console.log("Erro ao carregar o dicionário de regiões: ", error);
     });

// Tradução das subregiões

fetch("Traduções/Tradução_SubRegiões.json")
     .then((response) => response.json())
     .then((data) => {
          dicionarioSubRegioes = data;

          console.log("Dicionário de subregiões carregado.");
     })
     .catch((error) => {
          console.error("Erro ao carregar o dicionário de subregiões: ", error);
     });

function receber_pais() {
     // Recebendo o nome do país em português, e buscando os dados com seu nome em inglês
     const nome = document.getElementById("pais").value.trim();
     const nomeInverso = dicionarioPaisesInverso[nome.toLowerCase()] || nome;

     const url = `https://restcountries.com/v3.1/name/${nomeInverso}?fullText=true`;

     // Realizando uma requisição GET com axios na API de países
     axios.get(url).then((response) => {
          // Buscando o nome oficial e o nome traduzido do país
          const pais = response.data[0]; 

          const nomeOficial = pais.name.common; 
          const nomeTraduzido = dicionarioPaises[nomeOficial] || "Nome nativo não disponível."; 
          const nomeNativo = pais.name.nativeName && pais.name.nativeName[Object.keys(pais.name.nativeName)[0]].common;

          document.getElementById("nome").textContent = `Nome em português: ${nomeTraduzido}`
          document.getElementById("nomeOriginal").textContent = `Nome original do país: ${nomeNativo || "Tradução não disponível."}`;

          // Buscando a capital do país

          const nomePais = pais.name.common;
          const capitalTraduzida = dicionarioCapitais[nomePais] || pais.capital[0] || "Capital não encontrada.";

          document.getElementById("capital").textContent = `Capital: ${capitalTraduzida}`;

          // Buscando o(s) idioma(s) do país

          const linguas = Object.values(pais.languages);
          const listaLinguasTraduzidas = linguas.map((lingua) => {
               return dicionarioLinguas[lingua] || lingua;
          })
          const linguasTraduzidas = listaLinguasTraduzidas.join(", ");

          document.getElementById("linguas").textContent = `Línguas faladas: ${linguasTraduzidas}`;

          // Buscando a moeda do país

          const informacoesMoedaSimbolo = Object.values(pais.currencies)[0];
          const simbolo = informacoesMoedaSimbolo.symbol || "Símbolo não disponível.";
          const moeda = informacoesMoedaSimbolo.name || "Moeda não encontrada.";
          const nomeMoedaTraduzida = dicionarioMoedas[moeda] || moeda;

          document.getElementById("moeda").textContent = `Moeda atual: ${nomeMoedaTraduzida} (${simbolo})`;

          // Buscando a região do país

          const regiao = pais.region;
          const regiaoTraduzida = dicionarioRegioes[regiao] || regioes;

          document.getElementById("regiao").textContent = `Região: ${regiaoTraduzida}`;

          // Buscando a subregião do país

          const subregiao = pais.subregion;
          const subregiaoTraduzida = dicionarioSubRegioes[subregiao] || subregiao;

          document.getElementById("subRegiao").textContent = `Subregião: ${subregiaoTraduzida}`;

          // Buscando a bandeira do país

          const bandeira = pais.flags.png;
          const altBandeira = pais.flags.alt;

          document.getElementById("bandeira").innerHTML = `<img src="${bandeira}" alt="${altBandeira}" style="background-color: #b6bcc6; padding: 15px; margin-top: 20px; border: 3px solid #00b4d8">`;
     }).catch((error) => {
          console.error("Erro ao obter país: ", error);
     });
}