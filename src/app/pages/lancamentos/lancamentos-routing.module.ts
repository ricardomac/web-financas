import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaDeLancamentosComponent } from './lista-de-lancamentos/lista-de-lancamentos.component';

const routes: Routes = [
  { path: '', component: ListaDeLancamentosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
