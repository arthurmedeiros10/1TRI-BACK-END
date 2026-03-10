//                0             1            2            3            4           5            6           7
const hardware = ["RTX 4060", "Ryzen 7", "RAM 16GB", "SSD 1TB", "Fonte 750W", "Gabinete", "WaterCooler", "Mouse"]
const precos =   [2200      ,  1800    ,  350     ,  450     ,  600       ,  400       ,  550          ,  250   ]

function exibirEstoque(){
    let i = 0
    while(i < hardware.length){
        console.log(hardware[i] + " - R$ " + precos[i])
        i = i + 1
    }
    console.log("------------------------------------------------")
}

// Adicionar novo item ao estoque
function cadastrarItem(item, preco){
    hardware.push(item)
    precos.push(preco)
}

// Remover item por índice
function removerItem(posicao){
    hardware.splice(posicao, 1)
    precos.splice(posicao, 1)
}

// Execução dos testes
exibirEstoque()
cadastrarItem("Monitor 144hz", 1200)
exibirEstoque()
removerItem(2) // Remove a RAM 16GB
exibirEstoque()