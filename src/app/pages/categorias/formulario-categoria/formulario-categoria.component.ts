import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"

import { Categoria } from "../shared/categoria.model"
import { CategoriaService } from '../shared/categoria.service';

import { switchMap } from 'rxjs/operators';

import toastr from "toastr"

@Component({
  selector: 'app-formulario-categoria',
  templateUrl: './formulario-categoria.component.html',
  styleUrls: ['./formulario-categoria.component.css']
})
export class FormularioCategoriaComponent implements OnInit, AfterContentChecked {

  acaoAtual: string;
  categoriaForm: FormGroup;
  tituloPagina: string;
  serverErrorMessages: Array<string> = null;
  submittingForm: boolean = false;
  categoria: Categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setAcaoAtual();
    this.buildFormCategoria();
    this.loadCategoria();
  }

  ngAfterContentChecked() {
    this.setTituloPagina();
  }


  submitForm() {
    this.submittingForm = true;
    if (this.acaoAtual == 'new') {
      this.salvarCategoria()
    } else {
      this.atualizarCategoria();
    }
  }


  // Métodos privados

  private setAcaoAtual() {
    if (this.route.snapshot.url[0].path == "new") {
      this.acaoAtual = "new";
    } else {
      this.acaoAtual = "edit";
    }
  }

  private buildFormCategoria() {
    this.categoriaForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null]
    })
  }

  private loadCategoria() {
    if (this.acaoAtual == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.categoriaService.Buscar(+params.get("id")))
      )
        .subscribe(
          (categoria) => {
            this.categoria = categoria;
            this.categoriaForm.patchValue(categoria)
          },
          (error) => alert("Ocorreu um erro no servidor, tente mais tarde.")
        )
    }
  }

  private setTituloPagina() {
    if (this.acaoAtual == 'new') {
      this.tituloPagina = 'Cadastro de nova categoria'
    } else {
      const nomeCategoria = this.categoria.nome || "";
      this.tituloPagina = "Editando categoria: " + nomeCategoria;
    }
  }

  private salvarCategoria() {
    const categoria: Categoria = Object.assign(new Categoria(), this.categoriaForm.value);

    this.categoriaService.Salvar(categoria)
      .subscribe(
        categoria => this.actionsForSuccess(categoria),
        error => this.actionsForError(error)
      )
  }

  private atualizarCategoria() {
    const categoria: Categoria = Object.assign(new Categoria(), this.categoriaForm.value);
    this.categoriaService.Atualizar(categoria)
      .subscribe(
        categoria => this.actionsForSuccess(categoria),
        error => this.actionsForError(error)
      )
  }

  private actionsForSuccess(categoria: Categoria) {
    toastr.success("Solicitação processada com sucesso!");

    this.router.navigateByUrl(`categorias`, { skipLocationChange: true })
      .then(() => this.router.navigate(["categorias", categoria.id, "editar"]))
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
