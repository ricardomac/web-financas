import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators'

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

import { Lancamento } from './lancamento.model';
import { CategoriaService } from '../../categorias/shared/categoria.service';

@Injectable({
    providedIn: 'root'
})
export class LancamentoService extends BaseResourceService<Lancamento> {

    constructor(
        protected injector: Injector,
        private categoriaService: CategoriaService
    ) {
        super("api/lancamentos", injector);
    }


    Salvar(lancamento: Lancamento): Observable<Lancamento> {
        return this.categoriaService.Buscar(lancamento.categoriaId).pipe(
            flatMap(categoria => {
                lancamento.categoria = categoria;
                return super.Salvar(lancamento);
            })
        )
    }

    Atualizar(lancamento: Lancamento): Observable<Lancamento> {
        return this.categoriaService.Buscar(lancamento.categoriaId).pipe(
            flatMap(categoria => {
                lancamento.categoria = categoria;
                return super.Atualizar(lancamento);
            })
        )
    }

    // Métodos protected
    protected jsonDadosToResources(jsonDados: Array<any>): Array<Lancamento> {
        const lancamentos: Array<Lancamento> = [];
        jsonDados.forEach(element => lancamentos.push(Object.assign(new Lancamento(), element)));
        return lancamentos
    }

    protected jsonDadosToResource(jsonDados: any): Lancamento {
        return jsonDados as Lancamento;
    }

}
