import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { GraphqlService } from './core/services/graphql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mobile-store-management';

  constructor(
    private authService: AuthService,
    private graphqlService: GraphqlService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.authService.loadTokenFromStorage();
  }
}
