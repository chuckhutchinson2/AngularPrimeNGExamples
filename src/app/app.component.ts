import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


// https://momentjs.com/docs/
// https://www.chartjs.org/docs/latest/charts/bar.html
// https://www.primefaces.org/primeng/#/

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

  constructor() {
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

    ngOnInit() {
      this.mapoptions = {
            center: {lat: 36.890257, lng: 30.707417},
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
