const items = [
    {
        id: 0,
        nome: 'Laço 1',
        img: 'image.png',
        quantidade: 0
    },
    {
        id: 1,
        nome: 'Garrafinha',
        img: 'image.png',
        quantidade: 0
    },
    {
        id: 2,
        nome: 'Laço 2',
        img: 'image.png',
        quantidade: 0
    },
    {
        id: 3,
        nome: 'Camisa',
        img: 'image.png',
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
                <a key="`+val.id+`" href="#">Adicionar ao Carrinho!</a>
            </div>    
            
            `;
        })
    }
    
    inicializarLoja()

    atualizarCarrinho =()=>{
        var containerCarrinho = document.getElementById('carrinho');
        containerCarrinho.innerHTML = "";
        items.map((val)=>{
            if(val.quantidade > 0) {
         containerCarrinho.innerHTML+=`            
            
            <p>`+val.nome+` | Quantidade: `+val.quantidade+`</p>
            <br>
            <hr>

            `;
        }
        })
    }
    
    var links = document.getElementsByTagName('a');

    for(var i = 0; i < links.length; i++){
        links[i].addEventListener("click",function(){
           
            
            let key = this.getAttribute('key');
            items[key].quantidade++;
            atualizarCarrinho();
            
            
        })
    }          


