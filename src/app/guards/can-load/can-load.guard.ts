import { inject, Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FlagsService } from '../../services/flags/flags.service';

@Injectable({
  providedIn: 'root'
})
export class CanLoadGuard implements CanLoad {
  protected readonly flagsService = inject(FlagsService);

  canLoad(
    route: Route, 
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('CanLoadGuard');//, route, segments);
  
    return this.flagsService.canLoad$;
  }
}
