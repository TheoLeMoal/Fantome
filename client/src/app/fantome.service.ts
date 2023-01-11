import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Fantome } from './fantome';
import { map } from 'rxjs/operators';
 
@Injectable({
 providedIn: 'root'
})
export class FantomeService {
 private url = 'http://localhost:5200';
 private fantomes$: Subject<Fantome[]> = new Subject();
 private fantomeSubject: BehaviorSubject<Fantome | null>;
 public fantome: Observable<Fantome | null>;

 constructor(private httpClient: HttpClient) {
  this.fantomeSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('fantome')!));
  this.fantome = this.fantomeSubject.asObservable();
 }
 
 private refreshFantomes() {
   this.httpClient.get<Fantome[]>(`${this.url}/fantomes`)
     .subscribe(fantomes => {
       this.fantomes$.next(fantomes);
     });
 }
 
 getFantomes(): Subject<Fantome[]> {
   this.refreshFantomes();
   return this.fantomes$;
 }
 
 getFantome(id: string): Observable<Fantome> {
   return this.httpClient.get<Fantome>(`${this.url}/fantomes/${id}`);
 }
 
 createFantome(fantome: Fantome): Observable<string> {
   return this.httpClient.post(`${this.url}/fantomes`, fantome, { responseType: 'text' });
 }
 
 updateFantome(id: string, fantome: Fantome): Observable<string> {
   return this.httpClient.put(`${this.url}/fantomes/${id}`, fantome, { responseType: 'text' });
 }
 
 deleteFantome(id: string): Observable<string> {
   return this.httpClient.delete(`${this.url}/fantomes/${id}`, { responseType: 'text' });
 }

 authenticate() {
 }
 
}

