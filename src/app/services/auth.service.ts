// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { Router } from '@angular/router';
// import { AuthInterceptor } from '../interceptors/auth.interceptor';
// import { ToastrService } from 'ngx-toastr';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private readonly TOKEN_KEY = 'auth_token';
//   private readonly USER_ID_KEY = 'userId';
// //   private loggedIn = new BehaviorSubject<boolean>(false);

//   constructor(
//     private http: HttpClient, 
//     private jwtHelper: JwtHelperService,
//     private router: Router,
//     private toastr: ToastrService
//     ) {
//   }

//   getAuthToken() {
//     return localStorage.getItem(this.TOKEN_KEY);
//   }

//   setAuthToken(token: string): void {
//     localStorage.setItem(this.TOKEN_KEY, token);
//   }

//   removeAuthToken(): void {
//     localStorage.removeItem(this.TOKEN_KEY);
//   }

//   getUserId() {
//     return localStorage.getItem(this.USER_ID_KEY);
//   }

//   setUserId(userId: string): void {
//     localStorage.setItem(this.USER_ID_KEY, userId);
//   }

//   removeUserId(): void {
//     localStorage.removeItem(this.USER_ID_KEY);
//   }

//   login(user: app.models.LoginUserModel): void { 
    
//     this.http.post('https://localhost:7038/api/login/login', user, {withCredentials: true})
//     .subscribe((res: any) => { 
//       if(res.event === "LOGIN_SUCCESSFUL" && res.token) { 
//         AuthInterceptor.auth_token = res.token;
//         const decodedToken = this.jwtHelper.decodeToken(AuthInterceptor.auth_token);
//         const decodedId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
        
//         localStorage.setItem('userId', decodedId);
//         localStorage.setItem('auth_token', AuthInterceptor.auth_token);
//         this.router.navigate(['/home-dashboard'])
//         this.toastr.success('Autentificare reușită!');
//       }

//       if(res.event === "LOGIN_FAIL") { 
//         this.toastr.error('User sau parolă greșită. Vă rugăm reîncercați!');
//       }
//     })
//   }

//   logout(): void {
//     this.removeAuthToken();
//     this.removeUserId();
//   }

//   isLoggedIn(): boolean {
//     const token = this.getAuthToken();
//     return !this.jwtHelper.isTokenExpired(token);
//   }
// }