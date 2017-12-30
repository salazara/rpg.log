import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { GamesProvider } from '../../providers/games/games';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	private games = [];
	
	constructor(
		public navController: NavController,
		public actionSheetController : ActionSheetController,
		public alertController: AlertController,
		public modalController: ModalController,
		public gamesProvider : GamesProvider) {

	}
	
	searchGames(input){

		this.games = [];
		
		let searchTitle = input.target.value;
		
		if(searchTitle && searchTitle.length > 2){
		
			this.gamesProvider.requestGames(searchTitle)
				.subscribe(
					data => {
	        			for(let i = 0 ; i < data.length ; i++)
	        				this.games.push(data[i]);
	    			}
	    		);
		}
	}

	gameSelected(game){

  		//this.navController.push(DetailPage, { game: game });
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
	        		this.gamesProvider.requestAddToBacklog('5a2cb46df7171cf22ad98543', game._id)
	        			.subscribe(
	        				data => {
	        					this.showAlert('Added to BACKLOG', game.title);
	        				}
	        			);
	        	}
	        },{
	        	text: 'Add to RECOMMENDATIONS',
	        	handler: () => {
	        		this.gamesProvider.requestAddToRecommendations('5a2cb46df7171cf22ad98543', game._id)
	        			.subscribe(
	        				data => {
	        					this.showAlert('Added to RECOMMENDATIONS', game.title);
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

	showAlert(title, gameTitle) {
    	let alert = this.alertController.create({
      		title: title,
      		subTitle: gameTitle,
      		buttons: ['OK']
    	});
    	alert.present();
	}
}