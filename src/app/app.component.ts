import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

import * as moment from 'moment';

import {GMapModule} from 'primeng/primeng';   
declare var google: any; //new added line 

import { GetIPAddressService } from "./services/get-ipaddress.service";
import { IpAddressData } from "./ipaddressdata.model";

import { USStateService}  from "./services/usstate.service";
import { USStateData, Coordinate } from './usstatedata.model';

import { FeatureCollection, FeatureMetaData, EarthQuakeFeature, EarthQuakeProperties, EarthQuakeGeometry } from "./earthquakedata.model";
import { USGSEarthquakeService } from "./services/usgsearthquake.service";

interface Magnitude {
  name: string;
  code: string;
}

interface Period {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularPrimeNGExamples';

  magnitude: SelectItem[];
  selectedMagnitude: Magnitude;

  period: SelectItem[];
  selectedPeriod: Period;

  visibleSidebar1;
  visibleSidebar2;
  visibleSidebar3;
  visibleSidebar4;
  visibleSidebar5;

  value: Date;
  data: any;
  linedata: any;
  bardata: any;
  piedata: any;
  options: any;
  mapoptions: any;
  images: any[];
  ipinfo: IpAddressData;
  map: any;
  overlays: any[];
  infoWindow: any;
  states: USStateData[];
  featureCollection: FeatureCollection;

  constructor(private getIPAddressService: GetIPAddressService, 
              private stateService: USStateService,
              private geoService: USGSEarthquakeService) {

    this.magnitude = [
            {label:'Select Magnitude', value:null},
            {label:'Significant', value:{id:1, name: 'Significant', code: 'significant'}},
            {label:'4.5', value:{id:2, name: '4.5', code: '4.5'}},
            {label:'2.5', value:{id:3, name: '2.5', code: '2.5'}},
            {label:'1.0', value:{id:4, name: '1.0', code: '1.0'}},
            {label:'All', value:{id:5, name: 'all', code: 'all'}}
        ];

    this.period = [
            {label:'Select Period', value:null},
            {label:'Hour', value:{id:1, name: 'Hour', code: 'Hour'}},
            {label:'Day', value:{id:2, name: 'Day', code: 'day'}},
            {label:'Week', value:{id:3, name: 'Week', code: 'week'}},
            {label:'Month', value:{id:4, name: 'Month', code: 'month'}}
        ];

    var months = [];
    var daysInMonth = [];
    var randomData = [];

    var colors = ['red','blue','green','yellow','purple','lightblue','teal','lime','yellowgreen', 'orange', 'sienna','firebrick'];

    for (var i = 0; i < 12; i++) {
      var month = moment().month(i);
      var days = month.daysInMonth();
      months.push(month.format('MMMM'));
      daysInMonth.push(days);
      randomData.push(Math.floor((Math.random() * days) + 1));
    }

    this.data = {
        labels: months,
        datasets: [
            {
                data: daysInMonth,
                backgroundColor: colors,
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]    
        };

      this.linedata = {
            labels: months,
            datasets: [
                {
                    label: 'Days in Month',
                    data: daysInMonth,
                    fill: false,
                    borderColor: '#4bc0c0'
                },
                {
                    label: 'Random Dataset',
                    data: randomData,
                    fill: false,
                    borderColor: '#565656'
                }
            ]
        };

      this.bardata = {
            labels: months,
            datasets: [
                {
                    label: 'Days in Month',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: daysInMonth
                },
                {
                    label: 'Random dataset',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: randomData
                }
            ]
        };

      this.piedata = {
            labels: ['Stocks','Bonds','Cash'],
            datasets: [
                {
                    label: 'My First dataset',
                    data: [500, 50, 100],
                    customdata:  [
                      {
                        label: 'Some Label',
                        value: 1
                      },
                      {
                        label: 'Some Label 2',
                        value: 2
                      },
                      {
                        label: 'Some Label 3',
                        value: 3
                      }
                    ],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]    
            };

      this.options = {
            title: {
                display: true,
                text: 'Chart Title',
                fontSize: 16
            },
            legend: {
                position: 'bottom'
            }
        };
     }

    process(ipInfo) {
      this.ipinfo = ipInfo; 
      console.log(this.ipinfo);
      var lat = 36.890257;
      var lng = 30.707417
      if (this.ipinfo != null) {
          var latLng = this.ipinfo.loc.split(',');

          if (latLng) {
            lat = parseFloat(latLng[0]);
            lng = parseFloat(latLng[1]);
          }
      }

      var position = {lat: lat, lng: lng};

      this.mapoptions = {
        center: {lat: lat, lng: lng},
        zoom: 12
      };

      this.map.setCenter(position);

      var overlayTitle = ipInfo.city +', '+ ipInfo.region;

      var content = '<div><table><tr><td>Location</td><td>' + 
      ipInfo.city + ', ' + 
      ipInfo.region + ', ' + 
      ipInfo.country + 
      '</td></tr><tr><td>Zip</td><td>' + 
      ipInfo.postal + 
      '</td></tr><tr><td>Host</td><td>' + 
      ipInfo.hostname + 
      '</td></tr><tr><td>IP Address</td><td>' + 
      ipInfo.ip + 
      '</td></tr><tr><td>Org</td><td>' + 
      ipInfo.org + 
      '</td></tr></table>';

      this.overlays.push(new google.maps.Marker({
        position: position, 
        title: overlayTitle, 
        map: this.map,
        userData: content
        }));


    }

    handleMapClick(event) {
    }

    createPolygon(usStateData) {

      console.log("state: ", usStateData);
      return  new google.maps.Polygon({
            paths: usStateData.coordinates, 
            strokeOpacity: 0.5, 
            strokeWeight: 1,
            fillColor: usStateData.color, 
            fillOpacity: 0.35
          });
    }

    handleOverlayClick(event) {
        let isMarker = event.overlay.getTitle != undefined;

        if(isMarker) {
            let title = event.overlay.userData;

            var contentString = '<div>' + title + '</div>';

            this.infoWindow.setContent('' + contentString + '');

            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());
        }
    }

    setMap(event) {
        this.map = event.map;
        this.infoWindow = new google.maps.InfoWindow();
        this.getIPAddressService.find().subscribe(ipInfo => this.process(ipInfo));
        this.stateService.load().subscribe(stateData => this.load(stateData)); 
    }

    load(stateData) {
      this.states = stateData;
      // console.log(this.states);
    }

    loadStates(map) {
      this.process(this.ipinfo);

      for (let state of this.states) {
          this.overlays.push(this.createPolygon(state));
      }
    }

    createMarker(feature) {
      console.log(feature);
      var position = { lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0] };

      var content = '<div><table><tr><td>Location</td><td>' + 
      feature.properties.place 
      '</td></tr><tr><td>Alert</td><td>' + 
      feature.properties.alert + 
      '</td></tr><tr><td>Type</td><td>' + 
      feature.properties.type + 
      '</td></tr></table>';

      var marker = new google.maps.Marker({
        position: position, 
        title: feature.properties.place, 
        map: this.map,
        userData: content
        });

      return  marker;
    }

