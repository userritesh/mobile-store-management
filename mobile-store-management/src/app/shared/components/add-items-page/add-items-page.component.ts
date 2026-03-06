import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceTsService } from 'src/app/common.service.ts.service';

@Component({
  selector: 'app-add-items-page',
  templateUrl: './add-items-page.component.html',
  styleUrls: ['./add-items-page.component.scss']
})
export class AddItemsPageComponent implements OnInit {
 iconurl!: string;
label!: string;
category!: string;
description!:string;
  cardData={}
  @Input() data:any;
  @Input() componentApi:any;
files: { file: File, url: string }[] = [];
  formData: any ={};
  modalTitle: any;
selectedCategoryId: any = null;
titel: any;
  listitems: any;

  // parent.component.ts
categoryList = [
  { id: 1, name: 'Mobile' },
  { id: 2, name: 'Accessories' },
  { id: 3, name: 'Charger' }
];

selectedCategory: number | null = null;


  constructor( private addCards: CommonServiceTsService, public activeModal: NgbActiveModal, private toster: ToastrService,private apiastockcategory:CommonServiceTsService) { }
 
ngOnInit(){
   this.apiastockcategory.getstockcategory().subscribe(list=>{
    console.log(list)
        this.listitems = list;
      })}
  
close() {
    this.activeModal.dismiss('close'); 
  }

  addCard() {
  let obj: any = {};
  let labelName!: string;

  // Determine labelName based on modalTitle
  if (this.modalTitle === "Add saling Catogary") {
    labelName = "salingcategory";
  } else  {
  labelName = this.data === "Product" ? "productcategory" : "stockcategory";   
  }
  
  if (this.modalTitle === "Add Product category"){
     obj['stockcategory'] = this.selectedCategory;
    obj['description'] = this.description;
  }

  // Add the label dynamically
  obj[labelName] = this.label;

  // Add image file if available
  if (this.files.length > 0) {
    obj['ico_img'] = this.files[0].file;
  }

  // Close modal and pass object
  this.activeModal.close(obj);
}

onSelect(event:any){
 
 const addedFileUrl = event.addedFiles.map((file:File)=>({
  file:file,
  url:URL.createObjectURL(file)
 }));
 this.files.push(...addedFileUrl)
 
}



}
