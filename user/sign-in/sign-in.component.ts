import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { Data } from '../../data';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoginError: boolean = false;
  user = new User;
  logedUser: User;



  constructor(private userService: UserService, private router: Router, private data: Data) { }

  ngOnInit() {
  }

onSubmit(user: User){

	// this.userService.userAuth2(user).subscribe(logedUser => {
	// 	console.log(this.logedUser);
	// });
	
	this.userService.userAuth2(user).subscribe((data:any)=>{
		localStorage.setItem('api_token', data.api_token);
		localStorage.setItem('id_user', data.id);
		this.router.navigate(['/products']);
		this.data.currentUserId = data.id;
		//console.log(data.api_token);
		//console.log(localStorage.getItem('api_token'));

	}, 
	(err : HttpErrorResponse)=>{
		this.isLoginError= true;
	});

}


}
