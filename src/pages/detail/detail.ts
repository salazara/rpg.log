import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

	private game;

	constructor(public navCtrl: NavController, public actionSheetController : ActionSheetController, public navParams: NavParams) {

		this.game = navParams.get('game');
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
