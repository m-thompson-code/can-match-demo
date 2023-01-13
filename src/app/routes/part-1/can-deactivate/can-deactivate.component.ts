import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-can-deactivate',
  templateUrl: './can-deactivate.component.html',
  styleUrls: ['./can-deactivate.component.scss']
})
export class CanDeactivateComponent implements OnDestroy {
  ngOnDestroy(): void {
    console.log('Component destroyed');
  }
}
