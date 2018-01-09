import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GamesProvider {

	constructor(public http: Http){}

	requestGamesByTitle(title){
		return this.http.get('http://localhost:8000/games/searchByTitle/' + title)
			.map(res => res.json());
	}

	requestGamesByIDs(IDs){
		return this.http.get('http://localhost:8000/games/searchByIDs/' + IDs)
			.map(res => res.json());	
	}

}
