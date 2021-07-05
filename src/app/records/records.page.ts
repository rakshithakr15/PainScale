import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Item, StorageService } from '../services/storage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-records',
  templateUrl: './records.page.html',
  styleUrls: ['./records.page.scss'],
})
export class RecordsPage implements OnInit {
  private barChart: Chart;
  private lineChart: Chart;
  items: Item[] =[];
  dateArray = [];
  scoreArray = [];
  
  @ViewChild("barCanvas", {static: true}) barCanvas: ElementRef;
  @ViewChild("lineCanvas", {static: true}) lineCanvas: ElementRef;
  
  constructor(private storageService: StorageService, private datePipe : DatePipe) { }

  ionViewWillEnter() {
    this.storageService.getItems().then(items =>{
      this.items = items;
      this.createAxes(this.items);
      this.createYAxis(this.items);
      this.createLineGraph(this.items);
      this.createBarGraph(this.items);
    });  
  }

  ionViewDidLeave() {
    this.lineChart.destroy();
    this.barChart.destroy();
  }

  ngOnInit() {
  }

  createAxes(items) {
    this.dateArray = [];

    items.filter(item=>{
      this.dateArray.push(item.startDate);
    })
    this.dateArray = this.dateArray.map(item =>{
     return this.datePipe.transform(item, 'yyyy-MM-dd')
    })
    this.dateArray = this.dateArray.sort((a,b) =>{
      return +new Date(b.date) - +new Date(a.date);
    })
    this.dateArray = this.dateArray.map(item =>{
      return this.datePipe.transform(item, 'dd-MMM')
     })
  }

  createYAxis(items) {
    this.scoreArray = [];
    items.filter(item => {
      this.scoreArray.push(item.scale);
    })
  }

  createLineGraph(graphData) {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: this.dateArray,
        datasets: [
          {
            label: "Pain Trend",
            fill: false,
            // lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            // borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.scoreArray,
            spanGaps: false
          }
        ]
      }
    });
  }

  createBarGraph(barData) {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: this.dateArray,
        datasets: [
          {
            label: "Pain Score",
            data: this.scoreArray,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          // yAxes: [
          //   {
          //     ticks: {
          //       beginAtZero: true
          //     }
          //   }
          // ]
        }
      }
    });
  }
}
