import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"

import { Lancamento } from "../shared/lancamento.model"
import { LancamentoService } from '../shared/lancamento.service';

import { switchMap } from 'rxjs/operators';

import toastr from "toastr"
import { Categoria } from '../../categorias/shared/categoria.model';
import { CategoriaService } from '../../categorias/shared/categoria.service';

@Component({
  selector: 'app-formulario-lancamento',
  templateUrl: './formulario-lancamento.component.html',
  styleUrls: ['./formulario-lancamento.component.css']
})
export class FormularioLancamentosComponent implements OnInit, AfterContentChecked {

  acaoAtual: string;
  lancamentoForm: FormGroup;
  tituloPagina: string;
  serverErrorMessages: Array<string> = null;
  submittingForm: boolean = false;
  lancamento: Lancamento = new Lancamento();
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
    private lancamentoService: LancamentoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setAcaoAtual();
    this.buildFormLancamento();
    this.loadLancamento();
    this.loadCategorias();
  }

  ngAfterContentChecked() {
    this.setTituloPagina();
  }


  submitForm() {
    this.submittingForm = true;
    if (this.acaoAtual == 'new') {
      this.salvarLancamento()
    } else {
      this.atualizarLancamento();
    }
  }

  get typeOptions(): Array<any> {
    return Object.entries(Lancamento.tipos).map(([value, text]) => {
      return {
        text: text,
        value: value
      }
    })
  }


  // Métodos privados

  private setAcaoAtual() {
    if (this.route.snapshot.url[0].path == "new") {
      this.acaoAtual = "new";
    } else {
      this.acaoAtual = "edit";
    }
  }

  private buildFormLancamento() {
    this.lancamentoForm = this.formBuilder.group({
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

  private loadLancamento() {
    if (this.acaoAtual == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.lancamentoService.Buscar(+params.get("id")))
      )
        .subscribe(
          (lancamento) => {
            this.lancamento = lancamento;
            this.lancamentoForm.patchValue(lancamento)
          },
          (error) => alert("Ocorreu um erro no servidor, tente mais tarde.")
        )
    }
  }

  private loadCategorias() {
    this.categoriaService.Listar().subscribe(
      categorias => this.categorias = categorias
    );
  }

  private setTituloPagina() {
    if (this.acaoAtual == 'new') {
      this.tituloPagina = 'Cadastro de Novo Lançamento'
    } else {
      const nomeLancamento = this.lancamento.nome || "";
      this.tituloPagina = "Editando Lançamento: " + nomeLancamento;
    }
  }

  private salvarLancamento() {
    const lancamento: Lancamento = Object.assign(new Lancamento(), this.lancamentoForm.value);

    this.lancamentoService.Salvar(lancamento)
      .subscribe(
        lancamento => this.actionsForSuccess(lancamento),
        error => this.actionsForError(error)
      )
  }

  private atualizarLancamento() {
    const lancamento: Lancamento = Object.assign(new Lancamento(), this.lancamentoForm.value);
    this.lancamentoService.Atualizar(lancamento)
      .subscribe(
        lancamento => this.actionsForSuccess(lancamento),
        error => this.actionsForError(error)
      )
  }

  private actionsForSuccess(lancamento: Lancamento) {
    toastr.success("Solicitação processada com sucesso!");

    this.router.navigateByUrl(`lancamentos`, { skipLocationChange: true })
      .then(() => this.router.navigate(["lancamentos", lancamento.id, "editar"]))
  }

  private actionsForError(error) {
    toastr.error("Ocorreu um erro ao processar a sua solicitação!");
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error.body).errors;
    } else {
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."]
    }
  }


}
