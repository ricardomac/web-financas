import { Component, OnInit, Injector} from '@angular/core';
import { Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

import { Lancamento } from "../shared/lancamento.model"
import { LancamentoService } from '../shared/lancamento.service';
import { Categoria } from '../../categorias/shared/categoria.model';
import { CategoriaService } from '../../categorias/shared/categoria.service';

@Component({
  selector: 'app-formulario-lancamento',
  templateUrl: './formulario-lancamento.component.html',
  styleUrls: ['./formulario-lancamento.component.css']
})
export class FormularioLancamentosComponent extends BaseResourceFormComponent<Lancamento> implements OnInit {

  categorias: Array<Categoria>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  }

  ptBR = {
    firstDayOfWeek: 0,
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    today: 'Hoje',
    clear: 'Limpar',
  };

  constructor(
    protected lancamentoService: LancamentoService,
    protected categoriaService: CategoriaService,
    protected injector: Injector
  ) {
    super(injector, new Lancamento(), lancamentoService, Lancamento.fromJson);
   }

  ngOnInit() {
    this.loadCategorias();
    super.ngOnInit();
  }

  get typeOptions(): Array<any> {
    return Object.entries(Lancamento.tipos).map(([value, text]) => {
      return {
        text: text,
        value: value
      }
    })
  }

  protected buildFormResource() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null],
      tipo: ["despesa", [Validators.required]],
      valor: [null, [Validators.required]],
      data: [null, [Validators.required]],
      pago: [true, [Validators.required]],
      categoriaId: [null, [Validators.required]],
    })
  }

  private loadCategorias() {
    this.categoriaService.Listar().subscribe(
      categorias => this.categorias = categorias
    );
  }

  protected tituloPaginaCriar(): string {
    return "Cadastro de Novo Lançamento";
  }

  protected tituloPaginaEdicao(): string {
    const nomeLancamento = this.resource.nome || "";
    return "Editando Lançamento: " + nomeLancamento;
  }

}
