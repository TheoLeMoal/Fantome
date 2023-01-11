import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fantome } from '../fantome';
import { FantomeService } from '../fantome.service';
 
@Component({
 selector: 'app-fantomes-list',
 template: `
   <h2 class="text-center m-5">Carnet de fantomes</h2>
 
   <table class="table table-striped table-bordered">
       <thead>
           <tr>
               <th>Nom</th>
               <th>role</th>
               <th>Action</th>
           </tr>
       </thead>
 
       <tbody>
           <tr *ngFor="let fantome of fantomes$ | async">
               <td>{{fantome.login}}</td>
               <td>{{fantome.role}}</td>
               <td>
                   <button class="btn btn-primary me-1" [routerLink]="['/fantome/modifier/', fantome._id]">Edit</button>
                   <button class="btn btn-danger" (click)="deleteFantome(fantome._id || '')">Delete</button>
               </td>
           </tr>
       </tbody>
   </table>
 
   <button class="btn btn-primary mt-3" [routerLink]="['/inscription']">Ajouter un nouveau fantome</button>
 `
})
export class FantomeListComponent implements OnInit {
  fantomes$: Observable<Fantome[]> = new Observable();
 
 constructor(private fantomesService: FantomeService) { }
 
 ngOnInit(): void {
   this.fetchFantomes();
   const id = localStorage.getItem('user')
   const user = this.fantomesService.getFantome(`${id}`)
   console.log(user)
 }
 
 deleteFantome(id: string): void {
   this.fantomesService.deleteFantome(id).subscribe({
     next: () => this.fetchFantomes()
   });
 }

 disconect(){

 }
 
 private fetchFantomes(): void {
   this.fantomes$ = this.fantomesService.getFantomes();
 }
}