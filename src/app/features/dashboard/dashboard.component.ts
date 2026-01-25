import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router:Router){}
  topage(path:any){
    switch(path){
          case 'sales' :
            this.router.navigate(['/sales']);
             break;
            case 'stock' :
            this.router.navigate(['/stock']);
             break;
               case 'reports' :
            this.router.navigate(['/stock/reports']);
             break;
               case 'purchase' :
            this.router.navigate(['/purchase']);
             break;

    }

  }

}
