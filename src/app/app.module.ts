import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {DetailPetComponent} from './fetchPets/detail-pet.component';
import {AddPetComponent} from './add-pet/add-pet.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilterPetsComponent} from './filter-pets/filter-pets.component';
import {FirstLettersPipe} from './first-letters.pipe';
import {ClientService} from "./client.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ClarityModule} from "@clr/angular";
import {CustomHttpInterceptor} from "./http-interceptor";
import { InputsModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LabelModule } from '@progress/kendo-angular-label';
import {ButtonModule as ButtonModuleKendo} from "@progress/kendo-angular-buttons";
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule as ButtonModulePrime} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {CheckboxModule} from "primeng/checkbox";
import {InputSwitchModule} from "primeng/inputswitch";
import {ToggleButtonModule} from "primeng/togglebutton";
import {MenubarModule} from "primeng/menubar";

@NgModule({
  declarations: [
    AppComponent,
    DetailPetComponent,
    AddPetComponent,
    FilterPetsComponent,
    FirstLettersPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputsModule,
    GridModule,
    DropDownsModule,
    LabelModule,
    ButtonModuleKendo,
    IndicatorsModule,
    InputTextModule,
    DropdownModule,
    ButtonModulePrime,
    ToolbarModule,
    RippleModule,
    TableModule,
    CheckboxModule,
    InputSwitchModule,
    ToggleButtonModule,
    MenubarModule,
  ],
  providers: [ClientService, {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
