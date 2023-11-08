import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { user } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdministratorsService {

  administrators: any = [];

  private administratorsSubject: BehaviorSubject<user[]> = new BehaviorSubject<user[]>([]);
  constructor(private http: HttpClient) { }
  postAdministrator(administratorEnter: user) {
    //ACA MANDAMOS MEDIANTE UN POST A LA API
    return this.http.post('http://localhost:3001/api/Administrators', administratorEnter);
  }

  retraiveAdministrator() {
    this.http.get('http://localhost:3001/api/Administrators').subscribe(administrators => {
      this.administrators = administrators;
      this.administratorsSubject.next(this.administrators)
    });
    console.log(this.administratorsSubject);
    return this.administratorsSubject.asObservable();
  }

  deleteAdministrator(administrator: user) {
    const dniAdministrator = administrator.dni;
    return this.http.delete(`http://localhost:3001/api/Administrators/${dniAdministrator}`);
  }

  updateAdministrator(administratorModify: user) {
    const dniAdministrator = administratorModify.dni;
    return this.http.put(`http://localhost:3001/api/Administrators/${dniAdministrator}`, administratorModify)
  }
}
