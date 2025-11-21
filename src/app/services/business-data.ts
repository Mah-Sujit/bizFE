import { Injectable } from '@angular/core';
import  jsonData  from '../../assets/business.json'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusinessData {

  pageSize: number=10;

  constructor( private http: HttpClient) { }

  getBusinesses(page: number){
    let pageStart = (page - 1) * this.pageSize; //let - partially global and local, var - for local variables.
    let pageEnd = pageStart + this.pageSize;
    return jsonData.slice(pageStart, pageEnd);
  }

  getLastPageNumber(){
    return Math.ceil(jsonData.length / this.pageSize);
  }

  getBusiness(id:any){
    let dataToReturn:any[] =[];
    jsonData.forEach(function(business) {  
      if (business._id.$oid == id) {
          dataToReturn.push(business);
}
    })
return dataToReturn;

}
// ------------------ FE14: Lorem Ipsum API ------------------
  getLoremIpsum(paragraphs: number): Observable<any> {
    const API_KEY = 'DtUmNNozJWdZQaT2ernjMw==T0rWimQybxCZTdWV';
    return this.http.get<any>(
      `https://api.api-ninjas.com/v1/loremipsum?paragraphs=${paragraphs}`,
      {
        headers: { 'X-Api-Key': API_KEY }
      }
    );
  }

  // ------------------ FE14: Weather API ------------------
getCurrentWeather(lat: number, lon: number): Observable<any> {
  const API_KEY = '3d2e11a64980bf4bdb6eec72fba8aada';

  return this.http.get<any>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
}

  // ------------------ FE14: Temperature Colour Helper ------------------
  getTemperatureColour(temp: number) {
    if (temp <= 5) return "#0000ff";     // Blue
    else if (temp <= 12) return "#00ff00"; // Green
    else if (temp <= 17) return "#ffff00"; // Yellow
    else if (temp <= 25) return "#ff7f00"; // Orange
    else return "#ff0000";                 // Red
  }
}
