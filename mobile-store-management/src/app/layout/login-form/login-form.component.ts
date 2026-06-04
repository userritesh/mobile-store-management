import { Component, ViewChild } from '@angular/core';
import { InputComponent } from 'src/app/shared/components/form-controls/input/input.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

 info:any ={};

  ngAfterViewInit() {
    console.log(this.info?.productNameInput);
    console.log(this.info?.usernameInput);
    console.log(this.info?.passwordInput);
  }

  onLogin(){

  }
}


