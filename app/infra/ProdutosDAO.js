class ProdutosDAO {
    constructor(connection) {
        this._connection = connection;
    }
    lista(callback) {
        this._connection.query('select * from produtos', callback);
    }

    salva(produto, callback) {
        this._connection.query('insert into produtos set ?',produto, callback);

        /**
        *
        Uma outra maneira de passar os parâmetros para a query seria utilizando o values exatamente como se faz na sql pura e passar uma ‘?’ no valor de cada parâmetro da query. Passando depois também cada valor como parâmetro da função query no javascript. Ex: 
        ProdutosDAO.prototype.salva = function (produto, callback) {
            this._connection.query('insert into produtos (titulo, preco, descricao) values (?, ?, ?)',  [produto.titulo, produto.preco, produto.descricao], callback);
        }c
         */
    }
}

module.exports = function(){
    return ProdutosDAO;
}