import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private authService: AuthService,
  ) {
    const http = this.httpLink.create({ uri: 'http://localhost:8000/graphql/' });
    const authLink = setContext(() => {
      const token = this.authService.getToken();
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    this.apollo.create({
      link: authLink.concat(http),
      cache: new InMemoryCache(),
    });
  }
}
