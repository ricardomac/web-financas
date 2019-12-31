import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListaDeCategoriasComponent } from './lista-de-categorias/lista-de-categorias.component';
import { FormularioCategoriaComponent } from './formulario-categoria/formulario-categoria.component';


@NgModule({
  declarations: [ListaDeCategoriasComponent, FormularioCategoriaComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule
  ]
})
export class CategoriasModule { }
