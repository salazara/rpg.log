import { Component } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/take';

import { HomePage } from '../home/home';
import { BacklogPage } from '../backlog/backlog';
import { ChatPage } from '../chat/chat';

@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {

	tab1Root = HomePage;
	tab2Root = BacklogPage;
	tab3Root = ChatPage;

	constructor(
		private angularFireAuth: AngularFireAuth,
		private toastController: ToastController) {

	}

	ionViewDidLoad(){

		this.angularFireAuth.authState
			.take(1)
			.subscribe(user => {
				if(user && user.email && user.uid){
					this.toastController.create({
						message: "You are signed in as " + user.email + ".",
						duration: 1500
					}).present();
				} else {
					this.toastController.create({
						message: "You are not signed in.",
						duration: 1500
					}).present();
				}
			});
	}

	ionViewDidLeave(){

		this.toastController.create({
			message: "You are signed out.",
			duration: 1500
		}).present();
	}
}
