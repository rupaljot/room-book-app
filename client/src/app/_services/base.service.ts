import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  authToken : any;

  public hostname;
  public port;
  public url;
  
  constructor(
    readonly httpClient: HttpClient
  ) {
    
    this.hostname= 'http://localhost:';
    this.port= '8080/';
    this.url = this.hostname + this.port;
   }

  postMethod(json, api){
    let url = this.url + api;
    return this.httpClient.post(url, json);
  }

  getMethod(api){
    let url = this.url + api;
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    });
    this.loadToken();
    return this.httpClient.get(url, {headers: headers});
  }
  
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
