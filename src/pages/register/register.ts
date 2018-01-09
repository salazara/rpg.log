import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

import { GamesProvider } from '../../providers/games/games';

@IonicPage()
@Component({
	selector: 'page-register',
	templateUrl: 'register.html',
})
export class RegisterPage {

	user = {} as User;
	confirmPassword: string;

	constructor(
		public navController: NavController, 
		public navParams: NavParams,
		private angularFireAuth: AngularFireAuth,
		public gamesProvider : GamesProvider) {

		this.user.email = "";
		this.user.password = "";
		this.confirmPassword = "";
	}

	async register(user){

		if(this.user.password == this.confirmPassword){

			try {
				const createdUser = await this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
	        	
	        	if(createdUser){
	        		alert('Successful registration with ' + user.email);
				}

			} catch (e) {
				alert(e);

			}
		} else {
			alert('Error: The passwords do not match.');
		}
	}
}
