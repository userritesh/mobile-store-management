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
  private productSubcategory = 'http://localhost:8000/api/productSubcategory/';
  private selectedProduct = new BehaviorSubject<any>(null);


  convertToFormData(data: any): FormData {
  const formData = new FormData();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      
      // If the value is a File or Blob, append directly
      if (data[key] instanceof File || data[key] instanceof Blob) {
        formData.append(key, data[key]);
      }

      // If value is null or empty object → skip or set empty
      else if (typeof data[key] === "object" && Object.keys(data[key]).length === 0) {
        formData.append(key, "");
      }

      // Normal values (string / number)
      else {
        formData.append(key, data[key]);
      }
    }
  }

  return formData;
}


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
getAllProductsById(id:any):Observable<any>{
    return this.http.get<any>(this.apiproducts,id)
  }
  // allstockcategory(data:any):Observable<any>{
  //   return this.http.post(this.apistockcategory,data)
  // }

  allstockcategory(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('icon_img', data.ico_img);
    formData.append('stockcategory', data.stockcategory);
    return this.http.post(this.apistockcategory, formData);
  }

  getstockcategory(): Observable<any> {
    return this.http.get(this.apistockcategory)
  }

  insertUpdateProductSubcategory(data: any): Observable<any> {
    const newdata = this.convertToFormData(data);
    return this.http.post(this.productSubcategory, newdata);
  }

getProductSubcategory(): Observable<any> {
  return this.http.get(this.productSubcategory); 
}
getcategoryDropdown(): Observable<any> {
  return this.http.get(this.productSubcategory);
}
}

