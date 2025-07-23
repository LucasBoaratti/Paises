let dicionarioPaises = {};
let dicionarioPaisesInverso = {};
let dicionarioMoedas = {};
let dicionarioCapitais = {};
let dicionarioLinguas = {};
let dicionarioRegioes = {};
let dicionarioSubRegioes = {};

fetch("Traduções/Tradução_Países.json")
     .then((response) => response.json())
     .then((data) => {
          dicionarioPaises = data;

          for (const [ingles, portugues] of Object.entries(dicionarioPaises)) {
               dicionarioPaisesInverso[portugues.toLowerCase()] = ingles;
          }

          console.log("Dicionário de países carregado.");
     })
     .catch((error) => {
          console.log("Erro ao carregar o dicionário de países: ", error);
     });

fetch("Traduções/Tradução_Moedas.json")
     .then((response) => response.json())
     .then((data) => {
          dicionarioMoedas = data;

          console.log("Dicionário de moedas carregado.");
     })
     .catch((error) => {
          console.log("Erro ao carregar o dicionário de moedas: ", error);
     });

fetch("Traduções/Tradução_Capitais.json")
     .then((response) => response.json())
     .then((data) => {
          dicionarioCapitais = data;

          console.log("Dicionário de capitais carregado.");
     })
     .catch((error) => {
          console.error("Erro ao carregar o dicionário de moedas: ", error);
     });

fetch("Traduções/Tradução_Línguas.json")
     .then((response) => response.json())
     .then((data) => {
          dicionarioLinguas = data;

          console.log("Dicionário de línguas carregadas.");
     })
     .catch((error) => {
          console.log("Erro ao carregar o dicionário de línguas: ", error);
     });

fetch("Traduções/Tradução_Regiões.json")
     .then((response) => response.json())
     .then((data) => {
          dicionarioRegioes = data;

          console.log("Dicionário de regiões carregado.");
     })
     .catch((error) => {
          console.log("Erro ao carregar o dicionário de regiões: ", error);
     });

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
     const nome = document.getElementById("pais").value.trim();
     const nomeInverso = dicionarioPaisesInverso[nome.toLowerCase()] || nome;

     const url = `https://restcountries.com/v3.1/name/${nomeInverso}?fullText=true`;

     axios.get(url).then((response) => {
          const pais = response.data[0]; 

          const nomeOficial = pais.name.common; 
          const nomeTraduzido = dicionarioPaises[nomeOficial] || "Nome nativo não disponível."; 
          const nomeNativo = pais.name.nativeName && pais.name.nativeName[Object.keys(pais.name.nativeName)[0]].common;

          document.getElementById("nome").textContent = `Nome em português: ${nomeTraduzido}`
          document.getElementById("nomeOriginal").textContent = `Nome original do país: ${nomeNativo || "Tradução não disponível."}`;

          const nomePais = pais.name.common;
          const capitalTraduzida = dicionarioCapitais[nomePais] || pais.capital[0] || "Capital não encontrada.";

          document.getElementById("capital").textContent = `Capital: ${capitalTraduzida}`;

          const linguas = Object.values(pais.languages);
          const listaLinguasTraduzidas = linguas.map((lingua) => {
               return dicionarioLinguas[lingua] || lingua;
          })
          const linguasTraduzidas = listaLinguasTraduzidas.join(", ");

          document.getElementById("linguas").textContent = `Línguas faladas: ${linguasTraduzidas}`;

          const informacoesMoedaSimbolo = Object.values(pais.currencies)[0];
          const simbolo = informacoesMoedaSimbolo.symbol || "Símbolo não disponível.";
          const moeda = informacoesMoedaSimbolo.name || "Moeda não encontrada.";

          const nomeMoedaTraduzida = dicionarioMoedas[moeda] || moeda;

          document.getElementById("moeda").textContent = `Moeda atual: ${nomeMoedaTraduzida} (${simbolo})`;

          const regiao = pais.region;
          const regiaoTraduzida = dicionarioRegioes[regiao] || regioes;

          document.getElementById("regiao").textContent = `Região: ${regiaoTraduzida}`;

          const subregiao = pais.subregion;
          const subregiaoTraduzida = dicionarioSubRegioes[subregiao] || subregiao;

          document.getElementById("subRegiao").textContent = `Subregião: ${subregiaoTraduzida}`;

          const bandeira = pais.flags.png;
          const altBandeira = pais.flags.alt;

          document.getElementById("bandeira").innerHTML = `<img src="${bandeira}" alt="${altBandeira}" style="background-color: #b6bcc6; padding: 15px; margin-top: 20px; border: 3px solid #00b4d8">`;
     }).catch((error) => {
          console.error("Erro ao obter país: ", error);
     });
}