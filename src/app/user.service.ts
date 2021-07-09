import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
 
  constructor(private http: HttpClient,
    // private HttpHeaders: HttpHeaders
    ) { 
  }
  //  headers = new HttpHeaders()
  // headers=headers.append('Access-Control-Allow-Origin', '*')
  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    };
  }

  addUser(data :any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/admin/add-user',JSON.stringify(data),this.getHeaders());
  }

  getUser(data :any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/admin/get-user',JSON.stringify(data),this.getHeaders());
  }

  deleteUser(data :any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/admin/delete-user',JSON.stringify(data),this.getHeaders());
  }
  editUser(data :any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/admin/update-user',JSON.stringify(data),this.getHeaders());
  }
  
}
