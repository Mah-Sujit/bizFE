import { Component } from '@angular/core';
import { ActivatedRoute,} from '@angular/router';
import { BusinessData } from '../../services/business-data';
import { CommonModule } from '@angular/common';
import {GoogleMapsModule} from '@angular/google-maps';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-business',
  imports: [CommonModule,GoogleMapsModule,ReactiveFormsModule],
  providers: [BusinessData],
  templateUrl: './business.html',
  styleUrl: './business.css',
})
export class Business {
  business_list: any = [];;
  business_lat: any;
  business_lng: any; 
  map_options: google.maps.MapOptions = {}; 
  map_locations: any[] = [ ]
  loremIpsum: any;
  temperature: any;
  weather: any;
  weatherIcon: any;
  weatherIconURL: any;
  temperatureColour: any;
  reviewForm: any;

  constructor (private businessData: BusinessData, private route: ActivatedRoute, private formBuilder: FormBuilder) {} 

  isInvalid(control:any) { 
      return this.reviewForm.controls[control].invalid && 
      this.reviewForm.controls[control].touched; 
    }
    isUntouched() {
      return this.reviewForm.controls.username.pristine || 
             this.reviewForm.controls.comment.pristine;
            }

    isIncomplete() {
      return this.isInvalid('username') ||
             this.isInvalid('comment') || 
             this.isUntouched();
            }

  
  ngOnInit() {
    this.reviewForm = this.formBuilder.group( {
      username: ['',Validators.required],
      comment: ['',Validators.required],
      stars: 5
    });

     this.business_list = this.businessData.getBusiness(
       this.route.snapshot.paramMap.get('id'));
     console.log(this.business_list[0]['reviews'])  
    
    this.business_lat = this.business_list[0].location.coordinates[0]; 
    this.business_lng = this.business_list[0].location.coordinates[1];
    
    this.map_locations.push( {
       lat: this.business_lat,
       lng: this.business_lng
       });

    this.map_options = {
      mapId: "DEMO_MAP_ID",
      center: {lat: this.business_lat,
        lng: this.business_lng }, 
    zoom: 13,
   };

   this.businessData.getLoremIpsum(1)
   .subscribe( ( response: any) => {
    this.loremIpsum = response.text.slice(0,400);
    });
    
    this.businessData.getCurrentWeather(this.business_lat, this.business_lng)
    .subscribe( ( response: any) => {
      let weatherResponse = response ['weather'][0]['description'];

      this.temperature = Math.round(response ['main']['temp']);
      this.weather = weatherResponse[0].toUpperCase() + weatherResponse.slice(1);
      this.weatherIcon = response ['weather'][0]['icon'];
      this.weatherIconURL = 'http://openweathermap.org/img/wn/' +
      this.weatherIcon + '@4x.png';
      this.temperatureColour = this.businessData.getTemperatureColour(this.temperature);

  
    });
}
onSubmit() { this.businessData.postReview( 
  this.route.snapshot.paramMap.get('id'), 
  this.reviewForm.value); 
  this.reviewForm.reset(); }
}