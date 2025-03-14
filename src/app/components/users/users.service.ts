import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface INewUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUserCreatedDeleted {
  message: string;
}

export interface IUsersDetails {
  role: string;
  salary: number;
}

export interface IUsers {
  details: IUsersDetails | string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phone: string;
  photoUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = environment.baseUrl + 'v1/users';

  constructor(private http: HttpClient) {
   }

  public getUsers(): Observable<Array<IUsers>> {
    return this.http.get<Array<IUsers>>(this.url);
  }

  public addNewUser(newUser: INewUser): Observable<IUserCreatedDeleted> {
    return this.http.post<any>(this.url, newUser)
  }   
  
  public updateUser(id: number, newUser: INewUser): Observable<IUserCreatedDeleted> {
    return this.http.put<any>(this.url + '/' + id, newUser)
  } 
  
  public deleteUser(id: number): Observable<IUserCreatedDeleted> {
    return this.http.delete<any>(this.url + '/' + id)
  }
}
