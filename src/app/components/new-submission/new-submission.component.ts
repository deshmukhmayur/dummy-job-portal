import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-submission',
  templateUrl: './new-submission.component.html',
  styleUrls: ['./new-submission.component.css']
})
export class NewSubmissionComponent implements OnInit {
  /**
   * gets over-written on load by the list of countries from countries.json
   */
  private countries: any[] = [
    { code: 'IN', name: 'India' },
    { code: 'UK', name: 'United Kingdom' }
  ];
  private info = {
    fname: null,
    lname: null,
    email: null,
    contact: null,
    address: null,
    country: null,
    role: null,
    experience: null,
    resume: null
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.http.get<any>('/assets/countries.json')
      .subscribe(countries => {
        this.countries = countries;
      });
    this.http.get<any>(`${this.auth.baseUrl}/self`, {
      params: new HttpParams().set('access_token', this.auth.getUserToken)
    })
      .subscribe(res => {
        // console.log(res);
        if (res.status >= 200 && res.status < 300) {
          this.info = res.data;
        }
      });
  }

  submit(): void {
    const formData = new FormData();
    formData.append('resume', this.info.resume);
    formData.append('fname', this.info.fname);
    formData.append('lname', this.info.lname);
    formData.append('email', this.info.email);
    formData.append('contact', this.info.contact);
    formData.append('address', this.info.address);
    formData.append('country', this.info.country);
    formData.append('role', this.info.role);
    formData.append('years_of_experience', this.info.experience);

    this.http.post<any>(`${this.auth.baseUrl}/submit-details`,
      formData,
      {
        params: new HttpParams().set('access_token', this.auth.getUserToken)
      })
      .subscribe(res => {
        // console.log(res);
        if (res.status >= 200 && res.status < 300) {
          this.snackbar.open('Details Submitted Successfully', null, {
            duration: 2000
          });
          this.router.navigate(['dashboard']);
        } else {
          this.snackbar.open(res.error, null, {
            duration: 2000
          });
        }
      }, err => {
        console.log(err.error);
        this.snackbar.open('Network Error. Try again later.', null, {
          duration: 2000
        });
      });
  }

  onChange(event: any) {
    // console.log(files);
    this.info.resume = event.target.files[0];
  }

  goBack(): void {
    this.router.navigate(['dashboard']);
  }

  logOut(): void {
    this.auth.logout(() => {
      this.snackbar.open('Logged Out', null, {
        duration: 2000
      });
      this.router.navigate(['']);
    });
  }
}
