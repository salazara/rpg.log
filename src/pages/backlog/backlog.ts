import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';

import { GamesProvider } from '../../providers/games/games';
import { DetailPage } from '../detail/detail';

@IonicPage()
@Component({
  selector: 'page-backlog',
  templateUrl: 'backlog.html',
})
export class BacklogPage {

	private selected = "backlog";

	private firebaseUID = "";
	private nickname = "";
	private backlog;
	private recommendations;

	constructor(
		public navController: NavController,
		public navParams: NavParams,
		public alertController: AlertController,
		public actionSheetController: ActionSheetController,
		public modalController: ModalController,
		public gamesProvider : GamesProvider,
		private angularFireAuth : AngularFireAuth,
		private angularFireDatabase : AngularFireDatabase) {

	}

	gameSelected(game){

  		let modal = this.modalController.create(DetailPage, {game: game});
    	modal.present();
	}

	gameOptionsSelected(event, game){
		
		event.stopPropagation();

	    if(this.selected == "backlog"){

	    	let actionSheet = this.actionSheetController.create({
		    	title: game.title,
		    	buttons: [
		        	{
		        		text: 'Remove from BACKLOG',
		        		handler: () => {
		        			if(this.firebaseUID.length > 0){		  

		        				this.backlog.remove(game._id).then(result => {
			        				this.showAlert('Removed from BACKLOG', game.title);
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
	    } else if(this.selected == "recommendations"){

	    	let actionSheet = this.actionSheetController.create({
		    	title: game.title,
		    	buttons: [
		        	{
		        		text: 'Remove from RECOMMENDATIONS',
		        		handler: () => {
		        			if(this.firebaseUID.length > 0){		  
			
								this.recommendations.remove(game._id).then(result => {
			        				this.showAlert('Removed from RECOMMENDATIONS', game.title);
			        			});

				        	} else {
				        		this.showAlert('ERROR', 'You are not signed in.');
			        		}
		        		}
		        	},{
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
		        		text: 'Cancel',
		        		role: 'cancel',
		        	}
		      	]
		    });
		    actionSheet.present();
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
		        	this.backlog = this.angularFireDatabase.list('gamers/' + this.firebaseUID + '/backlog');
		        	this.recommendations = this.angularFireDatabase.list('gamers/' + this.firebaseUID + '/recommendations');

				} else {

					this.firebaseUID = "";	
				}
			});
	}
}
