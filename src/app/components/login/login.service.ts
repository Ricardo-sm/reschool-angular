import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

import { User } from 'src/app/models/user.model';
import { ApolloQueryResult, FetchResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private createUserMutation: DocumentNode = gql`
    mutation createUser($user: CreateUser!) {
      createUser(user: $user)
    }
  `;

  private logInUserQuery: DocumentNode = gql`
    query logIn($user: LogInUser!) {
      logIn(user: $user)
    }
  `;

  constructor(private apollo: Apollo) {}

  // Queries

  logIn(user: User): Observable<ApolloQueryResult<String>> {
    return this.apollo.query({
      query: this.logInUserQuery,
      variables: { user },
    });
  }

  // Mutations

  createUser(user: User): Observable<FetchResult> {
    return this.apollo.mutate({
      mutation: this.createUserMutation,
      variables: { user },
    });
  }
}
