import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceTsService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8000/api/dashboard/';
  private apiproducts = 'http://localhost:8000/api/products/';
    private selectedProduct = new BehaviorSubject<any>(null);


   getSellingItems(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  
   addDashboardCard(cardData:any): Observable<any> {
    return this.http.post(this.apiUrl,cardData);
  }

  setdata(product:any){
    this.selectedProduct.next(product);
  }

  getdata():Observable<any>{
    return this.selectedProduct.asObservable()
  }

  insertUpdateProducts(data:any):Observable<any>{
    return this.http.post(this.apiproducts,data)
  }

  getAllProducts():Observable<any>{
    return this.http.get(this.apiproducts)
  }

}

