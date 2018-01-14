import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';

import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	user = {} as User;

	constructor(
		public navController: NavController, 
		public navParams: NavParams,
		private alertController: AlertController,
		private angularFireAuth: AngularFireAuth,
		private angularFireDatabase: AngularFireDatabase) {

		this.user.email = "";
		this.user.password = "";
  	}

  	async login(user){

  		try {
  			
  			const signedIn = await this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);

  			if(signedIn){ 

  				// take(1) ensures that the subscription ends once there is a response
  				this.angularFireDatabase.object('gamers/' + signedIn.uid + '/nickname', { preserveSnapshot: true })
  					.take(1)
  					.subscribe(snapshot => {
						if(snapshot.exists()) {
							this.navController.setRoot(TabsPage);
						} else {
					  		this.showPromptNicknameRegistration(signedIn.uid);
						}
					});
			}

  		} catch (e) {

  			this.showAlert('', e);
  		}
  	}

	showPromptNicknameRegistration(firebaseUID) {
    	let prompt = this.alertController.create({
	      	title: 'Nickname Registration',
	      	message: 'Please enter a nickname for your RPG.log account.',
	      	inputs: [
	        	{
	          		name: 'nickname',
	          		placeholder: 'Nickname'
	        	},
	      	],
	      	buttons: [
	      		{
	          		text: 'Register',
	          		handler: data => {
	          			if(data.nickname && data.nickname.length > 0){
	          				this.angularFireDatabase.object('gamers/' + firebaseUID + '/nickname').set(data.nickname)
	          					.then(result => {
	           		 				this.navController.setRoot(TabsPage);
	          					});
	           		 	} else {
	           				this.showAlert('', 'Please enter a nickname for your RPG.log account.');
	           				return false;
	           		 	}
	          		}
	        	}
	      	]
    	});
    	prompt.present();
  	}

  	register(){
  		this.navController.push(RegisterPage);
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
