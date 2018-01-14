import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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
		public alertController: AlertController,
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

	        		this.showAlert('', 'Successful registration with ' + user.email);
	        		this.navController.pop();

				}

			} catch (e) {
				this.showAlert('', e);

			}
		} else {
			this.showAlert('' ,'Error: The passwords do not match.');
		}
	}

	showAlert(title, subTitle) {
    	let alert = this.alertController.create({
      		title: title,
      		subTitle: subTitle,
      		buttons: ['OK']
    	});
    	alert.present();
	}
}
