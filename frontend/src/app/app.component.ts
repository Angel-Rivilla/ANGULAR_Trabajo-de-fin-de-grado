import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScriptService } from './services/script.service';
import { UtilsService } from './services/utils.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy{
  title = 'frontend';
  opened = false;
  private destroy$ = new Subject<any>();
  constructor(private utilsSvc: UtilsService,
              private scriptSvc: ScriptService){}

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.scriptSvc.loadScript('assets/js/carrousel.js');
    this.scriptSvc.loadScript('assets/js/details-product.js');
    this.utilsSvc.sidebarOpened$
    .pipe(takeUntil(this.destroy$))
    .subscribe((res: boolean) => (this.opened = res));
  }
}
