import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BusinessesComponent } from './components/businesses/businesses';
import { NavbarComponent } from './navbar/navbar.component';
import { BusinessData } from './services/business-data';

@Component({ 
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent],
  providers: [BusinessData],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   protected title = 'bizFE';

   constructor(private dataService: BusinessData) { }
   
   ngOnInit() {
     this.dataService.populateReviews();
   }

 } 
