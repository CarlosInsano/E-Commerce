const items = [
    {
        id: 0,
        nome: 'Laço 1',
        img: 'image.png',
        price: 1 ,
        quantidade: 0
    },
    {
        id: 1,
        nome: 'Garrafinha',
        img: 'image.png',
        price: 10.22,
        quantidade: 0
    },
    {
        id: 2,
        nome: 'Laço 2',
        img: 'image.png',
        price: 10.22,
        quantidade: 0
    },
    {
        id: 3,
        nome: 'Camisa',
        img: 'image.png',
        price: 10,
        quantidade: 0
    },
    ]

    inicializarLoja = () => {
        var containerProdutos = document.getElementById('produtos');
        items.map((val)=>{
         
         containerProdutos.innerHTML+=`            
            <div class="produto-single">
                <img src="`+val.img+`"/>
                <p> `+val.nome+`</p>
                <p> R$`+val.price+`</p>
                <a key="${val.id}" href="#">Adicionar ao Carrinho!</a>
            </div>    
            
            `;
        })
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

    for(var i = 0; i < links.length; i++){
        links[i].addEventListener("click",function(){            
            let key = this.getAttribute('key');
            items[key].quantidade++;
            items[key].priceTotal = items[key].quantidade * items[key].price; // Calcula o preço total do item
            atualizarCarrinho(); 
            
            
        })
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

