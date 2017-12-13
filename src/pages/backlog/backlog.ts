import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

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

	constructor(public navCtrl: NavController, public navParams: NavParams, public http : Http) {

		this.http.get('http://localhost:8000/games/backlog/5a2cb46df7171cf22ad98543').map(res => res.json()).subscribe(data => {
			for(let i = 0 ; i < data.length ; i++)
	       		this.backlog.push(data[i]);
	    });
		this.http.get('http://localhost:8000/games/recommendations/5a2cb46df7171cf22ad98543').map(res => res.json()).subscribe(data => {
			for(let i = 0 ; i < data.length ; i++)
	       		this.recommendations.push(data[i]);
	    });

	}

	gameSelected(game){

  		this.navCtrl.push(DetailPage, { game: game });
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BacklogPage');
	}
}
