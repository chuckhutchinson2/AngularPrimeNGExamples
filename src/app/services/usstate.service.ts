
import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { USStateData, Coordinate } from '../usstatedata.model';

export class USStateService {

  	url = '/states.json';

    constructor(private http:HttpClient) {
    }

    load(): Observable<USStateData[]> {
        return this.http.get<USStateData[]>(this.url);
    }
}