//index.js
(async () => {
    const database = require('./database');
    const Produto = require('./product');

    try {
        const resultadoCreate = await Produto.create({
            nome: 'teclado',
            preco: 122,
            descricao: 'Um teclado USB bonitão'
        })
        const produto = await Produto.findByPk(3);
        produto.destroy();
        const produtos = await Produto.findAll();
        console.log(produtos);
    } catch (error) {
        console.log(error);
    }
})();