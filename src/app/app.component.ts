import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IDataDetails { 
  Role: string;
  Salary: number;
}

export interface IData {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phone: string;
  photoUrl: string;
  details: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent {
  title = 'dotnet-ui';

  data: IData[] = []

  constructor(private httpClient: HttpClient) {

  /*   this.httpClient.get<any>('http://localhost:5135/api/v1/users').subscribe({
      next: (response: IData[]) => {

      response.forEach((item: IData) => {

        item.details = JSON.parse(item.details)

      });

       console.log(response);

      },
      error: (error) => {
        console.error(error);
      }
    }); */
  }
}
