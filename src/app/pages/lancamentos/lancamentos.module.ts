import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { ListaDeLancamentosComponent } from './lista-de-lancamentos/lista-de-lancamentos.component';


@NgModule({
  declarations: [ListaDeLancamentosComponent],
  imports: [
    CommonModule,
    LancamentosRoutingModule
  ]
})
export class LancamentosModule { }
