import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceTsService } from 'src/app/common.service.ts.service';

@Component({
  selector: 'app-add-items-page',
  templateUrl: './add-items-page.component.html',
  styleUrls: ['./add-items-page.component.scss']
})
export class AddItemsPageComponent {
 iconurl!: string;
label!: string;
  cardData={}
  @Input() data:any;
files: { file: File, url: string }[] = [];
  constructor( private addCards: CommonServiceTsService, public activeModal: NgbActiveModal, private toster: ToastrService) { }
 
close() {
    this.activeModal.dismiss('close'); 
  }

  
addCard() {
  const formData = new FormData();
  formData.append('label', this.label);

  if (this.files.length > 0) {
    formData.append('icon', this.files[0].file); 
  }

  this.addCards.addDashboardCard(formData).subscribe({
    next: (res) => {
      console.log('Upload successful');
      this.close();
    },
    error: (err) => {
      console.error('Upload failed', err);
    }
  });
}

onSelect(event:any){
 
 const addedFileUrl = event.addedFiles.map((file:File)=>({
  file:file,
  url:URL.createObjectURL(file)
 }));
 this.files.push(...addedFileUrl)
 
}



}
