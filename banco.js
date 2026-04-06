const fs = require('fs');
const path = require('path');

// Modelo base fornecido
const modelo = {
    titulo: "Título do Livro",
    autor: "Autor",
    ano: 9999,
    paginas: 333,
    sinopse: "Sinopse do livro...",
    preco: 99.90
};

// Banco de dados com 10 livros
const livros = [
    {
        titulo: "Harry Potter e a Pedra Filosofal",
        autor: "J.K. Rowling",
        ano: 1997,
        paginas: 264,
        sinopse: "Harry descobre que é um bruxo e vai para Hogwarts, onde faz amigos e enfrenta o malvado Lord Voldemort.",
        preco: 49.90
    },
    {
        titulo: "O Senhor dos Anéis: A Sociedade do Anel",
        autor: "J.R.R. Tolkien",
        ano: 1954,
        paginas: 576,
        sinopse: "Um hobbit chamado Frodo recebe a tarefa de destruir um anel poderoso antes que ele caia nas mãos do mal.",
        preco: 79.90
    },
    {
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        ano: 1899,
        paginas: 256,
        sinopse: "Bentinho suspeita da traição de Capitu, sua esposa, e narra sua história cheia de ciúmes e dúvidas.",
        preco: 35.90
    },
    {
        titulo: "1984",
        autor: "George Orwell",
        ano: 1949,
        paginas: 328,
        sinopse: "Em um regime totalitário, Winston Smith luta contra o controle do governo que vigia todos os passos dos cidadãos.",
        preco: 45.50
    },
    {
        titulo: "O Pequeno Príncipe",
        autor: "Antoine de Saint-Exupéry",
        ano: 1943,
        paginas: 96,
        sinopse: "Um piloto encontra um pequeno príncipe vindo de outro planeta e aprende lições sobre amizade e amor.",
        preco: 29.90
    },
    {
        titulo: "A Culpa é das Estrelas",
        autor: "John Green",
        ano: 2012,
        paginas: 288,
        sinopse: "Hazel e Augustus, dois adolescentes com câncer, se apaixonam e vivem uma história intensa e emocionante.",
        preco: 39.90
    },
    {
        titulo: "O Código Da Vinci",
        autor: "Dan Brown",
        ano: 2003,
        paginas: 464,
        sinopse: "O simbologista Robert Langdon investiga um assassinato no Louvre que o leva a uma revelação sobre o Santo Graal.",
        preco: 59.90
    },
    {
        titulo: "Orgulho e Preconceito",
        autor: "Jane Austen",
        ano: 1813,
        paginas: 432,
        sinopse: "Elizabeth Bennet enfrenta as expectativas sociais e o orgulho do senhor Darcy em uma história de amor e superação.",
        preco: 42.00
    },
    {
        titulo: "IT: A Coisa",
        autor: "Stephen King",
        ano: 1986,
        paginas: 1104,
        sinopse: "Um grupo de crianças enfrenta um palhaço maligno que assombra a cidade de Derry a cada 27 anos.",
        preco: 89.90
    },
    {
        titulo: "O Alquimista",
        autor: "Paulo Coelho",
        ano: 1988,
        paginas: 208,
        sinopse: "Santiago, um pastor andaluz, viaja em busca de um tesouro e descobre lições sobre seu 'Lenda Pessoal'.",
        preco: 34.90
    }
];

// 1. Função para salvar a lista em arquivo JSON
function salvarJSON() {
    const dadosJSON = JSON.stringify(livros, null, 2);
    fs.writeFileSync('livros.json', dadosJSON, 'utf-8');
    console.log('Arquivo JSON salvo com sucesso!');
}

// 2. Função para ler o arquivo JSON
function lerJSON() {
    try {
        const dados = fs.readFileSync('livros.json', 'utf-8');
        return JSON.parse(dados);
    } catch (erro) {
        console.error('Erro ao ler o arquivo:', erro.message);
        return [];
    }
}

