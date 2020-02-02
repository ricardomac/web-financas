import { OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/BaseResourceModel';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: Array<T> = [];

  constructor(private resourceService: BaseResourceService<T>) { }

  ngOnInit() {
    this.resourceService.Listar().subscribe(
      resources => this.resources = resources.sort((a, b) => b.id - a.id),
      error => alert('Erro ao carregar a lista')
    )
  }

  DeletarResource(resource) {
    if (confirm('Deseja realmente excluir esse item?'))
      this.resourceService.Excluir(resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element != resource),
        () => alert("Erro ao tentar excluir")
      )
  }

}
