import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { CommonServiceTsService } from 'src/app/common.service.ts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  searchSubject = new Subject<string>();
  constructor(private router:Router,private sellingService: CommonServiceTsService){}
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
  ngOnInit() {
  this.searchSubject.pipe(
    debounceTime(500) 
  ).subscribe(value => {
    this.searchAPI(value);
  });
}

  searchAPI(value: string) {
    this.sellingService.getAllProducts(value).subscribe({
      next: (res:any) => {
        console.log(res);
        
      }
    })
  }


onSearch(value:string){
this.searchSubject.next(value);
}
}
