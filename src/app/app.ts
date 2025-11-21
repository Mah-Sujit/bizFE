import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BusinessesComponent } from './components/businesses/businesses';
import { NavbarComponent } from './navbar/navbar.component';


@Component({ 
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   protected title = 'bizFE';

 } 
