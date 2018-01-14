import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';

import { GamesProvider } from '../../providers/games/games';

import { DetailPage } from '../detail/detail';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	private firebaseUID = "";
	private nickname = "";
	private games = [];
	private backlog = null;
	private recommendations = null;
	private nicknameSubscription = null;
	
	constructor(
		private app: App,
		private navController: NavController,
		private actionSheetController : ActionSheetController,
		private alertController: AlertController,
		private modalController: ModalController,
		private gamesProvider : GamesProvider,
		private angularFireAuth : AngularFireAuth,
		private angularFireDatabase : AngularFireDatabase) {

	}

	logout(){

		this.angularFireAuth.auth.signOut().then(() => {
			if(this.nicknameSubscription){
				this.nicknameSubscription.unsubscribe();
			}
			this.app.getRootNav().setRoot(LoginPage);
	    });
	}
	
	searchGames(input){

		this.games = [];
		let title = input.target.value;
		
		if(title && title.length > 2){
		
			this.gamesProvider.requestGamesByTitle(title)
				.subscribe(
					data => {
	        			for(let i = 0 ; i < data.length ; i++)
	        				this.games.push(data[i]);
	    			}
	    		);
		}
	}

	gameSelected(game){

  		let modal = this.modalController.create(DetailPage, {game: game});
    	modal.present();
	}

	gameOptionsSelected(event, game){
		
		event.stopPropagation();
	    
	    let actionSheet = this.actionSheetController.create({
	      title: game.title,
	      buttons: [
	        {
	        	text: 'Add to BACKLOG',
	        	handler: () => {
	        		if(this.firebaseUID.length > 0){
		  
	        			this.backlog.update(game._id, game).then(result => {
	        				this.showAlert('Added to BACKLOG', game.title);
	        			});
		        	} else {
		        		this.showAlert('ERROR', 'You are not signed in.');
	        		}
	        	}
	        },{
	        	text: 'Add to RECOMMENDATIONS',
	        	handler: () => {
	        		if(this.firebaseUID.length > 0){

	        			this.recommendations.update(game._id, game).then(result => {
	        				this.showAlert('Added to RECOMMENDATIONS', game.title);
	        			});
		        	} else {
		        		this.showAlert('ERROR', 'You are not signed in.');
		        	}
	        	}
	        },{
	        	text: 'Cancel',
	        	role: 'cancel',
	        }
	      ]
	    });
	    actionSheet.present();
	}

	showAlert(title, subTitle) {
    	let alert = this.alertController.create({
      		title: title,
      		subTitle: subTitle,
      		buttons: ['OK']
    	});
    	alert.present();
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

		        	this.backlog = this.angularFireDatabase.list('gamers/' + this.firebaseUID + '/backlog');
		        	this.recommendations = this.angularFireDatabase.list('gamers/' + this.firebaseUID + '/recommendations');

				} else {
					
					this.firebaseUID = "";
				}
			});
	}

	ionViewDidLeave() {

		if(this.nicknameSubscription){
			this.nicknameSubscription.unsubscribe();
		}
	}
}