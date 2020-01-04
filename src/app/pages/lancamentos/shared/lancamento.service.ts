import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators'
import { Lancamento } from './lancamento.model';


@Injectable({
    providedIn: 'root'
})
export class LancamentoService {

    private caminhoApi: string = "api/lancamentos"

    constructor(private http: HttpClient) { }

    Listar(): Observable<Array<Lancamento>> {
        return this.http.get(this.caminhoApi).pipe(
            catchError(this.handleError),
            map(this.jsonDadoslancamentos)
        )
    }

    Buscar(id: number): Observable<Lancamento> {
        return this.http.get(`${this.caminhoApi}/${id}`).pipe(
            catchError(this.handleError),
            map(this.jsonDadoslancamento)
        )
    }

    Salvar(lancamento: Lancamento): Observable<Lancamento> {
        return this.http.post(this.caminhoApi, lancamento).pipe(
            catchError(this.handleError),
            map(this.jsonDadoslancamento)
        )
    }

    Atualizar(lancamento: Lancamento): Observable<Lancamento> {
        return this.http.put(`${this.caminhoApi}/${lancamento.id}`, lancamento).pipe(
            catchError(this.handleError),
            map(() => lancamento)
        )
    }

    Excluir(id: number): Observable<any> {
        return this.http.delete(`${this.caminhoApi}/${id}`).pipe(
            catchError(this.handleError),
            map(() => null)
        )
    }


    // Métodos Privados
    private jsonDadoslancamentos(jsonDados: Array<any>): Array<Lancamento> {
        const lancamentos: Array<Lancamento> = [];
        jsonDados.forEach(element => lancamentos.push(element as Lancamento));
        return lancamentos
    }

    private jsonDadoslancamento(jsonDados: any): Lancamento {
        return jsonDados as Lancamento;
    }

    private handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error);
    }


}
