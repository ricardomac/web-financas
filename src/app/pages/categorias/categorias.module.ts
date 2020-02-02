import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListaDeCategoriasComponent } from './lista-de-categorias/lista-de-categorias.component';
import { FormularioCategoriaComponent } from './formulario-categoria/formulario-categoria.component';


@NgModule({
  declarations: [ListaDeCategoriasComponent, FormularioCategoriaComponent],
  imports: [
    SharedModule,
    CategoriasRoutingModule
  ]
})
export class CategoriasModule { }
