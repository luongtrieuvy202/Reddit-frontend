import { Injectable } from '@angular/core';
import { SignupRequestPayload } from '../sign-up/signup-request.payload';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponsePayload } from '../login/login-response.payload';
import { LocalStorage } from 'ngx-webstorage';
import { LocalStorageService } from 'ngx-webstorage';
import { map,tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

	refreshTokenPayload = {
		refreshToken = this.getRefreshToken();
		username = this.getUserName();

	}

  constructor(private httpClient:HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequestPayload:SignupRequestPayload):Observable<any>{
    return this.httpClient.post('http://localhost:8080/api/auth/signup',signupRequestPayload,{responseType: 'text'})
  }

  login (loginRequestPayload:LoginRequestPayload):Observable<any> {
	return this.httpClient.post<LoginResponsePayload>('http://localhost:8080/api/auth/login', loginRequestPayload)
		.pipe(map((data) => {
			this.localStorage.store('authenticationToken', data.authenticationToken);
			this.localStorage.store('username', data.username);
			this.localStorage.store('refreshToken',data.refreshToken);
			this.localStorage.store('expiresAt', data.expireAt);
		}));
  }


  refreshToken(){
	const refreshTokenPayload = {
		refreshToken: this.getRefreshToken(),
		username:this.getUserName()
	}


	return this.httpClient.post<LoginResponsePayload>('http://localhost:8080/api/auth/refresh/token', refreshTokenPayload).pipe(tap(response => {
		this.localStorage.store('authenticationToken',response.authenticationToken);
		this.localStorage.store('expireAt', response.expireAt);
	}));
  }


  getJwtToken(){
	return this.localStorage.retrieve('authenticationToken');
  }	


  getRefreshToken(){
	return this.localStorage.retrieve('refreshToken');
  }



  getUserName(){
	return this.localStorage.retrieve('username');
  }



  getExpirationTime(){
	return this.localStorage.retrieve('expireAt');
  }


  logout() {
	this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload, {responseType:'text'}).subscribe({
		next:(data:any) =>{
			console.log(data);
		},

		error:(err:Error) => {
			console.log(err);
		}
	})
  }


  isLoggedIn(): boolean{
	return this.getJwtToken() != null;
  }


}
