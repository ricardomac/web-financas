import { Component, Injector } from '@angular/core';
import { Validators } from "@angular/forms"

import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';

import { Categoria } from "../shared/categoria.model"
import { CategoriaService } from '../shared/categoria.service';

@Component({
  selector: 'app-formulario-categoria',
  templateUrl: './formulario-categoria.component.html',
  styleUrls: ['./formulario-categoria.component.css']
})
export class FormularioCategoriaComponent extends BaseResourceFormComponent<Categoria>{

  constructor(
    protected categoriaService: CategoriaService,
    protected injector: Injector
  ) {
    super(injector, new Categoria(), categoriaService, Categoria.fromJson);
  }

  protected buildFormResource(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null]
    })
  }

  protected tituloPaginaCriar(): string {
    return "Cadastro de Nova Categoria";
  }

  protected tituloPaginaEdicao(): string {
    const nomeCategoria = this.resource.nome || "";
    return "Editando categoria: " + nomeCategoria;
  }
}
