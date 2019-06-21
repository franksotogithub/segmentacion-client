import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  error = '';
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              ) {
  }

  username: string;
  password: string;

  ngOnInit() {
  }

  login(): void {

    /*
    if (this.username == 'admin' && this.password == 'admin') {
      this.router.navigate(['reportes']);
    } else {
      alert('Invalid credentials');
    }*/

    this.authenticationService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['reportes']);
          //location.reload();

        },
        error => {
          this.error = error;
          this.loading = false;
        });


  }
}

