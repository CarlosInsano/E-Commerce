//funçao para converte string Para Numero
function converterStringParaNumero(valor) {
  if (!isNaN(valor)) {
    if (valor.includes(".")) {
      return parseFloat(valor);
    } else {
      return parseInt(valor, 10);
    }
  }
  return valor;
}
// Função para converter o CSV em array de objetos
function csvToArray(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(';');
  
    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(';');
      if (currentLine.length !== headers.length) {
        continue; // Ignora linhas inválidas que não possuem a quantidade correta de colunas
      }
  
      const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = converterStringParaNumero(currentLine[j]); // Convertendo a string para número, se necessário
    }
    result.push(obj);
  }
  return result;
}
// colocando os valores do Csv na variavel urlDoArquivoCSV
  const urlDoArquivoCSV = 'BD_produtos.CSV'; //caminho correto do arquivo CSV
  
  fetch(urlDoArquivoCSV)
    .then((response) => response.text())
    .then((data) => {
      // Chamada da função para converter o CSV em array de objetos
      const produtos = csvToArray(data);

      // Exemplo de uso dos dados da constante "produtos"
      console.log(produtos);
    })
    .catch((error) => {
      console.error('Erro ao carregar dados do arquivo CSV:', error);
    });

let items = []

fetch(urlDoArquivoCSV)
  .then((response) => response.text())
  .then((data) => {
    // Chamada da função para converter o CSV em array de objetos
    items = csvToArray(data); // Atribui o resultado diretamente à constante "items"

    // Exemplo de uso dos dados da constante "items"
    console.log(items);

    // Chama a função para inicializar a loja após obter os dados do CSV
    inicializarLoja();
  })
  .catch((error) => {
    console.error('Erro ao carregar dados do arquivo CSV:', error);
  });

  function inicializarLoja() {
    var containerProdutos = document.getElementById('produtos');
    containerProdutos.innerHTML = ""; // Limpa o conteúdo antes de renderizar novamente
  
    items.forEach((val) => {
      containerProdutos.innerHTML += `
        <div class="produto-single">
          <img src="${val.img}" />
          <p>${val.nome}</p>
          <p>R$ ${val.price}</p>
          <button onclick="adicionarAoCarrinho(${val.Id})">Adicionar ao Carrinho!</button>
        </div>
      `;
    });
  }
  
    inicializarLoja()

    atualizarCarrinho =()=>{
        var containerCarrinho = document.getElementById('carrinho');
        containerCarrinho.innerHTML = "";
        
        items.forEach((val) =>{
            if(val.quantidade > 0) {
         containerCarrinho.innerHTML+=`            
            <div class="info-single-checkout" >
            <img style="float:left;margin:10px;border: 1px solid;" src="`+val.img+`"/>
            <p style="float:left;">Produto: `+val.nome+`</p>
            <p style="float:right;">Qtd `+val.quantidade+`</p>
            <div style="clear:both"></div>
            <button style="float:right;" onclick="removerItemDoCarrinho(${val.id})">Remover</button>
            <p>Valor: R$`+val.priceTotal+`</p>

            `;
        }
        })
        
    }
    

    var links = document.getElementsByTagName('a');

    function adicionarAoCarrinho(itemId) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].Id === itemId) {
          items[i].quantidade++; // Incrementa a quantidade do produto no carrinho
          items[i].priceTotal = items[i].quantidade * items[i].price; // Calcula o preço total do item
          break;
        }
      }
      atualizarCarrinho(); // Atualiza o carrinho após adicionar o produto
    }
    
    function removerItemDoCarrinho(itemId) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].id === itemId) {
            if (items[i].quantidade > 0) {
              items[i].quantidade--; // Remove apenas um item por vez
              items[i].priceTotal = items[i].quantidade * items[i].price; // Atualiza o preço total do item
              break;
            }
          }
        }
        atualizarCarrinho();
      }

