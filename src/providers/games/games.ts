import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GamesProvider {

	constructor(public http: Http){}

	requestGames(searchTitle){
		return this.http.get('http://localhost:8000/games/searchTitle/' + searchTitle)
			.map(res => res.json());
	}

	requestBacklog(gamerID){
		return this.http.get('http://localhost:8000/games/backlog/' + gamerID)
			.map(res => res.json());
	}

	requestRecommendations(gamerID){
		return this.http.get('http://localhost:8000/games/recommendations/' + gamerID)
			.map(res => res.json());
	}

	requestAddToBacklog(gamerID, gameID){
        let headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
		
		let requestOptions = new RequestOptions({ headers: headers });
        let data = 'gamerID='+gamerID+'&gameID='+gameID;
       	
		return this.http.put('http://localhost:8000/gamer/addToBacklog', data, requestOptions)
			.map(res => res.json());
	}

	requestAddToRecommendations(gamerID, gameID){
        let headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
		
		let requestOptions = new RequestOptions({ headers: headers });
        let data = 'gamerID='+gamerID+'&gameID='+gameID;

		return this.http.put('http://localhost:8000/gamer/addToRecommendations', data, requestOptions)
			.map(res => res.json());
	}

	requestRemoveFromBacklog(gamerID, gameID){
        let headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
		
		let requestOptions = new RequestOptions({ headers: headers });
        let data = 'gamerID='+gamerID+'&gameID='+gameID;
       	
		return this.http.put('http://localhost:8000/gamer/removeFromBacklog', data, requestOptions)
			.map(res => res.json());
	}

	requestRemoveFromRecommendations(gamerID, gameID){
        let headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
		
		let requestOptions = new RequestOptions({ headers: headers });
        let data = 'gamerID='+gamerID+'&gameID='+gameID;
       	
		return this.http.put('http://localhost:8000/gamer/removeFromRecommendations', data, requestOptions)
			.map(res => res.json());
	}
}
