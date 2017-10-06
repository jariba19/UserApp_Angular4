import { Injectable } from '@angular/core';
import { User } from "./user";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {

  private apiUrl = "http://hello-world.innocv.com/api/user/";

  constructor(private http: Http) { 
  }

  findAll(): Observable<User[]>{
    return this.http.get(this.apiUrl + "getall")
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || "Server error"));
  }

  findById(id: number): Observable<User> {
    if (id == null || id == NaN)
      return null;
    else{
      return this.http.get(this.apiUrl + "get/" + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || "Server error"));
    }
  }
 
  saveUser(user: User) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var userJSON = {"name": user.name, "birthdate": user.birthdate};

    return this.http.post(this.apiUrl + "create", userJSON, options).subscribe(res => console.log(res.json()));
  }
 
  deleteUserById(id: number) {
    this.http.get(this.apiUrl + "remove/" + id).subscribe(res => console.log(res));
  }
 
  updateUser(user: User) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var userJSON = {"id": user.id, "name": user.name, "birthdate": user.birthdate};

    return this.http.post(this.apiUrl + "update", user, options).subscribe(res => console.log(res.json()));
  }
}
