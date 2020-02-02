import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { flatMap, catchError } from 'rxjs/operators'

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
        super("api/lancamentos", injector, Lancamento.fromJson);
    }


    Salvar(lancamento: Lancamento): Observable<Lancamento> {
        return this.setCategoriaEnviarServer(lancamento, super.Salvar.bind(this))
    }

    Atualizar(lancamento: Lancamento): Observable<Lancamento> {
        return this.setCategoriaEnviarServer(lancamento, super.Atualizar.bind(this))
    }

    private setCategoriaEnviarServer(lancamento: Lancamento, sendFn: any): Observable<Lancamento> {
        return this.categoriaService.Buscar(lancamento.categoriaId).pipe(
            flatMap(categoria => {
                lancamento.categoria = categoria;
                return sendFn(lancamento);
            }),
            catchError(this.handleError)
        )
    }
}
