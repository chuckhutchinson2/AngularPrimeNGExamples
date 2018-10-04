import { Component } from '@angular/core';
import * as moment from 'moment';


// https://momentjs.com/docs/
// https://www.chartjs.org/docs/latest/charts/bar.html

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
  polardata: any;

  constructor() {
    var months = [];

    for (var i = 0; i < 12; i++) {
      months.push(moment().month(i).format('MMMM'));
    }

    this.data = {
        labels: ['A','B','C'],
        datasets: [
            {
                data: [300, 50, 100],
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

      this.linedata = {
            labels: months,
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#4bc0c0'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#565656'
                }
            ]
        };

      this.bardata = {
            labels: months,
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: [28, 48, 40, 19, 86, 27, 90]
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

      this.polardata = {
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

    onDataSelect(event) {

        console.log('onDataSelect event is -> ', event);
        // console.log(event.dataset);

      }
}
