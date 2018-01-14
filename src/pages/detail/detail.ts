import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import { GamesProvider } from '../../providers/games/games';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

	private game = null;
	private recommendedGame = null;
	private recommendedGameSubscription = null;

	constructor(
		private navController: NavController, 
		private viewController: ViewController,
		private modalController: ModalController,
		private navParams: NavParams,
		private gamesProvider : GamesProvider,
		private angularFireDatabase: AngularFireDatabase) {

		this.game = navParams.get('game');

		this.recommendedGameSubscription = 
			this.angularFireDatabase.list('gamers', { preserveSnapshot: true })
	  			.subscribe(snapshots => {
	  				
	  				// Map of game votes; the game with the highest votes becomes the recommended game
		  			var gameVotes = {};
		  			
		  			// Snapshots is a list of users
		  			snapshots.forEach(snapshot => {

		  				// Snapshot is a single user
		  				if(snapshot.val().recommendations){		

		  					// User's recommendations
		  					var recommendations = snapshot.val().recommendations;
		  					
		  					// Check if game is in user's recommendations
		  					var isInRecommendations = false;
		  					for(var key_id in recommendations){
		  						if(key_id == this.game._id){
		  							isInRecommendations = true;
		  							break;
		  						}
		  					}

		  					// If game is in user's recommendations, then tally the votes
		  					if(isInRecommendations){
			  					for(var key_id in recommendations){

			  						if(key_id != this.game._id){

			  							if(!gameVotes.hasOwnProperty(key_id)){

				  							gameVotes[key_id] = 1;

				  						} else{

				  							gameVotes[key_id] += 1;

				  						}
			  						} 
			  					}
		  					}
		  				}
		  			});
		  			
		  			// Find the games with the highest votes

		  			var recommendedGames_ids = [];
		  			var maxGameVotes = 0;
		  			
		  			for(var key_id in gameVotes){
		  			
		  				if(maxGameVotes < gameVotes[key_id]){
		  					
		  					recommendedGames_ids = [];
		  					recommendedGames_ids.push(key_id);
		  					
		  					maxGameVotes = gameVotes[key_id];	
		  			
		  				} else if (maxGameVotes == gameVotes[key_id]){

		  					recommendedGames_ids.push(key_id);
		  				}
		  			}

		  			// Randomly pick a game with the highest votes
		  			// 0 <= recommendedGame_id < recommendedGame_ids.length
		  			if(recommendedGames_ids.length > 0){

			  			var recommendedGame_id = recommendedGames_ids[ Math.floor( Math.random() * recommendedGames_ids.length ) ];
						
						this.gamesProvider.requestGamesByIDs(recommendedGame_id)
							.subscribe(
								data => {
				        			this.recommendedGame = data[0];
				    			}
				    		);
					}	
				});

	}

	dismiss(){
		this.viewController.dismiss();
		this.recommendedGameSubscription.unsubscribe();
	}

	viewRecommendedGame(){
  		let modal = this.modalController.create(DetailPage, {game: this.recommendedGame});
    	modal.present();
	}
}
