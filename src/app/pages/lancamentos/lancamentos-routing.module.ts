import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaDeLancamentosComponent } from './lista-de-lancamentos/lista-de-lancamentos.component';
import { FormularioLancamentosComponent } from './formulario-lancamentos/formulario-lancamento.component';


const routes: Routes = [
  { path: '', component: ListaDeLancamentosComponent },
  { path: 'new', component: FormularioLancamentosComponent },
  { path: ':id/editar', component: FormularioLancamentosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
