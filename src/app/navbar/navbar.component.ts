import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthbuttonComponent } from '../authbutton/authbutton';
import { Authuser } from '../authuser/authuser';  

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, AuthbuttonComponent,Authuser],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent { }
