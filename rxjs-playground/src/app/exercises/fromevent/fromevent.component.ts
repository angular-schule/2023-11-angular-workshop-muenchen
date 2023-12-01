import { Component } from '@angular/core';
import { fromEvent, map, startWith, debounceTime } from 'rxjs';

@Component({
  templateUrl: './fromevent.component.html',
  standalone: true
})
export class FromeventComponent {

  currentWidth?: number;

  constructor() {
    /**
     * Schreibe die jeweils aktuelle Fensterbreite in das Property `this.currentWidth`
     *
     * Nutze fromEvent, um das resize-Event auf window zu abonnieren.
     * Initialisiere das Observable mit der aktuellen Fensterbreite (`window.innerWidth`)
     * Entprelle den Eventstrom, damit nicht zu viele Events gefeuert werden.
     */

    /******************************/

    fromEvent(window, 'resize').pipe(                   //            -E-----EEE-----E
      map(e => (e.target as Window).innerWidth),        //            -W-----WWW-----W
      debounceTime(2000),                               //   ---2000---W---2000---W---2000---W
      startWith(window.innerWidth),  // A               //  A---2000---W---2000---W---2000---W
      startWith(999), // B                              // BA---2000---W---2000---W---2000---W
    ).subscribe(width => this.currentWidth = width)


    /******************************/
  }

}
