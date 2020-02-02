import { BaseResourceModel } from '../models/BaseResourceModel';

import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'


export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected http: HttpClient;

    constructor(
        protected caminhoApi: string,
        protected injector: Injector,
        protected jsonDadosToResourceFn: (jsonData: any) => T
    ) {
        this.http = injector.get(HttpClient)
    }

    Listar(): Observable<Array<T>> {
        return this.http.get(this.caminhoApi).pipe(
            map(this.jsonDadosToResources.bind(this)),
            catchError(this.handleError)
        )
    }

    Buscar(id: number): Observable<T> {
        return this.http.get(`${this.caminhoApi}/${id}`).pipe(
            map(this.jsonDadosToResource.bind(this)),
            catchError(this.handleError)
        )
    }

    Salvar(resource: T): Observable<T> {
        return this.http.post(this.caminhoApi, resource).pipe(
            map(this.jsonDadosToResource.bind(this)),
            catchError(this.handleError)
        )
    }

    Atualizar(resource: T): Observable<T> {
        return this.http.put(`${this.caminhoApi}/${resource.id}`, resource).pipe(
            map(() => resource),
            catchError(this.handleError)
        )
    }

    Excluir(id: number): Observable<any> {
        return this.http.delete(`${this.caminhoApi}/${id}`).pipe(
            map(() => null),
            catchError(this.handleError)
        )
    }

    // Métodos protected

    protected jsonDadosToResources(jsonDados: Array<any>): Array<T> {
        const resources: Array<T> = [];
        jsonDados.forEach(
            element => resources.push(this.jsonDadosToResourceFn(element))
        );
        return resources
    }

    protected jsonDadosToResource(jsonDados: any): T {
        return this.jsonDadosToResourceFn(jsonDados);
    }

    protected handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error);
    }
}