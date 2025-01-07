import { Injectable } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public authenticate(credenciais: Credenciais){

    return this.http.post(`${API_CONFIG.baseUrl}/login`, credenciais, {
      observe: 'response', 
      responseType: 'text'
    })

  }
}
