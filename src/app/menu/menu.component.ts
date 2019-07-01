import {Component, ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {MediaMatcher} from '@angular/cdk/layout';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  private user;
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 3}, (_, i) => `Nav Item ${i + 1}`);
  private menuItems=[
    {routerLink:'/reportes', name:'Reporte Croquis y Listado',icon:'list'},
    {routerLink:'/usuarios', name:'Administrar Usuarios',icon:'account_box'},
    //<a mat-list-item  routerLinkActive="list-item-active"  routerLink="/usuarios"><mat-icon>account_box</mat-icon>Administrar Usuarios</a>
  ]

  private menuSelect=this.menuItems[0];
  private _mobileQueryListener: () => void;

  constructor(private  authenticationService: AuthenticationService, private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {
    this.authenticationService.currentUser.subscribe(user => {
        this.user = user;
      }
    );

    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }
  select(menu){
    console.log('menu>>>',menu);
    this.menuSelect=menu;
  }
  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
