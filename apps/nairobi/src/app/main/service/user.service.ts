import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { UserDto } from '@nairobi/api-interfaces'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>('/api/users')
  }
}
