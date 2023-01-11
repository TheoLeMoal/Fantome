import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Fantome } from '../../fantome';

@Component({
  selector: 'app-fantome-connection-form',
  template: `
    <h1>Connection</h1>
    <form autocomplete="off" [formGroup]="fantomeConnectionForm" (ngSubmit)="submitForm()">
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
  
      <button class="btn btn-primary m-3" type="submit">Connection</button>
      <button class="btn btn-primary m-3" [routerLink]="['/inscription']">Inscription</button>
    </form>
  `,
 })
 export class FantomeConnectionFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Fantome> = new BehaviorSubject({});
  
  @Output()
  formValuesChanged = new EventEmitter<Fantome>();
  
  @Output()
  formSubmitted = new EventEmitter<Fantome>();
  
  fantomeConnectionForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder) { }
  
  get login() { return this.fantomeConnectionForm.get('login')!; }
  get password() { return this.fantomeConnectionForm.get('password')!; }
  get role() { return this.fantomeConnectionForm.get('role')!; }
  
  ngOnInit() {
    this.initialState.subscribe(fantome => {
      this.fantomeConnectionForm = this.fb.group({
        login: [ fantome.login, [Validators.required] ],
        password: [ fantome.password, [ Validators.required, Validators.minLength(5) ] ],
        role: [ fantome.role, [Validators.required] ]
      });
    });
  
    this.fantomeConnectionForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }
  
  submitForm() {
    this.formSubmitted.emit(this.fantomeConnectionForm.value);
  }
 }