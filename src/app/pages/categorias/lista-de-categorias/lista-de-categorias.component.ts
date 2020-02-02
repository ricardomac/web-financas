import { Component } from '@angular/core';

import { Categoria } from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-lista-de-categorias',
  templateUrl: './lista-de-categorias.component.html',
  styleUrls: ['./lista-de-categorias.component.css']
})
export class ListaDeCategoriasComponent extends BaseResourceListComponent<Categoria> {

  constructor(protected categoriaService: CategoriaService) {
    super(categoriaService)
  }

}
