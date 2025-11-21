import { Routes } from '@angular/router';
import { Home } from './home/home';
import { BusinessesComponent } from './components/businesses/businesses';
import { Business } from './components/business/business';
 
export const routes: Routes = [

  {
     path: '', 
    component: Home 

  },

  {
     path: 'businesses', 
    component: BusinessesComponent 
  },

  { 
    path: 'businesses/:id',
     component:Business 
  }
];
