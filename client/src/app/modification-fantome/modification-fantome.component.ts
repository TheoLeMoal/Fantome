import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Fantome } from '../fantome';
import { FantomeService } from '../fantome.service';
 
@Component({
 selector: 'app-edit-fantome.component.ts',
 template: `
   <h2 class="text-center m-5">Modifier un fantome</h2>
   <app-fantome-form [initialState]="fantome" (formSubmitted)="editFantome($event)"></app-fantome-form>
 `
})
export class ModifFantomeComponent implements OnInit {
 fantome: BehaviorSubject<Fantome> = new BehaviorSubject({});
 
 constructor(
   private router: Router,
   private route: ActivatedRoute,
   private fantomeService: FantomeService,
 ) { }
 
 ngOnInit() {
   const id = this.route.snapshot.paramMap.get('id');
   if (!id) {
     alert('No id provided');
   }
 
   this.fantomeService.getFantome(id !).subscribe((fantome) => {
     this.fantome.next(fantome);
   });
 }
 
 editFantome(fantome: Fantome) {
   this.fantomeService.updateFantome(this.fantome.value._id || '', fantome)
     .subscribe({
       next: () => {
         this.router.navigate(['/fantomes']);
       },
       error: (error) => {
         alert('Erreur lors de la modification du fantome');
         console.error(error);
       }
     })
 }
}