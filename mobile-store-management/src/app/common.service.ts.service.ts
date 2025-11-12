import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceTsService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8000/api/dashboard/'; // /sales tab Api
  private apiproducts = 'http://localhost:8000/api/products/';//use Api for purchase products  and stock products
  private apistockcategory = 'http://localhost:8000/api/stockcategory/';// stockcategory tab Api (main service category)
  private productSubcategor = 'http://localhost:8000/api/productSubcategor/';// productSubcategor tab Api 
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
    return this.http.get<any>(this.apiproducts)
  }

  allstockcategory(data:any):Observable<any>{
    return this.http.post(this.apistockcategory,data)
  }

   getstockcategory():Observable<any>{
    return this.http.get(this.apistockcategory)
  }
  insertUpdateproductSubcategor(data:any):Observable<any>{
    return this.http.post(this.productSubcategor,data)
  }
   getproductSubcategor():Observable<any>{
    return this.http.get(this.productSubcategor)
  }
}

