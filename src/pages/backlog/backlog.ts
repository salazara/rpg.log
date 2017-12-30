import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

import { GamesProvider } from '../../providers/games/games';
import { DetailPage } from '../detail/detail';

@IonicPage()
@Component({
  selector: 'page-backlog',
  templateUrl: 'backlog.html',
})
export class BacklogPage {

	private selected = "backlog";
	private backlog = [];
	private recommendations = [];

	constructor(
		public navController: NavController,
		public navParams: NavParams,
		public alertController: AlertController,
		public actionSheetController: ActionSheetController,
		public modalController: ModalController,
		public gamesProvider : GamesProvider) {

	}

	gameSelected(game){

  		//this.navController.push(DetailPage, { game: game });
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
		        			this.gamesProvider.requestRemoveFromBacklog('5a2cb46df7171cf22ad98543', game._id)
		        				.subscribe(
		        					data => {
			        					for(var i = 0 ; i < this.backlog.length ; i++){
			        						if(this.backlog[i]._id == game._id){
			        							this.backlog.splice(i, 1);	        		
			        						}
			        					}
			        					this.showAlert('Removed from BACKLOG', game.title);
			        				}
			        			);
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
		        			this.gamesProvider.requestRemoveFromRecommendations('5a2cb46df7171cf22ad98543', game._id)
		        				.subscribe(
		        					data => {
						        		for(var i = 0 ; i < this.recommendations.length ; i++){
						        			if(this.recommendations[i]._id == game._id){
						        				this.recommendations.splice(i, 1);	        		
						        			}
						        		}
						    			this.showAlert('Removed from RECOMMENDATIONS', game.title);
					    			}
		        				);
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

	showAlert(title, gameTitle) {
    	let alert = this.alertController.create({
      		title: title,
      		subTitle: gameTitle,
      		buttons: ['OK']
    	});
    	alert.present();
	}

	ionViewDidEnter(){

		this.backlog = [];
		this.recommendations = [];

		this.gamesProvider.requestBacklog('5a2cb46df7171cf22ad98543')
			.subscribe(
				data => {	
					for(let i = 0 ; i < data.length ; i++)
		       			this.backlog.push(data[i]);
		    	}
		    );

		this.gamesProvider.requestRecommendations('5a2cb46df7171cf22ad98543')
			.subscribe(
				data => {	
					for(let i = 0 ; i < data.length ; i++)
		       			this.recommendations.push(data[i]);
		    	}
		    );
	}
}
