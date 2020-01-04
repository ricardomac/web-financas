import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListaDeCategoriasComponent } from './lista-de-categorias/lista-de-categorias.component';
import { FormularioCategoriaComponent } from './formulario-categoria/formulario-categoria.component';


@NgModule({
  declarations: [ListaDeCategoriasComponent, FormularioCategoriaComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    ReactiveFormsModule
  ]
})
export class CategoriasModule { }
