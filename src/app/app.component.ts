import { Component, inject } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';
import { FlagsService } from './services/flags/flags.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  protected readonly flagsService = inject(FlagsService);
  private readonly router = inject(Router);

  constructor() {
    // this.router.events.pipe(
    //    filter((e: unknown): e is RouterEvent => e instanceof RouterEvent)
    // ).subscribe((e: RouterEvent) => {
    //   console.log(`%c\t\tRouterEvent: ${e.constructor.name}`, 'color: cornflowerblue');
    // });
  }
}
