import { BaseResourceModel } from 'src/app/shared/models/BaseResourceModel';
import { Categoria } from '../../categorias/shared/categoria.model';

export class Lancamento extends BaseResourceModel {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public tipo?: string,
        public valor?: string,
        public data?: string,
        public pago?: boolean,
        public categoriaId?: number,
        public categoria?: Categoria,

    ) {
        super();
    }

    static tipos = {
        despesa: 'Despesa',
        receita: 'Receita'
    }

    static fromJson(jsonData: any): Lancamento {
        return Object.assign(new Lancamento(), jsonData);
    }

    get statusPagamento(): string {
        return this.pago ? 'Pago' : 'Pedente';
    }
}