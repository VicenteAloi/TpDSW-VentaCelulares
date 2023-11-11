import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/publications'
  }

  getPublications(id: number) {
    const idAdministrator = id
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${idAdministrator}`)
  }

}
