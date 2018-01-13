import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  private username: String;
  private password: String;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    history.back();
  }

  submit(): void {
    // console.log(this.username, this.password);
    if (this.username && this.password) {
      this.auth.adminLogin({
        username: this.username,
        password: this.password
      }, res => {
        // console.log(res);
        this.snackbar.open('Login Successful', '', {
          duration: 2000
        });
        this.router.navigate(['admin', 'dashboard']);
      }, err => {
        if (err.status >= 400 && err.status < 500) {
          this.snackbar.open('Invalid Username/Password', '', {
            duration: 2000
          });
        } else {
          this.snackbar.open('Network Error', '', {
            duration: 2000
          });
        }
      });
    }
  }
}
