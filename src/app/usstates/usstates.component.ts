import { Component, OnInit } from '@angular/core';

import {GMapModule} from 'primeng/primeng';   
declare var google: any; //new added line 

import { USStateService}  from "../services/usstate.service";
import { USStateData, Coordinate } from '../usstatedata.model';
import { USStateCountyData, StateCountyPoint } from '../usstatecountydata.model';

@Component({
  selector: 'app-usstates',
  templateUrl: './usstates.component.html',
  styleUrls: ['./usstates.component.css']
})
export class USStatesComponent implements OnInit {

	states: USStateData[];
	stateMapOptions: any;
	stateMap: any;
	stateOverlays: any[];

	constructor(private stateService: USStateService) { }

	ngOnInit() {
		this.stateMap = null;
		this.stateOverlays = [];
		this.states = [];

		var lat = 40.806862;
		var lng = -96.681679;
		var position = {lat: lat, lng: lng};

		this.stateMapOptions = {
			center: {lat: lat, lng: lng},
			zoom: 4
		};

		// console.log('oninit done');
	}

    setMap(event) {
        this.stateMap = event.map;
        // console.log('setting map');

        this.stateService.load().subscribe(stateData => this.load(stateData)); 
    }

    loadState(stateData) {
      console.log(stateData);

      for (var i = 0; i < stateData.length; i++) {
        this.stateOverlays.push(this.createCountyData(stateData[i]));
      }
    }

    createCountyData(countyData) {
      var polygon = new google.maps.Polygon({
            paths: countyData.geometry, 
            strokeOpacity: 0.5, 
            strokeWeight: 1,
            // fillColor: usStateData.color, 
            fillOpacity: 0.35,
            map: this.stateMap
          });

      return polygon;
    }

  showCounties(map) {
      for (let state of this.states) {
          this.stateService.loadState(state.code).subscribe(stateData => this.loadState(stateData)); 
      }  
  }

  load(stateData) {
    	// console.log('loading states', stateData);

    	this.stateOverlays = [];
      this.states = stateData;

      this.loadStates(this.stateMap);
	 }

    loadStates(map) {
      for (let state of this.states) {
          this.stateOverlays.push(this.createPolygon(state));
      }
    }

    createPolygon(usStateData) {

      // console.log("state 1: ", usStateData);
      var polygon = new google.maps.Polygon({
            paths: usStateData.coordinates, 
            strokeOpacity: 0.5, 
            strokeWeight: 1,
            fillColor: usStateData.color, 
            fillOpacity: 0.35,
            map: this.stateMap
          });

    polygon.addListener('click', function() {
        console.log('location opened', usStateData);
    });

      return polygon;
    }
}
