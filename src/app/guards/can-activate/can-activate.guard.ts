import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FlagsService } from '../../services/flags/flags.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
  protected readonly flagsService = inject(FlagsService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('CanActivateGuard');//, route, state);

    return this.flagsService.canActivate$;
  }
}
