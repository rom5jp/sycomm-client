import { Component, OnInit } from '@angular/core';

import { User } from './shared/user.model';
import { UserService } from './shared/user.service';

import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  columns: any[];
  pageSizes = [20, 50, 100];
  paginator = {
    pageNumber: 0,
    perPage: this.pageSizes[0],
    offset: 0
  };
  totalCount = 0;

  public constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getPaginated();

    this.columns = [
      { field: 'registration', header: 'Matrícula' },
      { field: 'name', header: 'Nome' },
      { field: 'email', header: 'E-mail' },
      { field: 'cpf', header: 'CPF' },
      { field: 'role', header: 'Cargo' },
      { field: 'organization', header: 'Órgão' }
    ];
  }

  getPaginated() {
    this.userService.listPaginated(this.paginator.pageNumber, this.paginator.perPage).subscribe(
      response => {
        this.users = response['data'];
        this.totalCount = response['total_count'];
      },
      error => alert('Ocorreu um erro ao tentar buscar os usuários:' + error)
    );
  }

  loadDataOnChange(event) {
    this.paginator.offset = event.first;
    this.paginator.perPage = event.rows;
    this.paginator.pageNumber = Math.ceil(this.paginator.offset / this.paginator.perPage) + 1;

    this.getPaginated();
  }

  delete(user) {
    this.confirmationService.confirm({
      header: 'Confirmação',
      message: 'Deseja realmente remover este usuário?',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.userService.delete(user.id).subscribe(
          response => this.getPaginated()
        );
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Usuário removido!'});
      },
      reject: () => {
        return false;
      }
    });
  }
}