// 3. Função para mostrar os dados organizados no terminal
function mostrarLivros(lista = null) {
    const livrosParaMostrar = lista || livros;
    console.log('\n === LISTA DE LIVROS === \n');
    
    livrosParaMostrar.forEach((livro, index) => {
        console.log(`[${index + 1}] ${livro.titulo}`);
        console.log(`    Autor: ${livro.autor}`);
        console.log(`    Ano: ${livro.ano} | Páginas: ${livro.paginas}`);
        console.log(`    Preço: R$ ${livro.preco.toFixed(2)}`);
        console.log(`    Sinopse: ${livro.sinopse.substring(0, 100)}...`);
        console.log('─'.repeat(50));
    });
    
    console.log(`Total de livros: ${livrosParaMostrar.length}\n`);
}

// 4. Função para adicionar um novo livro
function adicionarLivro(novoLivro) {
    // Validação básica dos campos obrigatórios
    if (!novoLivro.titulo || !novoLivro.autor || !novoLivro.preco) {
        console.error(' Livro inválido: título, autor e preço são obrigatórios!');
        return false;
    }
    
    livros.push(novoLivro);
    console.log(` Livro "${novoLivro.titulo}" adicionado com sucesso!`);
    return true;
}

// 5. Função para filtrar livros por preço (menor que o valor informado)
function filtrarPorPreco(valorMaximo) {
    const filtrados = livros.filter(livro => livro.preco < valorMaximo);
    console.log(`\n🔍 Livros com preço menor que R$ ${valorMaximo.toFixed(2)}:`);
    mostrarLivros(filtrados);
    return filtrados;
}

// 6. Função para aplicar desconto em todos os livros
function aplicarDesconto(percentual) {
    const descontoDecimal = percentual / 100;
    let livrosAtualizados = 0;
    
    livros.forEach(livro => {
        const precoAntigo = livro.preco;
        livro.preco = precoAntigo * (1 - descontoDecimal);
        console.log(` ${livro.titulo}: R$ ${precoAntigo.toFixed(2)} → R$ ${livro.preco.toFixed(2)}`);
        livrosAtualizados++;
    });
    
    console.log(`\n Desconto de ${percentual}% aplicado a ${livrosAtualizados} livros!`);
    return livrosAtualizados;
}

// ========== TESTANDO AS FUNÇÕES ==========
console.log(' SISTEMA DE BANCO DE DADOS DE LIVROS (JSON)');
console.log('='.repeat(50));

// Mostrar livros iniciais
console.log('\n1. MOSTRANDO TODOS OS LIVROS:');
mostrarLivros();

// Salvar em JSON
console.log('\n2. SALVANDO EM ARQUIVO JSON:');
salvarJSON();

// Ler do JSON
console.log('\n3. LENDO DO ARQUIVO JSON:');
const livrosLidos = lerJSON();
console.log(` ${livrosLidos.length} livros carregados do arquivo`);

// Adicionar novo livro
console.log('\n4. ADICIONANDO NOVO LIVRO:');
const novoLivro = {
    titulo: "Duna",
    autor: "Frank Herbert",
    ano: 1965,
    paginas: 896,
    sinopse: "Paul Atreides lidera uma revolução no planeta desértico Arrakis, onde a especiaria é o recurso mais valioso do universo.",
    preco: 69.90
};
adicionarLivro(novoLivro);
mostrarLivros(); // Mostrar lista atualizada

// Filtrar por preço
console.log('\n5. FILTRANDO POR PREÇO < R$ 50,00:');
filtrarPorPreco(50);

// Aplicar desconto
console.log('\n6. APLICANDO DESCONTO DE 10% EM TODOS OS LIVROS:');
aplicarDesconto(10);

// Mostrar livros após desconto
console.log('\n LIVROS APÓS DESCONTO:');
mostrarLivros();

// Salvar versão final com descontos
salvarJSON();