import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { replayCanMatch } from 'src/app/helpers/replay-can-match';
import { FlagsService } from '../../services/flags/flags.service';

@Injectable({
  providedIn: 'root',
})
export class CanMatchGuard implements CanMatch {
  protected readonly flagsService = inject(FlagsService);

  canMatch(
    route: Route, 
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('CanMatchGuard');//, route, segments);
  
    return this.flagsService.canMatch$;
  }
}
