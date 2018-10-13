import { Component, OnInit, Input} from '@angular/core';
import {SelectItem} from 'primeng/api';

import { Observable } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { StockData } from '../stockdata.model';
import { StockService } from "../services/stock.service";

interface Range {
  name: string;
  code: string;
}

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

	ranges: Range[];
	selectedRange: Range;

	@Input() watchList: String;
	stocks: StockData[];

	selectedStock: StockData;

	stockLineData: any;
	lineChartOptions: any;

	constructor(private stockService: StockService) { 

		this.ranges = [
			{name: '1m', code: '1m'},
			{name: '3m', code: '3m'},
			{name: '6m', code: '6m'},
			{name: '1y', code: '1y'},
			{name: '2y', code: '2y'},
			{name: '5y', code: '5y'},
			{name: 'ytd', code: 'ytd'},
        ];
		
        this.selectedRange = this.ranges[0];
		this.lineChartOptions = {
            title: {
                display: true,
                text: 'History',
                fontSize: 16
            },
            tooltips: {
            callbacks: {
                        label: function(tooltipItem) {
                            return Number(tooltipItem.yLabel) + " ";
                        }
                    }
            },
            hover: {
              mode: 'index'
            },
            legend: {
                position: 'top'
            },
            scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left',
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
        };  


        this.setStockLineData([]);
	}

	setStockLineData(data) {

		this.stockLineData = {
	            labels:data.map(c => c.date),
	            datasets: [
	                {
	                    label: 'Open',
	                    data: data.map(c => c.open),
	                    fill: false,
	                    backgroundColor: 'red',
	                    borderColor: '#4bc0c0'
	                },
	                {
	                    label: 'Close',
	                    data: data.map(c => c.close),
	                    fill: false,
	                    backgroundColor: 'blue',
	                    borderColor: '#4bc0c0'
	                },
	                {
	                    label: 'High',
	                    data: data.map(c => c.high),
	                    fill: false,
	                    backgroundColor: 'green',
	                    borderColor: '#4bc0c0'
	                },
	                {
	                    label: 'Low',
	                    data: data.map(c => c.low),
	                    fill: false,
	                    backgroundColor: 'yellow',
	                    borderColor: '#4bc0c0'
	                }

	          ]
	      };                 

	}

    onRowSelect(event) {
    //	console.log('selected row', event);

    	this.selectedStock = event.data;
    	this.setStockLineData(this.selectedStock.chart);
    }

	loadStockData(data) {
	//	console.log(data);
		this.stocks = data;
	}

	handleClick() {
		this.setStockLineData([]);
		this.stocks = [];
		
        this.stockService.stock(this.watchList, this.selectedRange.code)
  			.subscribe(data => this.loadStockData(data));
    }

	ngOnInit() {
		this.stockService.stock(this.watchList, this.selectedRange.code)
  			.subscribe(data => this.loadStockData(data));
	}

}
