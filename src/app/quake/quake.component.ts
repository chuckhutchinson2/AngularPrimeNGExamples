import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

import * as moment from 'moment';

import {GMapModule} from 'primeng/primeng';   
declare var google: any; //new added line 

import { FeatureCollection, FeatureMetaData, EarthQuakeFeature, EarthQuakeProperties, EarthQuakeGeometry } from "../earthquakedata.model";
import { USGSEarthquakeService } from "../services/usgsearthquake.service";

interface Magnitude {
  name: string;
  code: string;
}

interface Period {
  name: string;
  code: string;
}

@Component({
  selector: 'app-quake',
  templateUrl: './quake.component.html',
  styleUrls: ['./quake.component.css']
})
export class QuakeComponent implements OnInit {

	featureCollection: FeatureCollection;
	magnitudeData: number[];
	magnitudes: string[];

	quakeLinedata: any;
	options: any;

	map: any;
	mapoptions: any;
	quakeOverlays: any[];
	position: any;

	magnitude: SelectItem[];
	selectedMagnitude: Magnitude;

	period: SelectItem[];
	selectedPeriod: Period;

	constructor(private geoService: USGSEarthquakeService) { 
		this.map = null;
		this.quakeOverlays = [];

	    this.magnitudeData = [];

	    this.magnitude = [
	            {label:'Significant', value:{id:1, name: 'Significant', code: 'significant'}},
	            {label:'4.5', value:{id:2, name: '4.5', code: '4.5'}},
	            {label:'2.5', value:{id:3, name: '2.5', code: '2.5'}},
	            {label:'1.0', value:{id:4, name: '1.0', code: '1.0'}},
	            {label:'All', value:{id:5, name: 'all', code: 'all'}}
	        ];

	    this.period = [
	            {label:'Hour', value:{id:1, name: 'Hour', code: 'hour'}},
	            {label:'Day', value:{id:2, name: 'Day', code: 'day'}},
	            {label:'Week', value:{id:3, name: 'Week', code: 'week'}},
	            {label:'Month', value:{id:4, name: 'Month', code: 'month'}}
	        ];

	      this.magnitudes = ['0', '1','2','3','4','5','6','7','8','8', '10'];
	      this.magnitudeData = [0,0,0,0,0,0,0,0,0,0];

	      this.quakeLinedata = {
	            labels: this.magnitudes,
	            datasets: [
	                {
	                    label: 'Magnitude',
	                    data: this.magnitudeData,
	                    fill: false,
	                    backgroundColor: '#9CCC65',
	                    borderColor: '#4bc0c0'
	                }
	          ]
	      };   

		this.options = {
            title: {
                display: true,
                text: 'Eartquakes',
                fontSize: 16
            },
            legend: {
                position: 'top'
            }
        };    

		var lat = 39.4624;
		var lng = -77.2758;
		this.position = {lat: lat, lng: lng};

		this.mapoptions = {
	        center: this.position,
	        zoom: 5
      	};	        
	}

	ngOnInit() {
	}

	setMap(event) {
		this.quakeOverlays = [];
		this.map = event.map;

		this.map.setCenter(this.position);
	}

   createMarker(feature) {
      console.log(feature);
      var position = { lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0] };

      var alertText = feature.properties.alert != undefined ? feature.properties.alert : "";

      var when = moment(feature.properties.time);
      var whenText = when.format('llll')

      var contentString = '<div><table><tr><td>Location</td><td>' + 
      feature.properties.place +  
      '</td></tr><tr><td>When</td><td>' + 
      whenText + 
      '</td></tr><tr><td>Alert</td><td>' + 
      alertText + 
      '</td></tr><tr><td>Mag</td><td>' + 
      feature.properties.mag + 
      '</td></tr><tr><td>Type</td><td>' + 
      feature.properties.type + 
      '</td></tr><tr><td>URL</td><td><a href=' + 
      feature.properties.url + ' target=\"_blank\"> Details</a>' +
      '</td></tr></table></div>';

        var quakeFillColor = feature.properties.alert != undefined ? feature.properties.alert : '#f00';

        var mag = Math.exp(parseFloat(feature.properties.mag)) * 0.1;
        var featureIcon = {
              path: google.maps.SymbolPath.CIRCLE,
              scale: mag,
              fillColor: quakeFillColor,
              fillOpacity: 0.35,
              strokeWeight: 0
            };

      var marker = new google.maps.Marker({
        position: position, 
        title: feature.properties.place, 
        map: this.map,
        icon: featureIcon
        });

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

    loadData(featureCollection) {
      // console.log(featureCollection);
      this.featureCollection = featureCollection;

      for (let feature of this.featureCollection.features) {

      	var marker = this.createMarker(feature);

		this.quakeOverlays.push(marker);

		this.position = marker.position;
      }

      this.map.setCenter(this.position);

      // need to group the data into buckets from 1 to 10 and then count everything
      var rawData = featureCollection.features.map(f => f.properties.mag);

      var dataToGraph = [0,0,0,0,0,0,0,0,0,0,0,0];

      for (let m of rawData) {
        dataToGraph[Math.floor(m)]++;
      }

      this.resetQuakeChart(dataToGraph)
    }

    resetQuakeChart(dataToGraph) {
		this.magnitudeData = dataToGraph;
		this.quakeLinedata = {
	        labels: this.magnitudes,
	        datasets: [
	            {
	                label: 'Magnitude',
	                data: this.magnitudeData,
	                fill: false,
	                borderColor: '#4bc0c0'
	            }
	          ]
	      };       

	      console.log(this.magnitudeData);
    }

    loadEarthQuakes(map) {
      console.log(this.selectedMagnitude.code, this.selectedPeriod.code);

      this.geoService.load(this.selectedMagnitude.code, this.selectedPeriod.code).subscribe( data => this.loadData(data))
    }

    clear(map) {
        this.quakeOverlays = [];
        this.magnitudeData = [0,0,0,0,0,0,0,0,0,0];
        this.resetQuakeChart(this.magnitudeData)
    }

	onDataSelect(event) {
		console.log('onDataSelect event is -> ', event);
	}
}
