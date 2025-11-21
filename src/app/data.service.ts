import { Injectable } from '@angular/core';
import json from '../assets/business.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusinessData {

  pageSize: number = 9;

  constructor(private http: HttpClient) {}

  // Return businesses for directory page
  getBusinesses(page: number) {
    const pageStart = (page - 1) * this.pageSize;
    const pageEnd = pageStart + this.pageSize;
    return json.slice(pageStart, pageEnd);
  }

  // Return total number of pages
  getLastPageNumber() {
    return Math.ceil(json.length / this.pageSize);
  }

  // Return the business whose _id matches the id
  getBusiness(id: any) {
    return json.filter((item: any) => item._id.$oid === id);
  }

  // ============ FE14: LOREM IPSUM API ============

  getLoremIpsum(paragraphs: number): Observable<any> {
    const API_KEY = 'YOUR_API_NINJAS_KEY';
    return this.http.get<any>(
      'https://api.api-ninjas.com/v1/loremipsum?paragraphs=' + paragraphs,
      { headers: { 'X-Api-Key': API_KEY } }
    );
  }

  // ============ FE14: WEATHER API ============

  getCurrentWeather(lat: number, lon: number) {
    const API_KEY = 'YOUR_OPENWEATHER_KEY';
    return this.http.get<any>(
      'https://api.openweathermap.org/data/2.5/weather?lat=' +
        lat +
        '&lon=' +
        lon +
        '&units=metric&appid=' +
        API_KEY
    );
  }

  // ============ FE14: Temperature Colour Helper ============

  getTemperatureColour(temp: number) {
    if (temp <= 5) return '#0000ff';
    else if (temp <= 12) return '#00ff00';
    else if (temp <= 17) return '#ffff00';
    else if (temp <= 25) return '#ff7f00';
    else return '#ff0000';
  }
}
