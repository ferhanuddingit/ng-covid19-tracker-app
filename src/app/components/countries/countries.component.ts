import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  public totalConfirmed = 0;
  public totalActive = 0;
  public totalDeaths = 0;
  public totalRecovered = 0;
  private data: GlobalDataSummary[];
  public countries: string[] = [];
  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(result => {
      this.data = result;
      this.data.forEach(cs => {
        this.countries.push(cs.country);
      });
    });
  }

  updateValues(country: string) {
    console.log(country);
    this.data.forEach(cs => {
      if (cs.country == country) {
        this.totalActive = cs.active
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
        this.totalConfirmed = cs.confirmed
      }
    })
  }
}
