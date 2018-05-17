import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
  		if (localStorage.getItem('api_token') != null) {
  			return true;
  		}else{
  			this.router.navigate(['/login']);
  			return false;
  		}
  	}
  }

