import { BaseResourceModel } from 'src/app/shared/models/BaseResourceModel';

export class Categoria extends BaseResourceModel {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string
    ) {
        super();
    }

    static fromJson(jsonData: any): Categoria {
        return Object.assign(new Categoria(), jsonData);
    }
}