import { LoadChildrenCallback, Route, Routes } from '@angular/router';
import { Observable } from 'rxjs';

export type LoadComponentCallback = NonNullable<Route['loadComponent']>;

export type FeatureFlagCallback = () =>
  | boolean
  | Promise<boolean>
  | Observable<boolean>;

/**
 * Include `alternativeLoadChildren` and `featureFlag` to generate two routes:
 *
 * 1. `alternativeLoadChildren` will be used if `featureFlag` returns / emits `true`
 *
 * 2. `loadChildren` will be used if `featureFlag` returns / emits `false`
 */
export type FeatureFlagRoute = Route &
  (
    | {
        loadComponent: LoadComponentCallback;
        alternativeLoadComponent: LoadComponentCallback;
        loadChildren?: never;
        alternativeLoadChildren?: never;
        featureFlag: FeatureFlagCallback;
      }
    | {
        loadComponent?: never;
        alternativeLoadComponent?: never;
        loadChildren: LoadChildrenCallback;
        alternativeLoadChildren: LoadChildrenCallback;
        featureFlag: FeatureFlagCallback;
      }
    | {
        alternativeLoadComponent?: never;
        alternativeLoadChildren?: never;
        featureFlag?: never;
      }
  );

/**
 * Generates `Routes` where some `Route` instances will split into two `Route` instances.
 * If a route includes `alternativeLoadChildren`/`alternativeLoadComponent` and `featureFlag`, two routes will be generated:
 *
 * 1. `alternativeLoadChildren` will be used if `featureFlag` returns / emits `true`
 *
 * 2. `loadChildren` will be used if `featureFlag` returns / emits `false`
 */
export const getFeatureFlagRoutes = (routes: FeatureFlagRoute[]): Routes => {
  const pairs: ([Route, Route] | Route)[] = routes.map((featurFlagRoute) => {
    const {
      featureFlag,
      alternativeLoadChildren,
      alternativeLoadComponent,
      ...route
    } = featurFlagRoute;

    // No need to split route since it doesn't involve feature flags
    if (
      !featureFlag ||
      (!alternativeLoadChildren && !alternativeLoadComponent)
    ) {
      return route;
    }

    // Split route into two
    if (alternativeLoadComponent) {
      return [
        {
          ...route,
          // Navigate using `alternativeLoadComponent` instead
          loadComponent: alternativeLoadComponent,
          // as long as `featureFlag` will return `true`
          // If it doesn't, `canMatch` will not navigate to this route
          // and use the copied route with the original `loadComponent`
          canMatch: [featureFlag, ...(route.canMatch ?? [])],
        },
        route,
      ];
    }

    return [
      {
        ...route,
        // Navigate using `alternativeLoadChildren` instead
        loadChildren: alternativeLoadChildren,
        // as long as `featureFlag` will return `true`
        // If it doesn't, `canMatch` will not navigate to this route
        // and use the copied route with the original `loadChildren`
        canMatch: [featureFlag, ...(route.canMatch ?? [])],
      },
      route,
    ];
  });

  // Flatten `pairs` from `[Route, Route][]` to `Routes` (`Route[]`)
  return pairs.flat();
};
