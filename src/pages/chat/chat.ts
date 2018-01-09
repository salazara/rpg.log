import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';

@IonicPage()
@Component({
	selector: 'page-chat',
	templateUrl: 'chat.html',
})
export class ChatPage {

	private firebaseUID = "";
	private nickname = "";
	private message = "";
	private messages = [];
	private messagesSubscription = null;
	private nicknameSubscription = null;

	constructor(
  		public navController: NavController,
  		public navParams: NavParams,
  		private angularFireAuth: AngularFireAuth,
  		private angularFireDatabase: AngularFireDatabase) {
  	
  	}

	sendMessage(){

		if(this.firebaseUID.length > 0 && this.nickname.length > 0 && this.message.length > 0){
			this.angularFireDatabase.list('messages').push({ 'firebaseUID': this.firebaseUID, 'nickname': this.nickname, 'message': this.message })
				.then(result => {
	           		this.message = "";
	          	});
		}
	}

	ionViewDidEnter(){

		this.angularFireAuth.authState
			.take(1)
			.subscribe(user => {
				if(user && user.email && user.uid){

					this.firebaseUID = user.uid;

					this.nicknameSubscription =
						this.angularFireDatabase.object('gamers/' + this.firebaseUID + '/nickname', { preserveSnapshot: true })
							.subscribe(snapshot => {
								this.nickname = snapshot.val();
							});

	  				this.messagesSubscription = 
	  					this.angularFireDatabase.list('messages', { query: { limitToLast: 10 }, preserveSnapshot: true })
	  						.subscribe(snapshots => {
		  						this.messages = [];
		  						snapshots.forEach(snapshot => {
		  							this.messages.push(snapshot.val());
		  						});
		  						this.messages.reverse();
							});

				} else {

					this.firebaseUID = "";	
				}  
			});
	}

	ionViewDidLeave() {

		if(this.nicknameSubscription){
			this.nicknameSubscription.unsubscribe();
		}
		if(this.messagesSubscription){
			this.messagesSubscription.unsubscribe();
		}
	}
}