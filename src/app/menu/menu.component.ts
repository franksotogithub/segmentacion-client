import {Component, ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {MediaMatcher} from '@angular/cdk/layout';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  private user;
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 3}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(private  authenticationService: AuthenticationService, private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {
    this.authenticationService.currentUser.subscribe(user => {
        this.user = user;
      }
    );

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
