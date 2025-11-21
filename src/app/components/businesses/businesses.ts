import { Component,OnInit } from '@angular/core';
import { BusinessData } from '../../services/business-data';
import { ActivatedRoute} from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-businesses',
   standalone: true,
  imports: [RouterModule],
  providers: [BusinessData],
  templateUrl: './businesses.html',
  styleUrl: './businesses.css',
})
export class BusinessesComponent implements OnInit {

  business_list: any = [];
  page: number = 1;

  constructor(public businessData: BusinessData,
    private Route: ActivatedRoute) { }

  ngOnInit(){
    if (sessionStorage['page']) {
    this.page = Number(sessionStorage['page']);
  }
  this.business_list = this.businessData.getBusinesses(this.page );
}
  previousPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
      sessionStorage['page'] = this.page;
      this.business_list = this.businessData.getBusinesses(this.page);
    }
  }

  nextPage() {
    if (this.page < this.businessData.getLastPageNumber()) {
      this.page = this.page + 1;
      sessionStorage['page'] = this.page;
      this.business_list = this.businessData.getBusinesses(this.page);
    }
  }
}

