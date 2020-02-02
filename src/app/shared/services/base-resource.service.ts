import { BaseResourceModel } from '../models/BaseResourceModel';

import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'


export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;

    constructor(
        protected caminhoApi: string,
        protected injector: Injector
    ) {
        this.http = injector.get(HttpClient)
    }

    Listar(): Observable<Array<T>> {
        return this.http.get(this.caminhoApi).pipe(
            catchError(this.handleError),
            map(this.jsonDadosToResources)
        )
    }

    Buscar(id: number): Observable<T> {
        return this.http.get(`${this.caminhoApi}/${id}`).pipe(
            catchError(this.handleError),
            map(this.jsonDadosToResource)
        )
    }

    Salvar(resource: T): Observable<T> {
        return this.http.post(this.caminhoApi, resource).pipe(
            catchError(this.handleError),
            map(this.jsonDadosToResource)
        )
    }

    Atualizar(resource: T): Observable<T> {
        return this.http.put(`${this.caminhoApi}/${resource.id}`, resource).pipe(
            catchError(this.handleError),
            map(() => resource)
        )
    }

    Excluir(id: number): Observable<any> {
        return this.http.delete(`${this.caminhoApi}/${id}`).pipe(
            catchError(this.handleError),
            map(() => null)
        )
    }

    // Métodos protected

    protected jsonDadosToResources(jsonDados: Array<any>): Array<T> {
        const resources: Array<T> = [];
        jsonDados.forEach(element => resources.push(element as T));
        return resources
    }

    protected jsonDadosToResource(jsonDados: any): T {
        return jsonDados as T;
    }

    protected handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error);
    }
}