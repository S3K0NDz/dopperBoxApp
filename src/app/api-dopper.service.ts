import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDopperService {
  private baseUrl = 'https://sinanuncios.es/dopper/pizApi.php/' + Date.now(); // Cambia la URL base según la ubicación de tu servidor PHP
  //private baseUrl = 'http://localhost/pizApi.php'; // Cambia la URL base según la ubicación de tu servidor PHP

  constructor(private http: HttpClient) { }

  private getNoCacheHttpOptions(): { headers: HttpHeaders, params: HttpParams } {
    const timestamp = new Date().getTime();
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    });
    const params = new HttpParams().set('timestamp', timestamp.toString());

    return { headers, params };
  }


  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return new Observable<never>((observer) => {
      observer.error('Something bad happened; please try again later.');
      observer.complete();
    });
  }

  // Función para obtener registros por empresa
  getRegistrosPorEmpresa(nombreEmpresa: string): Observable<any> {
    const url = `${this.baseUrl}?empresa=${nombreEmpresa}`;
    return this.http.get<any>(url);
  }

  // Función para obtener registros por empresa
  getIdEmpresa(nombreEmpresa: string): Observable<any> {
    const url = `${this.baseUrl}?id_nombre_empresa=${nombreEmpresa}`;
    return this.http.get<any>(url);
  }

  // Función para obtener un registro por ID
  getRegistroPorId(id: number): Observable<any> {
    const url = `${this.baseUrl}?id=${id}`;
    return this.http.get<any>(url);
  }

  // Función para obtener todos los registros
  getRegistros(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // Función para crear un nuevo registro
  createRegistro(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  // Función para actualizar un registro existente
  updateRegistro(data: any): Observable<any> {
    return this.http.put<any>(this.baseUrl, data);
  }

  // Función para eliminar un registro por ID
  deleteRegistro(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl, { body: { id } });
  }


  getDevicesPorEmpresa(idEmpresa: number): Observable<any> {
    const url = `${this.baseUrl}?id_empresa=${idEmpresa}`;
    return this.http.get<any>(url);
  }

  insertDeviceEmpresa(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  deleteDeviceEmpresa(idEmpresa: any, device: string): Observable<any> {
    const url = this.baseUrl;
    const data = {
      id_empresa: idEmpresa,
      device: device
    };
    return this.http.request<any>('delete', url, { body: data });
  }




}