    loadData(featureCollection) {
      // console.log(featureCollection);
      this.featureCollection = featureCollection;

      for (let feature of this.featureCollection.features) {
          this.overlays.push(this.createMarker(feature));
      }
    }

    loadEarthQuakes(map) {
      console.log(this.selectedMagnitude.code, this.selectedPeriod.code);
      
      this.geoService.load(this.selectedMagnitude.code, this.selectedPeriod.code).subscribe( data => this.loadData(data))
    }



    clear(map) {
        this.overlays = [];
        this.process(this.ipinfo);
    }

    ngOnInit() {

      this.map = null;
      this.overlays = [];

      var lat = 36.890257;
      var lng = 30.707417

      this.mapoptions = {
        center: {lat: lat, lng: lng},
        zoom: 12
      };

      this.images = [];
      this.images.push({source:'assets/images/tree1.jpg', alt:'Description for Tree 1', title:'Tree 1'});
      this.images.push({source:'assets/images/tree2.jpg', alt:'Description for Tree 2', title:'Tree 2'});
      this.images.push({source:'assets/images/tree3.jpg', alt:'Description for Tree 3', title:'Tree 3'});
      this.images.push({source:'assets/images/tree4.jpg', alt:'Description for Tree 4', title:'Tree 4'});
    }

    onDataSelect(event) {

        console.log('onDataSelect event is -> ', event);
        // console.log(event.dataset);

      }
}
