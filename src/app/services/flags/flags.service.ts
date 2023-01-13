import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlagsService {
  private readonly _canActivate$ = new BehaviorSubject<boolean>(this.getValue('canActivate'));
  readonly canActivate$ = this._canActivate$.asObservable();

  private readonly _canLoad$ = new BehaviorSubject<boolean>(this.getValue('canLoad'));
  readonly canLoad$ = this._canLoad$.asObservable();

  private readonly _canMatch$ = new BehaviorSubject<boolean>(this.getValue('canMatch'));
  readonly canMatch$ = this._canMatch$.asObservable();
  readonly isAdmin$ = this._canMatch$.asObservable();

  setCanActivate(value: boolean): void {
    this.setValue('canActivate', value);
    this._canActivate$.next(value);
  }

  toggleCanActivate(): void {
    this.setCanActivate(!this._canActivate$.value);
  }

  setCanLoad(value: boolean): void {
    this.setValue('canLoad', value);
    this._canLoad$.next(value);
  }

  toggleCanLoad(): void {
    this.setCanLoad(!this._canLoad$.value);
  }

  setCanMatch(value: boolean): void {
    this.setValue('canMatch', value);
    this._canMatch$.next(value);
  }

  toggleCanMatch(): void {
    this.setCanMatch(!this._canMatch$.value);
  }

  getValue(key: string): boolean {
    const value = localStorage.getItem(key);

    return value === 'true';
  }

  setValue(key: string, value: boolean): void {
    localStorage.setItem(key, value ? 'true' : 'false');
  }
}
