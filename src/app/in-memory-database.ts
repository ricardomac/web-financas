import { InMemoryDbService } from 'angular-in-memory-web-api'

import { Categoria } from './pages/categorias/shared/categoria.model';
import { Lancamento } from './pages/lancamentos/shared/lancamento.model';

export class InMemoryDataBase implements InMemoryDbService {
    createDb() {
        const categorias: Array<Categoria> = [
            { id: 1, nome: 'Moradia', descricao: 'Pagamentos de contas da casa' },
            { id: 2, nome: 'Saúde', descricao: 'Planos de saúde e remédios' },
            { id: 3, nome: 'Lazer', descricao: 'Cinema, parques, praia, etc' },
            { id: 4, nome: 'Salário', descricao: 'Recebimento de Salário' },
            { id: 5, nome: 'Freelas', descricao: 'Trabalhos como freelancer' }
        ];

        const lancamentos: Array<Lancamento> = [
            new Lancamento(1, "Gas de cozinha", "compra de gas", "despesa", "70,5", "20/11/2018", true, categorias[0].id, categorias[0]),
            new Lancamento(2, "Remedio", "Compra de remedio", "despesa", "70,5", "20/11/2018", false, categorias[1].id, categorias[1]),
            new Lancamento(3, "Receita", "", "receita", "4570,5", "20/11/2018", true, categorias[3].id, categorias[3])
        ];

        return { categorias, lancamentos }
    }
}