import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { StockData } from '../stockdata.model';

@Injectable()
export class StockService {
// https://iextrading.com/developer/docs/#stocks
  // https://api.iextrading.com/1.0/stock/aapl/batch?types=quote,news,chart&range=1m&last=100
  // https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,news,chart&range=1m&last=5

  url = 'https://api.iextrading.com/1.0/stock/market/batch?symbols=';
  url2 = '&types=quote,news,chart&last=5&range=';

	constructor(private http:HttpClient) {
  }

  stock(symbols, range): Observable<StockData[]> {
    var url = this.url + symbols + this.url2 + range;

    console.log(url);

    return this.http.get<StockData[]>(url).pipe(map(data => Object.keys(data).map(k => data[k])))
  }

}
