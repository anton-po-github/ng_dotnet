import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface INewUser {
  firstName: string;
  lastName: string;
  photoType: string;
  email: string;
  photo: File;
}

export interface IUserCreatedDeleted {
  message: string;
}

export interface IUsersDetails {
  Role: string;
  Salary: number;
}

export interface IUsersData {
  details: IUsersDetails | string;
  email: string;
  role: string;
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
  private usersUrl = environment.baseUrl + 'api/users';

  constructor(private http: HttpClient) {}

  public getUsers(params?: string): Observable<IUsers> {
    return this.http.get<IUsers>((this.usersUrl += params));
  }

  public addNewUser(newUser: INewUser): Observable<IUserCreatedDeleted> {
    return this.http.post<any>(this.usersUrl, this.getFormDataUser(newUser));
  }

  public updateUser(
    id: string,
    newUser: INewUser
  ): Observable<IUserCreatedDeleted> {
    return this.http.put<any>(
      this.usersUrl + '/' + id,
      this.getFormDataUser(newUser)
    );
  }

  public deleteUser(id: string): Observable<IUserCreatedDeleted> {
    return this.http.delete<any>(this.usersUrl + '/' + id);
  }

  private getFormDataUser(newUser: INewUser): FormData {
    const formData: FormData = new FormData();

    formData.append('photo', newUser.photo);
    formData.append('firstName', newUser.firstName);
    formData.append('lastName', newUser.lastName);
    formData.append('photoType', newUser.photoType);
    formData.append('email', newUser.email);

    return formData;
  }
}
