import { Component, OnInit } from '@angular/core';

import {GMapModule} from 'primeng/primeng';   
declare var google: any; //new added line 

import { CountryService } from '../services/country.service';
import { CountryData } from "../countrydata.model";

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

	countries: CountryData[];
	mapOptions: any;
	map: any;
	overlays: any[];

	constructor(private countryService: CountryService) { }

	ngOnInit() {
		this.map = null;
		this.countries = [];
		this.overlays = [];

		var lat = 40.806862;
		var lng = -96.681679;
		var position = {lat: lat, lng: lng};

		this.mapOptions = {
			center: position,
			zoom: 4
		};
	}

}
