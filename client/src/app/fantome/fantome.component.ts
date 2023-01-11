import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fantome } from '../fantome';
import { FantomeService } from '../fantome.service';
 
@Component({
 selector: 'app-fantomes-list',
 template: `
   <h2 class="text-center m-5"></h2>

   <button class="btn btn-primary mt-3" [routerLink]="['/inscription']">Ajouter un nouveau fantome</button>
 `
})
export class FantomeComponent implements OnInit {
 fantome$: Observable<Fantome> = new Observable();
 user: Object = new  Object()
 constructor(private fantomesService: FantomeService) { }
 
 ngOnInit(): void {
  const id = localStorage.getItem('user')
   this.fetchFantome(`${id}`);
 }


 disconect(){

 }
 
 private fetchFantome(id: string): void {
   this.fantome$ = this.fantomesService.getFantome(id);
   let user = null
   this.fantome$.forEach(element => {
      user = element
   });
   
 }
}