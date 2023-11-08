import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { user } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;
  behaviorSubject = new BehaviorSubject<any>('');

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users'
  }

  setThisUser(user: user) {
    this.behaviorSubject.next(user);
  }

  getThisUser() {
    return this.behaviorSubject.asObservable();
  }

  signIn(user: user): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  login(user: user): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, user);
  }

  getAdmins() {
    return this.http.get<user[]>(`${this.myAppUrl}${this.myApiUrl}/admin`);
  }

  getUser(email: string): Observable<any> {
    return this.http.get<user>(`${this.myAppUrl}${this.myApiUrl}/login/${email}`);
  }

  getUsers() {
    return this.http.get<user[]>(`${this.myAppUrl}${this.myApiUrl}/login`);
  }
}
