import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Organization } from './organization';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class OrganizationService {
  public baseUrl = 'http://api.sycomm.com:3000/organizations';
  private headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/vnd.sycomm.v1'});

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.baseUrl, {headers: this.headers})
      .pipe(
        tap(users => console.log(users)),
        catchError(this.handleErrors)
      );
  }

  private handleErrors(error: Response) {
    console.error('Erro em OrganizationService: ' + error);
    return Observable.throw(error);
  }
}