import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/take';
import "rxjs/add/operator/map";

@IonicPage()
@Component({
	selector: 'page-chat',
	templateUrl: 'chat.html',
})
export class ChatPage {

	private firebaseUID = "";
	private nickname = "";
	private message = "";
	private messages;

	constructor(
  		public navController: NavController,
  		public navParams: NavParams,
  		private angularFireAuth: AngularFireAuth,
  		private angularFireDatabase: AngularFireDatabase) {
  	
  	}

	sendMessage(){

		if(this.firebaseUID.length > 0 && this.nickname.length > 0 && this.message.length > 0){
			this.angularFireDatabase.list('messages').push({ 'nickname': this.nickname, 'message': this.message })
				.then(result => {
	           		this.message = "";
	           		this.messages = this.angularFireDatabase.list('messages', { query: { limitToLast: 10 }})
	  									.map((array) => array.reverse()) as FirebaseListObservable<any[]>;
	          	});
		}
	}

	ionViewDidEnter(){

		this.angularFireAuth.authState
			.take(1)
			.subscribe(user => {
				if(user && user.email && user.uid){

					this.firebaseUID = user.uid;
					this.angularFireDatabase.object('gamers/' + this.firebaseUID + '/nickname', { preserveSnapshot: true })
	  					.take(1)
	  					.subscribe(snapshot => {
							this.nickname = snapshot.val();
						});
	  				this.messages = this.angularFireDatabase.list('messages', { query: { limitToLast: 10 }})
	  									.map((array) => array.reverse()) as FirebaseListObservable<any[]>;

				} else {

					this.firebaseUID = "";	
				}
			});
	}
}