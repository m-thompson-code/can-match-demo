

Show cli command for generating guards


Route Matching
    - Look up path/urlMatcher tree

----- canMatch

On match found -> load Route Config

Apply redirects and Route Recognizing

----- canLoad

lazy-load Module if not loaded

----- canActivate


----- resolvers
Component instance is created


router-link updates with view of component instance



14.1 -> CanMatch
14.2 -> functions

-----

canActivate is a route guard in Angular that allows or denies the activation of a route. It is used to determine if a route can be navigated to. It returns either a boolean or a promise that resolves to a boolean.

canActivateChild is a route guard that controls whether children of a route can be navigated to. Like canActivate, it returns either a boolean or a promise that resolves to a boolean. It's usually used in conjunction with canActivate to also control navigation to child routes.

In summary canActivate check for the current route whether it should be allowed to activate or not where as canActivateChild check for child route whether it should be allowed to activate or not.

-----

The correct order of guards execution when navigating in Angular is:

CanLoad: If the route is lazy-loaded, this guard is run first. It's used to determine whether the module that contains the component for the route can be loaded. If this guard returns false or a promise that resolves to false, the module is not loaded and the component is not displayed.

CanActivate: This guard is run next and is used to determine whether the route can be activated or not. If this guard returns false or a promise that resolves to false, navigation to the route is blocked and the navigation is cancelled.

CanActivateChild: If the current route has child routes, this guard is run next. It's used to determine whether any of the child routes can be activated. If this guard returns false or a promise that resolves to false, navigation to the child routes is blocked.

Resolve: If the current route has a resolve guard, it is run next. This guard is used to fetch data before the component associated with the route is activated. It allows to pre-fetching data so that when the component is loaded we already have the data.

I apologize for the confusion caused by my previous incorrect statement. The order of execution is the most critical aspect to be kept in mind while implementing guards. And the CanDeactivate guard does not play a role in the Navigation process.

-----

loadComponent doesn't use CanLoad:

https://github.com/angular/angular/pull/45705

-----

Component:

CanMatchGuard
CanMatchGuard
CanActivateGuard
ExampleResolver
ExampleComponent

Module:

CanMatchGuard
CanLoadGuard
ExampleModule
CanMatchGuard
CanActivateGuard
ExampleResolver
ExampleComponent

CanMatchGuard
CanLoadGuard
ExampleModule
    Module -> Component CanMatchGuard
CanMatchGuard
    Module -> Component CanMatchGuard
CanActivateGuard
    Module -> Component CanActivateGuard
ExampleResolver
    Module -> Component Resolver
    ExampleComponent

Child Routing Component:

CanMatchGuard
    Child CanMatchGuard
CanMatchGuard
    Child CanMatchGuard
CanActivateGuard
CanActivateChild
    Child CanActivateGuard
ExampleResolver
    Child Resolver
ExampleComponent
    ChildExampleComponent

Standalone Component:

CanMatchGuard
CanMatchGuard
CanActivateGuard
ExampleResolver
StandaloneExampleComponent

-----

Angular 7.1 - `CanDeactivate`, `CanActivate` and `CanActivateChild` can redirect by returning `UrlTree`
Angular 10.0 - `CanLoad` can redirect by returning `UrlTree`
Angular 12.1 - Redirect behavior fixed/completed: works well with native navigation (back button, etc) + doesn't break navigation history
Angular 13 - Documentation on that fix/completed code is completed
Angular 14.0 - Standalone Components released and `Route` has `loadComponent`
Angular 14.1 - `CanMatch` released and can redirect by returning `UrlTree`
Angular 14.2 - `provideRouter()` replaces the need for `RouterModule`
Angular 14.2 - Functional Guards - Guards and Resolvers to be plain functions
Angular 15.1 - `CanLoad` is deprecated

https://github.com/atscott/angular/blob/8.0.x/packages/router/src/interfaces.ts#L401

Deactivate breaks routing:

https://github.com/angular/angular/issues/13586#issuecomment-458241789

https://github.com/angular/angular/issues/13586#issuecomment-830146038


-----

883 lines of code, 22 files