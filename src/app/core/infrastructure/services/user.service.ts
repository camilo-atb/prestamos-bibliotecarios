import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../domain/entities/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}${environment.endpoints.users}`);
  }

  getUserByDocument(document: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}${environment.endpoints.users}?document=${document}`);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}${environment.endpoints.users}/${userId}`);
  }

  getUserByName(name: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}${environment.endpoints.users}?name=${name}`);
  }
}
