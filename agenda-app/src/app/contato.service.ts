import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contato } from './contato/contato';
import { PaginacaoContato } from './contato/paginacaoContato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  url: string = environment.apiBaseUrl;

  constructor(
    private http:HttpClient
  ) { }

  save(contato: Contato) : Observable<Contato>{
    return this.http.post<Contato>(this.url, contato);
  }

  /* sem paginação
  list(): Observable<Contato[]>{
    return this.http.get<any>(this.url);
  }
  */

  //com paginação
  list(page: number, size: number):Observable<PaginacaoContato>{
    const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    return this.http.get<any>(`${this.url}?${params.toString()}`)
  }

  favoritar(contato: Contato) : Observable<any>{
    return this.http.patch(`${this.url}/${contato.id}/favorito`, null);
  }

  upload(contato: Contato, formData: FormData) : Observable<any>{
    return this.http.put(`${this.url}/${contato.id}/foto`, formData, { responseType: 'blob' }); //para evitar retornar um json, mas sim um array de bytes
  }
}
