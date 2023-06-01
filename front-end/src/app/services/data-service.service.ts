import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

  // Obtener informacion del cuestionario
  obtenerCuestionario(id: number) {
    return this.http.get(`http://localhost:3003/cuestionario/${id}`).toPromise();
  }
}
