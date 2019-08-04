import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = 'https://vast-shore-74260.herokuapp.com/banks?city=';
  constructor(private httpClient: HttpClient) { }

  public getUsers(urlSite?: string) {return this.httpClient.get<User[]>(`${this.apiURL}` + urlSite);}
}
