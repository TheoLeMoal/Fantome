import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Fantome } from '../fantome';
import { FantomeService } from '../fantome.service';
 
@Component({
 selector: 'app-connection-fantome',
 template: `
   <h2 class="text-center m-5">Connection</h2>
   <app-fantome-connection-form (formSubmitted)="authenticate($event)"></app-fantome-connection-form>
 `
})
export class ConnectionFantomeComponent {
 fantomes$: Observable<Fantome[]> = new Observable()
 constructor(
   private router: Router,
   private FantomeService: FantomeService
 ) { }
 
 authenticate(user: Fantome) {
   this.fantomes$ = this.FantomeService.getFantomes()
   this.fantomes$.forEach(el => {
    el.forEach(fantome => {
      if (fantome.login == user.login && fantome.password == user.password) {
        localStorage.setItem(`user`, `${fantome._id}`);
        this.router.navigate(['/fantomes']);
      }
});
   });
  }
}