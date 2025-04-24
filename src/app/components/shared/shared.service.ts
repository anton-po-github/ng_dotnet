import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public isLoadingData = false;
  public token = localStorage.getItem('postgre-token');
}
