import { Component, OnInit, Input} from '@angular/core';
import {SelectItem} from 'primeng/api';

import { Observable } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { StockMarketData } from '../stockmarketdata.model';
import { StockService } from "../services/stock.service";

@Component({
  selector: 'app-stock-market',
  templateUrl: './stock-market.component.html',
  styleUrls: ['./stock-market.component.css']
})
export class StockMarketComponent implements OnInit {

	stocks: StockMarketData[];
	selectedStocks: StockMarketData[];
	cols: any[];

	constructor(private stockService: StockService) { 
		this.cols = [
            { field: 'symbol', header: 'Symbol' },
            { field: 'volume', header: 'Volume', style: 'right'  },
            { field: 'unadjustedVolume', header: 'Unadjusted Volume', style: 'right'  },
            { field: 'open', header: 'Open', style: 'right' },
            { field: 'close', header: 'Close', style: 'right'  },
            { field: 'high', header: 'High', style: 'right'  },
            { field: 'low', header: 'Low', style: 'right'  },
            { field: 'change', header: 'Change', style: 'right'  },
            { field: 'changePercent', header: 'Change Percent', style: 'right'  },
        ];
    }

	loadStockData(data) {
		console.log(data);
		this.stocks = data;
	}

	ngOnInit() {
		this.stockService.market()
  			.subscribe(data => this.loadStockData(data));
	}
}
