import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public totalConfirmed = 0;
  public totalActive = 0;
  public totalDeaths = 0;
  public totalRecovered = 0;
  private loading = true;
  private globalData: GlobalDataSummary[];
  public datatable = [];
  public pieChart: GoogleChartInterface = {
    chartType: "PieChart"
  }
  public columnChart: GoogleChartInterface = {
    chartType: "ColumnChart"
  }

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(
      {
        next: (result) => {
          console.log(result);
          this.globalData = result;
          result.forEach(cs => {
            if (!Number.isNaN(cs.confirmed)) {
              this.totalActive += cs.active;
              this.totalConfirmed += cs.confirmed;
              this.totalDeaths += cs.deaths;
              this.totalRecovered += cs.active;
            }
          })

          this.initChart('c');
        }
      }
    )
  }

  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value)
  }

  initChart(caseType: string) {

    this.datatable = [];
    this.datatable.push(["Country", "Cases"]);
    this.globalData.forEach(cs => {
      this.datatable.push([
        cs.country, cs.confirmed
      ]);
    })

    this.pieChart = {
      chartType: 'PieChart',
      dataTable: this.datatable,
      options: {
        'height': 500
      }
    };

    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: this.datatable,
      options: {
        'height': 500
      }
    };
  }
}
