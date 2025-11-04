import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  toggleSidebar() {
      const wrapper = document.getElementById('wrapper');
      wrapper?.classList.toggle('collapsed');
  }
  }

