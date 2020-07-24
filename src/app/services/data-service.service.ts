import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { GlobalDataSummary } from "src/app/models/global-data"

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private globalDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-17-2020.csv`;

  constructor(private http: HttpClient) { }

  getGlobalData() {
    // { responseType: 'text' } added this, because response is coming from csv file
    // need to convert into text before sending to client
    return this.http.get(this.globalDataUrl, { responseType: 'text' }).pipe(
      map(result => {
        let data: GlobalDataSummary[] = [];
        let raw = {};
        let rows = result.split('\n');
        rows.splice(0, 1); // removing to 0th index coz it is a column heading
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);
          let cs = {
            country: cols[3],
            confirmed: +cols[7], // + converts string value to int
            deaths: +cols[8], // + converts string value to int
            recovered: +cols[9], // + converts string value to int
            active: +cols[10], // + converts string value to int
          };
          let temp: GlobalDataSummary = raw[cs.country];
          if (temp) {
            temp.active = cs.active + temp.active;
            temp.confirmed = cs.confirmed + temp.confirmed;
            temp.deaths = cs.deaths + temp.deaths;
            temp.recovered = cs.recovered + temp.recovered;

            raw[cs.country] = temp;
          } else {
            raw[cs.country] = cs;
          }
        })
        return <GlobalDataSummary[]>Object.values(raw);
      })
    )
  }
}