import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { replayCanMatch } from '../../helpers/replay-can-match';

interface User {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpTestGuard implements CanMatch {
  private readonly http = inject(HttpClient);

  private permission$ = this.getPermission();

  private getPermission(): Observable<boolean> {
    return this.http.get<User>('https://jsonplaceholder.typicode.com/users/1').pipe(
      map((user) => user.email.endsWith('biz')),// true
    );
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('CanMatchGuard');//, route, segments);

    return this.getPermission();
  }
}

















  // canMatch = replayCanMatch(() =>
  //   this.http.get<User>('https://jsonplaceholder.typicode.com/users/1').pipe(
  //     map((user) => user.email.endsWith('biz'))
  //   )
  // );
