import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FantomeConnectionFormComponent } from './form/fantome-connection/fantome-connection.component';
import { FantomeInscriptionFormComponent } from './form/fantome-inscription/fantome-inscription.component';
import { InscriptionFantomeComponent } from './inscription-fantome/inscription-fantome.component';
import { ConnectionFantomeComponent } from './connection-fantome/connection-fantome.component';
import { ModifFantomeComponent } from './modification-fantome/modification-fantome.component';
import { FantomeListComponent } from './fantome-list/fantome-list.component';
import { FantomeComponent } from './fantome/fantome.component';

@NgModule({
  declarations: [
    AppComponent,
    FantomeConnectionFormComponent,
    FantomeInscriptionFormComponent,
    InscriptionFantomeComponent,
    ConnectionFantomeComponent,
    ModifFantomeComponent,
    FantomeListComponent,
    FantomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
