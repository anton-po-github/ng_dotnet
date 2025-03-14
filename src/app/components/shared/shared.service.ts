import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public token = localStorage.getItem('token')

  constructor() { 
  }

}
