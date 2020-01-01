import { Component, OnInit } from '@angular/core';

import { Categoria } from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';


@Component({
  selector: 'app-lista-de-categorias',
  templateUrl: './lista-de-categorias.component.html',
  styleUrls: ['./lista-de-categorias.component.css']
})
export class ListaDeCategoriasComponent implements OnInit {

  categorias: Array<Categoria> = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.Listar().subscribe(
      categorias => this.categorias = categorias,
      error => alert('Erro ao carregar a lista')
    )
  }

  DeletarCategoria(categoria) {
    if (confirm('Deseja realmente excluir essa categoria?'))
      this.categoriaService.Excluir(categoria.id).subscribe(
        () => this.categorias = this.categorias.filter(element => element != categoria),
        () => alert("Erro ao tentar excluir")
      )
  }

}
