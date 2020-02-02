import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LancamentosRoutingModule } from './lancamentos-routing.module';

import { ListaDeLancamentosComponent } from './lista-de-lancamentos/lista-de-lancamentos.component';
import { FormularioLancamentosComponent } from './formulario-lancamentos/formulario-lancamento.component';

import { CalendarModule } from 'primeng/calendar'
import { IMaskModule } from "angular-imask"

@NgModule({
  declarations: [ListaDeLancamentosComponent, FormularioLancamentosComponent],
  imports: [
    CommonModule,
    LancamentosRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule
  ]
})
export class LancamentosModule { }
