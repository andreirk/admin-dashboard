import { NgModule, ApplicationRef, state } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { StoreModule, Action, combineReducers } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
// import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';
import { CoreModule } from './core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { INITIAL_APP_STATE, AppState } from "./shared/store/app-state";
import { EffectsModule } from "@ngrx/effects";
import { ProductsEffectsService } from "./shared/store/effects/products-effects";
import { uiState } from "./shared/store/reducers/uiStateReducer";
import { storeData } from "./shared/store/reducers/uiStoreDataReducer";

// Application wide providers
const APP_PROVIDERS = [
  // AppState,
  GlobalState
];

// type StoreType = {
//   state: InternalStateType,
//   restoreInputValues: () => void,
//   disposeOldHosts: () => void
// };


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    PagesModule,
    CoreModule,
    NgbModule.forRoot(),
    routing,
    StoreModule.provideStore(combineReducers(
      {
        uiState,
        storeData
      }),INITIAL_APP_STATE),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(ProductsEffectsService),
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})

export class AppModule {

  constructor(public appRef: ApplicationRef) {
  }


  /**
   * comment out this native ui framework store managment code for possible future usage
   */

  // hmrOnInit(store: StoreType) {
  //   if (!store || !store.state) return;
  //   console.log('HMR store', JSON.stringify(store, null, 2));
  //   // set state
  //   this.appState._state = store.state;
  //   // set input values
  //   if ('restoreInputValues' in store) {
  //     let restoreInputValues = store.restoreInputValues;
  //     setTimeout(restoreInputValues);
  //   }
  //   this.appRef.tick();
  //   delete store.state;
  //   delete store.restoreInputValues;
  // }
  //
  // hmrOnDestroy(store: StoreType) {
  //   const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
  //   // save state
  //   const state = this.appState._state;
  //   store.state = state;
  //   // recreate root elements
  //   store.disposeOldHosts = createNewHosts(cmpLocation);
  //   // save input values
  //   store.restoreInputValues = createInputTransfer();
  //   // remove styles
  //   removeNgStyles();
  // }
  //
  // hmrAfterDestroy(store: StoreType) {
  //   // display new elements
  //   store.disposeOldHosts();
  //   delete store.disposeOldHosts;
  // }

}
