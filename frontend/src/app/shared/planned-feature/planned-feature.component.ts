import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

interface PlannedFeatureData {
  title: string;
  description: string;
  phase: number;
}

@Component({
  selector: 'app-planned-feature',
  templateUrl: './planned-feature.component.html',
})
export class PlannedFeatureComponent {
  private readonly route = inject(ActivatedRoute);
  readonly feature = toSignal(this.route.data, {
    initialValue: {
      title: 'HTL Hub',
      description: 'Dieses Modul wird vorbereitet.',
      phase: 1,
    } as PlannedFeatureData,
  });
}
