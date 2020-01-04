import { Component, OnInit } from '@angular/core';

import { Lancamento } from '../shared/lancamento.model';
import { LancamentoService } from '../shared/lancamento.service';


@Component({
  selector: 'app-lista-de-lancamentos',
  templateUrl: './lista-de-lancamentos.component.html',
  styleUrls: ['./lista-de-lancamentos.component.css']
})
export class ListaDeLancamentosComponent implements OnInit {

  lancamentos: Array<Lancamento> = [];

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.lancamentoService.Listar().subscribe(
      lancamentos => this.lancamentos = lancamentos,
      error => alert('Erro ao carregar a lista')
    )
  }

  DeletarLancamento(lancamento) {
    if (confirm('Deseja realmente excluir essa lancamento?'))
      this.lancamentoService.Excluir(lancamento.id).subscribe(
        () => this.lancamentos = this.lancamentos.filter(element => element != lancamento),
        () => alert("Erro ao tentar excluir")
      )
  }

}
