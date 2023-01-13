import { CanMatch } from '@angular/router';
import { tap } from 'rxjs';
import { wrapIntoObservable } from './wrap-into-observable';

/**
 * source: https://github.com/angular/angular/issues/47417#issuecomment-1252589559
 * 
 * Currently `canMatch` will be called twice:
 * 
 * 1. Once which determines the final URL for the navigation (applyRedirects)
 * 
 * 2. Once that creates the ActivatedRouteSnapshots for the navigation (recognize)
 */
export const replayCanMatch = (canMatch: CanMatch['canMatch']): CanMatch['canMatch'] => {
  let cache: ReturnType<CanMatch['canMatch']> | undefined;

  return (
    ...args: Parameters<CanMatch['canMatch']>
  ): ReturnType<CanMatch['canMatch']> => {
    if (cache) {
      const replayCache = cache;

      cache = undefined;

      return replayCache;
    }

    // Convert all variations of the return type as `Observable<T>`.
    // This way caching can work the same (Solution for `Observable<T>`)
    // for all possible return types: T, Promise<T>, Observable<T>
    return wrapIntoObservable(canMatch(...args)).pipe(
      tap((value) => {
        cache = value;
      })
    );
  };
};
