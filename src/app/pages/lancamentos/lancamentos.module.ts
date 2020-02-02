import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';


import { LancamentosRoutingModule } from './lancamentos-routing.module';

import { ListaDeLancamentosComponent } from './lista-de-lancamentos/lista-de-lancamentos.component';
import { FormularioLancamentosComponent } from './formulario-lancamentos/formulario-lancamento.component';

import { CalendarModule } from 'primeng/calendar'
import { IMaskModule } from "angular-imask"


@NgModule({
  declarations: [ListaDeLancamentosComponent, FormularioLancamentosComponent],
  imports: [
    SharedModule,
    LancamentosRoutingModule,
    CalendarModule,
    IMaskModule
  ]
})
export class LancamentosModule { }
