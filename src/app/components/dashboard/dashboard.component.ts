import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { ResumeDialogComponent } from '../resume-dialog/resume-dialog.component';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private submissions: any = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private snackbar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    // TODO: fetch the submissions from /api/self
    this.http.get<any>(`${this.auth.baseUrl}/submissions/self`, {
      params: new HttpParams().set('access_token', this.auth.getUserToken)
    })
      .subscribe(res => {
        console.log(res);
        if (res['status'] >= 200 && res['status'] < 300) {
          this.submissions = res['submissions'];
        } else {
          this.snackbar.open('There was some error', null, {
            duration: 2000
          });
        }
      });
  }

  openDialog(title: string, url: string): void {
    this.dialog.open(ResumeDialogComponent, {
      width: '65vw',
      data: {
        title: title,
        resumeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(this.auth.baseAdd + url)
      }
    });
  }

  logOut(): void {
    this.auth.logout(() => {
      this.snackbar.open('Logged Out', '', {
        duration: 2000
      });
      this.router.navigate(['']);
    });
  }
}
