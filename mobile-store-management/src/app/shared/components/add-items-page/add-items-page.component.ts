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
files: { file: File; url: string }[] = [];
  selectedImageFile: File | null = null;
  imagePreviewUrl: string | null = null;
  formData: any = {};
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

  /**
   * Called when the user presses Save in the modal.
   * Builds the payload object dynamically and closes the modal.
   * If required fields are missing, it shows a warning instead.
   */
  addCard() {
    if (!this.canSave()) {
      this.toster.warning('Please complete all required fields before saving.');
      return;
    }

    const obj: any = {};
    let labelName!: string;

    // Determine the correct property name for the field based on modal context.
    // For product entries, use productcategory. For normal stock categories, use stockcategory.
    if (this.modalTitle === 'Add saling Catogary') {
      labelName = 'salingcategory';
    } else {
      labelName = this.data === 'Product' ? 'productcategory' : 'stockcategory';
    }

    if (this.modalTitle === 'Add Product category') {
      // Special fields for the product category modal
      obj['stockcategory'] = this.selectedCategory;
      obj['description'] = this.description;
    }

    obj[labelName] = this.label;

    const requiresImage = this.data === 'Product';
    if (requiresImage && this.selectedImageFile) {
      // Attach image only when this modal is used for product creation
      obj['ico_img'] = this.selectedImageFile;
    } else if (requiresImage) {
      this.toster.warning('Product image is required.');
      return;
    }

    // Close the modal and send the assembled object to the caller.
    this.activeModal.close(obj);
  }

  /**
   * Validate whether the current modal form is ready to save.
   * This method is used by the Save button and the submit logic.
   */
  canSave(): boolean {
    const hasLabel = !!this.label && this.label.trim().length > 0;
    const requiresCategory = this.modalTitle === 'Add Product category';
    const hasCategory = requiresCategory ? !!this.selectedCategory : true;
    const requiresImage = this.data === 'Product';
    const hasImage = requiresImage ? !!this.selectedImageFile : true;

    // Valid only when all required pieces are available.
    return hasLabel && hasCategory && hasImage;
  }

  /**
   * Handle file selection from the ngx-dropzone control.
   * Only one file is supported and the preview URL is generated for the UI.
   */
  onSelect(event:any) {
    if (!event || !event.addedFiles || event.addedFiles.length === 0) {
      return;
    }

    const file = event.addedFiles[0] as File;
    this.files = [{
      file,
      url: URL.createObjectURL(file)
    }];
    this.selectedImageFile = file;
    this.imagePreviewUrl = URL.createObjectURL(file);
  }

  /**
   * Remove the selected image from the modal form.
   * Resets preview and file state so the user can choose another image.
   */
  removeImage(): void {
    this.files = [];
    this.selectedImageFile = null;
    this.imagePreviewUrl = null;
  }



}
