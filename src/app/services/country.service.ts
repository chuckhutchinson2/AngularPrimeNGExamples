import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { CountryData } from "../countrydata.model";

@Injectable()
export class CountryService {

	url = 'https://restcountries.eu/rest/v2/all';

	constructor(private http:HttpClient) {
  	}

  	load(): Observable<CountryData[]> {
    	return this.http.get<CountryData[]>(this.url);
  }
}
