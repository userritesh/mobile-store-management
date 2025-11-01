import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent {
@Input()data: any;
@Input()width!: string;
@Input()height!: string;
@Output()fileSelected = new EventEmitter<any>()
files: any[]= [];

onSelect(event:any){
  const selectedImg = event.addedFiles.map((file:File)=>({
  file:file,
  url:URL.createObjectURL(file)
  }))
   this.files.push(...selectedImg)
   this.fileSelected.emit( this.files)
}
}
