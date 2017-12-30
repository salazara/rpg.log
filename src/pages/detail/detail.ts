import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

	private game;

	constructor(
		public navController: NavController, 
		public viewController: ViewController,
		public navParams: NavParams) {

		this.game = navParams.get('game');
	}

	dismiss(){
		this.viewController.dismiss();
	}
}
