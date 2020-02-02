import { Component } from '@angular/core';

import { Lancamento } from '../shared/lancamento.model';
import { LancamentoService } from '../shared/lancamento.service';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-lista-de-lancamentos',
  templateUrl: './lista-de-lancamentos.component.html',
  styleUrls: ['./lista-de-lancamentos.component.css']
})
export class ListaDeLancamentosComponent extends BaseResourceListComponent<Lancamento>{

  constructor(protected lancamentoService: LancamentoService) {
    super(lancamentoService);
   }

}
