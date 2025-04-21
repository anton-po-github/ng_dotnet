import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface INewUser {
  firstName: string;
  lastName: string;
  email: string;
  photo: File;
}

export interface IUserCreatedDeleted {
  message: string;
}

export interface IUsersDetails {
  role: string;
  salary: number;
}

export interface IUsersData {
  details: IUsersDetails | string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phone: string;
  photoUrl: string;
}

export interface IUsers {
  count: number;
  pageIndex: number;
  pageSize: number;
  data: Array<IUsersData>;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = environment.baseUrl + 'v1/users';

  constructor(private http: HttpClient) {}

  public getUsers(params?: string): Observable<Array<IUsers>> {
    let userUrl = this.url;

    if (params) {
      userUrl += params;
    }

    let headers = new HttpHeaders();

    headers = headers.set(
      'Authorization',
      `Bearer ${localStorage.getItem('postgre-token')}`
    );

    return this.http.get<Array<IUsers>>(userUrl, { headers });
  }

  public addNewUser(newUser: INewUser): Observable<IUserCreatedDeleted> {
    return this.http.post<any>(this.url, this.getFormDataUser(newUser));
  }

  public updateUser(
    id: string,
    newUser: INewUser
  ): Observable<IUserCreatedDeleted> {
    return this.http.put<any>(
      this.url + '/' + id,
      this.getFormDataUser(newUser)
    );
  }

  public deleteUser(id: string): Observable<IUserCreatedDeleted> {
    return this.http.delete<any>(this.url + '/' + id);
  }

  private getFormDataUser(newUser: INewUser): FormData {
    const formData: FormData = new FormData();

    formData.append('photo', newUser.photo);
    formData.append('firstName', newUser.firstName);
    formData.append('lastName', newUser.lastName);
    formData.append('email', newUser.email);

    return formData;
  }
}
