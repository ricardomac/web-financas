import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators'
import { Categoria } from './categoria.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private caminhoApi: string = "api/categorias"

  constructor(private http: HttpClient) { }

  Listar(): Observable<Array<Categoria>> {
    return this.http.get(this.caminhoApi).pipe(
      catchError(this.handleError),
      map(this.jsonDadosCategorias)
    )
  }

  Buscar(id: number): Observable<Categoria> {
    return this.http.get(`${this.caminhoApi}/${id}`).pipe(
      catchError(this.handleError),
      map(this.jsonDadosCategoria)
    )
  }

  Salvar(categoria: Categoria): Observable<Categoria> {
    return this.http.post(this.caminhoApi, categoria).pipe(
      catchError(this.handleError),
      map(this.jsonDadosCategoria)
    )
  }

  Atualizar(categoria: Categoria): Observable<Categoria> {
    return this.http.put(`${this.caminhoApi}/${categoria.id}`, categoria).pipe(
      catchError(this.handleError),
      map(() => categoria)
    )
  }

  Excluir(id: number): Observable<any> {
    return this.http.delete(`${this.caminhoApi}/${id}`).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }


  // Métodos Privados
  private jsonDadosCategorias(jsonDados: Array<any>): Array<Categoria> {
    const categorias: Array<Categoria> = [];
    jsonDados.forEach(element => categorias.push(element as Categoria));
    return categorias
  }

  private jsonDadosCategoria(jsonDados: any): Categoria {
    return jsonDados as Categoria;
  }

  private handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }


}
