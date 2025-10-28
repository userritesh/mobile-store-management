import { Injectable } from '@angular/core';
import { commonModal, ModalPopupSize } from '../common-enum/common-enum.module';
import { NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class CommonPopupModelService {

  constructor(private modalService:NgbModal) { }

  openModalPopup(
    component: any,
    data: any,
    title: string,
    popupSize: string = ModalPopupSize.LG,
    windowClass: string = "",
    fullscreen?: boolean,
    centered?: boolean
  ): Promise<any> {
    commonModal.size = popupSize;
    commonModal.windowClass = windowClass;
    commonModal.fullscreen = fullscreen;
    commonModal.centered = centered ?? true;

    const modalOption: NgbModalOptions = { ...commonModal };
    const modalRef = this.modalService.open(component, modalOption);

    if (title != undefined) modalRef.componentInstance.modalTitle = title;
    modalRef.componentInstance.data = data;

    return modalRef.result.then(
      (result) => result || null,
      (reason) => null
    );
  }

}
