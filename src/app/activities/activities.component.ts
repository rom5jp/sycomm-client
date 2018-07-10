import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute , Router} from '@angular/router';
import { ActivityService } from './shared/activity.service';
import { Activity } from './shared/activity.model';
import { AuthService } from '../shared/auth.service';
import {Dictionary} from '../shared/dictionary';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  userActivities: Array<Activity>;
  columns: any[];
  pageSizes = [10, 20, 50];
  paginator = {
    pageNumber: 0,
    perPage: this.pageSizes[0],
    offset: 0
  };
  totalCount = 0;

  constructor(
    private activityService: ActivityService,
    public authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dictionary: Dictionary
  ) {
    this.columns = [
      { field: 'name', header: 'Nome' },
      { field: 'description', header: 'Anotaçoes' },
      { field: 'activity_type', header: 'Tipo' },
      { field: 'status', header: 'Status' },
      { field: 'annotations', header: 'Anotaçoes' },
    ];
  }

  ngOnInit() {
    this.listPaginated();
  }

  listPaginated() {
    if (this.authService.isAdmin()) {
      this.listAllPaginated();
    } else {
      this.listUserActivitiesPaginated();
    }
  }

  listAllPaginated() {
    this.activityService.listAllPaginated(this.paginator.pageNumber, this.paginator.perPage).subscribe(
      successResponse => {
        this.userActivities = successResponse.json()['data'];
        this.totalCount = successResponse.json()['total_count'];
      },
      errorResponse => {
        console.error('Ocorreu um erro ao tentar buscar as atividades: ' + errorResponse);
      }
    );
  }

  listUserActivitiesPaginated() {
    this.activityService.listUserActivitiesPaginated(this.authService.getCurrentUser()['id'], this.paginator.pageNumber, this.paginator.perPage).subscribe(
      successResponse => {
        this.userActivities = successResponse.json()['data'];
        this.totalCount = successResponse.json()['total_count'];
      },
      errorResponse => {
        console.error('Ocorreu um erro ao tentar buscar as atividades deste usuário:' + errorResponse);
      }
    );
  }

  loadDataOnChange(event) {
    this.paginator.offset = event.first;
    this.paginator.perPage = event.rows;
    this.paginator.pageNumber = Math.ceil(this.paginator.offset / this.paginator.perPage) + 1;

    this.listPaginated();
  }
}
