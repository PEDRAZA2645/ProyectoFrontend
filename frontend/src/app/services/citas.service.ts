import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private baseUrl = 'http://localhost:8081/citas';

  constructor(private http: HttpClient) {}

  obtenerCitas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  obtenerCitaPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  agendarCita(cita: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, cita);
  }

  actualizarCita(id: string, cita: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, cita);
  }

  eliminarCita(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
