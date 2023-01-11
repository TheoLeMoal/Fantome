import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionFantomeComponent } from './connection-fantome/connection-fantome.component';
import { FantomeListComponent } from './fantome-list/fantome-list.component';
import { FantomeComponent } from './fantome/fantome.component';
import { InscriptionFantomeComponent } from './inscription-fantome/inscription-fantome.component';
import { ModifFantomeComponent } from './modification-fantome/modification-fantome.component';

const routes: Routes = [
  { path: 'connection', component: ConnectionFantomeComponent },
  { path: 'inscription', component: InscriptionFantomeComponent},
  { path: 'fantome', component:  FantomeComponent},
  { path: 'fantomes', component:  FantomeListComponent},
  { path: 'fantome/modifier/:id', component:  ModifFantomeComponent},
  { path: '', redirectTo: 'connection', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
