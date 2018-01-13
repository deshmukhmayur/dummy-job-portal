import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  /**
   * gets over-written on load by the list of countries from countries.json
   */
  private countries: any[] = [
    { code: 'IN', name: 'India' },
    { code: 'UK', name: 'United Kingdom' }
  ];
  private user_data = {
    fname: null,
    lname: null,
    email: null,
    contact: null,
    address: null,
    country: null,
    password: null
  };
  private canSubmit = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.http.get<any>('/assets/countries.json')
      .subscribe(countries => {
        this.countries = countries;
      });
    this.http.get<any>('https://freegeoip.net/json/')
      .subscribe(data => {
        this.user_data.country = data.country_code;
      });
  }

  goBack(): void {
    history.back();
  }

  checkPassword(event: any): void {
    console.log(this.user_data.password, event.target.value);
    if (this.user_data.password === event.target.value) {
      this.canSubmit = true;
    } else {
      this.canSubmit = false;
    }
  }

  register(): boolean {
    if (!this.user_data.fname || !this.user_data.lname ||
      !this.user_data.address || !this.user_data.country ||
      !this.user_data.contact || !this.user_data.email ||
      !this.user_data.password) {
      this.snackbar.open('Please fill the required details', '', {
        duration: 2000
      });
    } else {
      // console.log(this.user_data);
      this.http.post<any>(`${this.auth.baseUrl}/register`, this.user_data)
        .subscribe(data => {
          // console.log('res', data);
          this.snackbar.open('Registration Successful. Login to continue.', null, {
            duration: 2000
          });
          this.router.navigate(['login']);
        }, err => {
          // console.log('err', err.error);
          const errRes = JSON.parse(err.error);
          if (err['status'] === 409) {
            this.snackbar.open(errRes.error, null, {
              duration: 2000
            });
          } else {
            this.snackbar.open('There was some error. Try again later.');
          }
        });
    }
    return false;
  }
}
