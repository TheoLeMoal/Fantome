import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Fantome } from '../../fantome';

@Component({
  selector: 'app-fantome-form',
  template: `
    <form autocomplete="off" [formGroup]="fantomeInscriptionForm" (ngSubmit)="submitForm()">
      <div class="form-floating mb-3">
        <input class="form-control" type="text" id="login" formControlName="login" placeholder="login" required>
        <label for="login">Nom</label>
      </div>
  
      <div *ngIf="login.invalid && (login.dirty || login.touched)" class="alert alert-danger">
        <div *ngIf="login.errors?.['required']">
          Un nom est requis.
        </div>
        <div *ngIf="login.errors?.['minlength']">
          Un nom doit faire plus de 3 caractère de long.
        </div>
      </div>
  
      <div class="form-floating mb-3">
        <input class="form-control" type="text" formControlName="password" placeholder="Password" required>
        <label for="password">Mods de passe</label>
      </div>
  
      <div *ngIf="password.invalid && (password.dirty || password.touched)" class="alert alert-danger">
  
        <div *ngIf="password.errors?.['required']">
          Un mot de passe est requis
        </div>
        <div *ngIf="password.errors?.['minlength']">
          Le mot de passe doit faire plus de 10 caractère
        </div>
      </div>
  
      <div class="mb-3">
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="role" name="role" id="Guerrier" value="Guerrier" required>
          <label class="form-check-label" for="">Guerrier</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="role" name="role" id="Alchimiste" value="Alchimiste">
          <label class="form-check-label" for="">Alchimiste</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="role" name="role" id="Sorcier" value="Sorcier">
          <label class="form-check-label" for="">Sorcier</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="role" name="role" id="Espions" value="Espions">
          <label class="form-check-label" for="">Espions</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="role" name="role" id="Enchanteur" value="Enchanteur">
          <label class="form-check-label" for="">Enchanteur</label>
        </div>
      </div>
  
      <button class="btn btn-primary" type="submit" [disabled]="fantomeInscriptionForm.invalid">Ajouter</button>
    </form>
  `,
  styles: [
  ]
 })
 export class FantomeInscriptionFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Fantome> = new BehaviorSubject({});
  
  @Output()
  formValuesChanged = new EventEmitter<Fantome>();
  
  @Output()
  formSubmitted = new EventEmitter<Fantome>();
  
  fantomeInscriptionForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder) { }
  
  get login() { return this.fantomeInscriptionForm.get('login')!; }
  get password() { return this.fantomeInscriptionForm.get('password')!; }
  get role() { return this.fantomeInscriptionForm.get('role')!; }
  
  ngOnInit() {
    this.initialState.subscribe(fantome => {
      this.fantomeInscriptionForm = this.fb.group({
        login: [ fantome.login, [Validators.required] ],
        password: [ fantome.password, [ Validators.required, Validators.minLength(5) ] ],
        role: [ fantome.role, [Validators.required] ]
      });
    });
  
    this.fantomeInscriptionForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }
  
  submitForm() {
    this.formSubmitted.emit(this.fantomeInscriptionForm.value);
  }
 }