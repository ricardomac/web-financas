import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"

import { BaseResourceModel } from '../../models/BaseResourceModel';
import { BaseResourceService } from '../../services/base-resource.service';

import { switchMap } from 'rxjs/operators';

import toastr from "toastr"

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  acaoAtual: string;
  resourceForm: FormGroup;
  tituloPagina: string;
  serverErrorMessages: Array<string> = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDadosToResourceFn: (jsonDados) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.setAcaoAtual();
    this.buildFormResource();
    this.loadResource();
  }

  ngAfterContentChecked() {
    this.setTituloPagina();
  }


  submitForm() {
    this.submittingForm = true;
    if (this.acaoAtual == 'new') {
      this.salvarResource()
    } else {
      this.atualizarResource();
    }
  }


  // Métodos protected

  protected setAcaoAtual() {
    if (this.route.snapshot.url[0].path == "new") {
      this.acaoAtual = "new";
    } else {
      this.acaoAtual = "edit";
    }
  }

  protected loadResource() {
    if (this.acaoAtual == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.Buscar(+params.get("id")))
      )
        .subscribe(
          (resource) => {
            this.resource = resource;
            this.resourceForm.patchValue(resource);
          },
          (error) => alert("Ocorreu um erro no servidor, tente mais tarde.")
        )
    }
  }

  protected setTituloPagina() {
    if (this.acaoAtual == 'new') {
      this.tituloPagina = this.tituloPaginaCriar();
    } else {
      this.tituloPagina = this.tituloPaginaEdicao();
    }
  }

  protected tituloPaginaCriar(): string {
    return "Novo";
  }

  protected tituloPaginaEdicao(): string {
    return "Edição";
  }

  protected salvarResource() {
    const resource: T = this.jsonDadosToResourceFn(this.resourceForm.value);

    this.resourceService.Salvar(resource)
      .subscribe(
        resource => this.actionsForSuccess(resource),
        error => this.actionsForError(error)
      )
  }

  protected atualizarResource() {
    const resource: T = this.jsonDadosToResourceFn(this.resourceForm.value);
    this.resourceService.Atualizar(resource)
      .subscribe(
        resource => this.actionsForSuccess(resource),
        error => this.actionsForError(error)
      )
  }

  protected actionsForSuccess(resource: T) {
    toastr.success("Solicitação processada com sucesso!");

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true })
      .then(() => this.router.navigate([baseComponentPath, resource.id, "editar"]))
  }

  protected actionsForError(error) {
    toastr.error("Ocorreu um erro ao processar a sua solicitação!");
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error.body).errors;
    } else {
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."];
    }
  }

  protected abstract buildFormResource():void;

}
