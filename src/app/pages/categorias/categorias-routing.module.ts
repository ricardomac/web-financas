import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaDeCategoriasComponent } from './lista-de-categorias/lista-de-categorias.component';
import { FormularioCategoriaComponent } from './formulario-categoria/formulario-categoria.component';


const routes: Routes = [
  { path: '', component: ListaDeCategoriasComponent },
  { path: 'new', component: FormularioCategoriaComponent },
  { path: ':id/editar', component: FormularioCategoriaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
