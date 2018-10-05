import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import {GMapModule} from 'primeng/primeng';   
declare var google: any; //new added line 

import { GetIPAddressService } from "./services/get-ipaddress.service";
import { IpAddressData } from "./ipaddressdata.model";

import { USStateService}  from "./services/usstate.service";
import { USStateData, Coordinate } from './usstatedata.model';

import { FeatureCollection, FeatureMetaData, EarthQuakeFeature, EarthQuakeProperties, EarthQuakeGeometry } from "./earthquakedata.model";

// https://momentjs.com/docs/
// https://www.chartjs.org/docs/latest/charts/bar.html
// https://www.primefaces.org/primeng/#/

// http://diva-gis.org/gdata
// https://gadm.org/download_country_v3.html
//

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularPrimeNGExamples';
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

  constructor(private getIPAddressService: GetIPAddressService, private stateService: USStateService) {
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
      this.overlays = [];

      this.process(this.ipinfo);

      for (let state of this.states) {
          this.overlays.push(this.createPolygon(state));
      }
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
