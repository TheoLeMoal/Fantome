import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Fantome } from '../fantome';
import { FantomeService } from '../fantome.service';
 
@Component({
 selector: 'app-inscription-fantome',
 template: `
   <h2 class="text-center m-5">Inscription</h2>
   <app-fantome-form (formSubmitted)="addfantome($event)"></app-fantome-form>
 `
})
export class InscriptionFantomeComponent {
 constructor(
   private router: Router,
   private FantomeService: FantomeService
 ) { }
 
 addfantome(fantome: Fantome) {
   this.FantomeService.createFantome(fantome)
     .subscribe({
       next: () => {
         this.router.navigate(['/fantomes']);
       },
       error: (error) => {
         alert("Erreur lors de la creation du fantome");
         console.error(error);
       }
     });
 }
}