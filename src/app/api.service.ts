import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  redirectUrl: string | undefined;
  baseUrl: string = "https://sinanuncios.es/dopper/";
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  loggedInUsername: any;
  constructor(private httpClient: HttpClient) { }

  public userlogin(username: any, password: any) {
    return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password })
      .pipe(map(Users => {
        this.setToken(Users[0].name);
        this.loggedInUsername = username; // Asignar el nombre de usuario al servicio
        localStorage.setItem('loggedinusername', username); // Guardar el nombre de usuario en el LocalStorage
        this.getLoggedInName.emit(true);
        return Users;
      }));
  }


  public userregistration(nombre: any, email: any, password: any) {
    console.log(this.baseUrl + '/register.php', { nombre, email, password });
    return this.httpClient.post<any>(this.baseUrl + '/register.php', { nombre, email, password })
      .pipe(map(Users => {
        return Users;
      }));
  }

  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
    return false;
  }


}