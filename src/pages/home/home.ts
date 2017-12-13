import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	private games = [];
	
	constructor(public navCtrl: NavController, public actionSheetController : ActionSheetController, public alertController: AlertController, public http : Http){}
	
	getGames(input){

		this.games = [];
		let searchTitle = input.target.value;

		if(searchTitle && searchTitle.length > 2){

			this.http.get('http://localhost:8000/games/searchTitle/' + searchTitle).map(res => res.json()).subscribe(data => {

	        	for(let i = 0 ; i < data.length ; i++)
	        		this.games.push(data[i]);
	    	});
		}
	}

	gameSelected(game){

  		this.navCtrl.push(DetailPage, { game: game });
	}

	addSelected(event, game){
		
		event.stopPropagation();
	    
	    let actionSheet = this.actionSheetController.create({
	      title: game.title,
	      buttons: [
	        {
	        	text: 'Add to BACKLOG',
	        	handler: () => {
	        		alert('Backlog');
	        	}
	        },{
	        	text: 'Add to RECOMMENDATIONS',
	        	handler: () => {
	        		alert('Recommendations');
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