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

	createCountry(country) {

		if (country.latlng.length < 2) {
			return null;
		}

		var position = { lat: country.latlng[0], lng: country.latlng[1] };

		var marker = new google.maps.Marker({
			position: position, 
			title: country.name, 
			map: this.map,
		});

		var population = (country.population != null) ? country.population.toLocaleString() : "";
		var region = (country.region != null) ? country.region : "";
		var subregion = (country.subregion != null) ? country.subregion : "";
		var area = (country.area != null) ? country.area.toLocaleString() : "";

		var contentString = '<div><table><tr><td>Name</td><td>' + 
		      country.name +  
		      '</td></tr><tr><td>Population</td><td>' + 
		      population + 
		      '</td></tr><tr><td>Region</td><td>' + 
		      region +
		      '</td></tr><tr><td>Subregion</td><td>' + 
		      subregion +
		      '</td></tr><tr><td>Area</td><td>' + 
		      area  + 
		      '</td></tr></table></div>';

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});  

		marker.addListener('click', function() {
			console.log('location opened');
			this.map.setCenter(position);
			infowindow.open(this.map, marker);
		});

		return  marker;
	}

	load(data) {
		this.countries = data;
		// console.log(this.countries);

		var that = this;
		this.countries.forEach(function (country) {
		  	console.log(country);
		  	var countryMarker = that.createCountry(country);

		  	if (countryMarker != null) {
		  		that.overlays.push(countryMarker);
		  	}
		}); 
	}

    setMap(event) {
        this.map = event.map;
        // console.log('setting map');

        this.countryService.load().subscribe(data => this.load(data)); 
    }
}
