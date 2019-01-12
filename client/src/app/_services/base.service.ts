import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

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
}
