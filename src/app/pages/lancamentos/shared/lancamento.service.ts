import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators'
import { Lancamento } from './lancamento.model';
import { CategoriaService } from '../../categorias/shared/categoria.service';



@Injectable({
    providedIn: 'root'
})
export class LancamentoService {

    private caminhoApi: string = "api/lancamentos"

    constructor(
        private http: HttpClient,
        private categoriaService: CategoriaService) { }

    Listar(): Observable<Array<Lancamento>> {
        return this.http.get(this.caminhoApi).pipe(
            catchError(this.handleError),
            map(this.jsonDadosLancamentos)
        )
    }

    Buscar(id: number): Observable<Lancamento> {
        return this.http.get(`${this.caminhoApi}/${id}`).pipe(
            catchError(this.handleError),
            map(this.jsonDadosLancamento)
        )
    }

    Salvar(lancamento: Lancamento): Observable<Lancamento> {

        return this.categoriaService.Buscar(lancamento.categoriaId).pipe(
            flatMap(categoria => {
                lancamento.categoria = categoria;

                return this.http.post(this.caminhoApi, lancamento).pipe(
                    catchError(this.handleError),
                    map(this.jsonDadosLancamento)
                )
            })
        )


    }

    Atualizar(lancamento: Lancamento): Observable<Lancamento> {

        return this.categoriaService.Buscar(lancamento.categoria.id).pipe(
            flatMap(categoria => {
                lancamento.categoria = categoria;

                return this.http.put(`${this.caminhoApi}/${lancamento.id}`, lancamento).pipe(
                    catchError(this.handleError),
                    map(() => lancamento)
                )
            })
        )
    }

    Excluir(id: number): Observable<any> {
        return this.http.delete(`${this.caminhoApi}/${id}`).pipe(
            catchError(this.handleError),
            map(() => null)
        )
    }


    // Métodos Privados
    private jsonDadosLancamentos(jsonDados: Array<any>): Array<Lancamento> {
        const lancamentos: Array<Lancamento> = [];
        jsonDados.forEach(element => lancamentos.push(Object.assign(new Lancamento(), element)));
        return lancamentos
    }

    private jsonDadosLancamento(jsonDados: any): Lancamento {
        return jsonDados as Lancamento;
    }

    private handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error);
    }


}
