import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbDateAdapter, NgbDateNativeUTCAdapter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormValidationDirective } from './directives/form-validation.directive';

@NgModule({
  declarations: [
    AppComponent,
    FormValidationDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter}],
  bootstrap: [AppComponent]
})
export class AppModule { }
