import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import {IpAddressData} from "../ipaddressdata.model";

@Injectable()
export class GetIPAddressService {
	url = 'http://ipinfo.io/json';

    constructor(private http:HttpClient) {
    }

    find(): Observable<IpAddressData> {
        return this.http.get<IpAddressData>(this.url);
    }
}