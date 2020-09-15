import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// NgRx Modules
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';

// Material Module
import { MaterialModule } from './themes/material.module';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';

// Custom Components
import { LoginModule } from './components/login/login.module';

// Imports
import { environment } from '../environments/environment';
import { appReducers } from './store/app.reducers';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['theme'], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    // Custom Modules
    LoginModule,

    // Material Module
    MaterialModule,

    // NgRX Modules
    StoreModule.forRoot(appReducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
