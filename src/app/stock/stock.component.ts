import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { StockData } from '../stockdata.model';
import { StockService } from "../services/stock.service";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

	stocks: StockData[];

	constructor(private stockService: StockService) { }


	loadStockData(data) {
		console.log(data);
		this.stocks = data;
	}

	ngOnInit() {
		this.stockService.stock('GE,MSFT,AAPL')
			.pipe(map(data => Object.keys(data).map(k => data[k])))
  			.subscribe(data => this.loadStockData(data));

//		this.stockService.stock('GE,MSFT,AAPL').subscribe(resp => {   		
//		Object.keys(resp).forEach(key => console.log(resp[key])
//		});
	}

}
