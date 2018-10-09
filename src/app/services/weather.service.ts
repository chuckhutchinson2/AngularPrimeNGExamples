import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import {WeatherData} from "../weatherdata.model";

@Injectable()
export class WeatherService {
	url = 'http://api.openweathermap.org/data/2.5/weather';
	// http://api.openweathermap.org/data/2.5/weather?lat=39.0060\&lon=-77.1025\&appid=a83a945cf53e3bda935a5417012359b5

    constructor(private http:HttpClient) {
    }

    get(latitude, longitude): Observable<WeatherData> {
    	// https://stackoverflow.com/questions/19477324/how-do-i-calculate-the-temperature-in-celsius-returned-in-openweathermap-org-jso
    	var url = this.url + '?lat='+ latitude + '&lon=' + longitude + '&appid=a83a945cf53e3bda935a5417012359b5&units=imperial';
        return this.http.get<WeatherData>(url);
    }
}