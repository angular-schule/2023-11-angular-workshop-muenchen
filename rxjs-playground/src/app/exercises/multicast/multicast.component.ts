import { Component, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, Observable, share, takeUntil, shareReplay } from 'rxjs';

import { MeasureValuesService } from './measure-values.service';
import { ExerciseService } from '../exercise.service';
import { HistoryComponent } from '../../shared/history/history.component';
import { NgFor, AsyncPipe, DecimalPipe, JsonPipe } from '@angular/common';

@Component({
  templateUrl: './multicast.component.html',
  standalone: true,
  imports: [NgFor, HistoryComponent, AsyncPipe, DecimalPipe, JsonPipe]
})
export class MulticastComponent implements OnDestroy {

  listeners: string[] = [];
  logStream$ = new ReplaySubject<string>();
  private destroy$ = new Subject<void>();

  measureValues$: Observable<number>; // später: Subject<number>;

  constructor(private mvs: MeasureValuesService, private es: ExerciseService) {
    /**************!!**************/

    // 1. unchanged, everything cold :-(
    // this.measureValues$ = this.mvs.getValues();

    // 2. multicast with share!
    // this.measureValues$ = this.mvs.getValues().pipe(share())

    // 3. multicast with shareReplay
    this.measureValues$ = this.mvs.getValues().pipe(shareReplay({
      refCount: true,
      bufferSize: 1
    }));


    // 4. by hand - please try at home: BehaviourSubject, ReplaySubject --- unscubscribe!!!!
    // this.measureValues$ = new Subject<number>();
    // this.mvs.getValues().subscribe(this.measureValues$);


    /**************!!**************/

  }

  addListener() {
    this.listeners.push(this.es.generateRandomString());
  }

  addConsoleListener() {
    const randomString = this.es.generateRandomString();
    this.measureValues$.pipe(takeUntil(this.destroy$)).subscribe(e => this.logStream$.next(`${randomString} ${e}`));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
