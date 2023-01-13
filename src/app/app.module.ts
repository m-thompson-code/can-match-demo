import { inject, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CanActivateGuard } from './guards/can-activate/can-activate.guard';
import { CanLoadGuard } from './guards/can-load/can-load.guard';
import { CanMatchGuard } from './guards/can-match/can-match.guard';
import { NotFoundComponent } from './routes/part-0/not-found/not-found.component';
import { HomeComponent } from './routes/part-0/home/home.component';
import { getFeatureFlagRoutes } from './helpers/feature-flag-routes';
import { ExampleComponent } from './routes/part-0/example/example.component';
import { ExampleResolver } from './resolvers/example.resolver';
import { ExampleModule } from './routes/part-0/example/example.module';
import { ChildExampleComponent } from './routes/part-0/example/child-example/child-example.component';
import { ClickButtonComponent } from './components/click-button/click-button.component';
import { CanDeactivateComponent } from './routes/part-1/can-deactivate/can-deactivate.component';
import { FlagsService } from './services/flags/flags.service';
import { HttpTestGuard } from './guards/http-test/http-test.guard';
import { CanDeactivateGuard } from './guards/can-deactivate/can-deactivate.guard';
import { CanActivateChildGuard } from './guards/can-activate-child/can-activate-child.guard';

const routes: Routes = [
  /**
   * Basic can-activate, can-load, can-match examples
   */
  {
    path: 'can-deactivate',
    component: CanDeactivateComponent,
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'can-activate',
    loadChildren: () =>
      import('./routes/part-1/can-activate/can-activate.module').then(
        (m) => m.CanActivateModule
      ),
    canActivate: [CanActivateGuard],
  },
  {
    path: 'can-load',
    loadChildren: () =>
      import('./routes/part-1/can-load/can-load.module').then(
        (m) => m.CanLoadModule
      ),
    canLoad: [CanLoadGuard],
  },
  {
    path: 'can-match',
    loadChildren: () =>
      import('./routes/part-1/can-match/can-match.module').then(
        (m) => m.CanMatchModule
      ),
    canMatch: [CanMatchGuard],
  },

  /**
   * Dashboard page
   */
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./routes/part-2/admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
    canMatch: [CanMatchGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./routes/part-2/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },

  /**
   * Shop page
   */
  {
    path: 'shop',
    loadComponent: () =>
      import(
        './routes/part-2/standalone-sale-shop/standalone-sale-shop.component'
      ).then((m) => m.StandaloneSaleShopComponent),
    canMatch: [CanMatchGuard],
  },
  {
    path: 'shop',
    loadComponent: () =>
      import('./routes/part-2/standalone-shop/standalone-shop.component').then(
        (m) => m.StandaloneShopComponent
      ),
  },

  /**
   * Http page
   */
  {
    path: 'http',
    loadChildren: () =>
      import('./routes/part-2/http/http.module').then((m) => m.HttpModule),
    canMatch: [HttpTestGuard],
  },

  /**
   * Example page
   */
  {
    path: 'example',
    // component: ExampleComponent,
    loadChildren: () =>
      import('./routes/part-0/example/example.module').then(
        (m) => m.ExampleModule
      ),
    // loadComponent: () => import('./routes/part-0/standalone-example/standalone-example.component').then(m => m.StandaloneExampleComponent),
    canMatch: [CanMatchGuard],
    canActivate: [CanActivateGuard],
    canActivateChild: [CanActivateChildGuard],
    canLoad: [CanLoadGuard],
    resolve: [ExampleResolver],
    // children: [
    //   {
    //     path: '',
    //     component: ChildExampleComponent,
    //     canMatch: [() => {console.log('\tChild CanMatchGuard'); return true }],
    //     canActivate: [() => {console.log('\tChild CanActivateGuard'); return true }],
    //     canLoad: [() => {console.log('\tChild CanLoadGuard'); return true }],
    //     resolve: [() => {console.log('\tChild Resolver'); return true }],
    //   }
    // ],
  },

  /**
   * Home and 404 page
   */
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    ChildExampleComponent,
    ClickButtonComponent,
    CanDeactivateComponent,
  ],
  imports: [HttpClientModule, BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
