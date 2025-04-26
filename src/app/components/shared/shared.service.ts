import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public postgreToken = localStorage.getItem('postgre-token');
}
