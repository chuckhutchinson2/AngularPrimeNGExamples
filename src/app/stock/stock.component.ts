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
	cols: any[];

	selectedStock: StockData;

	constructor(private stockService: StockService) { 
        this.cols = [
            { field: 'stock.quote.symbol', header: 'symbol' },
            { field: 'quote.companyName', header: 'companyName' },
            { field: 'quote.sector', header: 'sector' },
            { field: 'quote.open', header: 'Open' },
            { field: 'quote.close', header: 'Close' },
            { field: 'quote.high', header: 'High' },
            { field: 'quote.low', header: 'Low' },
        ];
	}

    onRowSelect(event) {
    	console.log('selected row', event);

    	this.selectedStock = event.data;
    }

	loadStockData(data) {
		console.log(data);
		this.stocks = data;
	}

	ngOnInit() {
		this.stockService.stock('GE,MSFT,AAPL')
  			.subscribe(data => this.loadStockData(data));
	}

}
