import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { ResumeDialogComponent } from '../resume-dialog/resume-dialog.component';
import { MatDialog } from '@angular/material';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  private users: any[] = [];
  private editMode = false;
  private editToggle = false;

  constructor(
    private sanitizer: DomSanitizer,
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.http.get<any>(`${this.auth.baseUrl}/submissions`, {
      params: new HttpParams().set('access_token', this.auth.getUserToken)
    })
      .subscribe(res => {
        // console.log(res);
        if (res['status'] >= 200 && res['status'] < 300) {
          this.users = res['users'];
        } else {
          this.snackbar.open('There was some error', null, {
            duration: 2000
          });
        }
      });
  }

  deleteSubmission(index: number): void {
    // console.log(index, this.users[index]);
    this.http.delete<any>(`${this.auth.baseUrl}/submissions/${this.users[index].id}`, {
      params: new HttpParams().set('access_token', this.auth.getUserToken)
    })
      .subscribe(res => {
        if (res.status >= 200 && res.status < 300) {
          this.users.splice(index, 1);
          this.snackbar.open('Submission Deleted Successfully', null, {
            duration: 2000
          });
          this.editMode = false;
          this.editToggle = false;
        } else {
          this.snackbar.open(res.err, null, {
            duration: 2000
          });
        }
      });
  }

  updateSubmission(index: number): void {
    console.log(index, this.users[index]);
    this.http.put<any>(`${this.auth.baseUrl}/submissions/${this.users[index].id}`, {
      role: this.users[index].role,
      address: this.users[index].address,
      contact: this.users[index].contact
    }, {
      params: new HttpParams().set('access_token', this.auth.getUserToken)
    })
      .subscribe(res => {
        console.log(res);
        if (res.status >= 200 && res.status < 300) {
          this.snackbar.open('Submission Updated Successfully', null, {
            duration: 2000
          });
          this.editMode = false;
          this.editToggle = false;
        } else {
          this.snackbar.open(res.err, null, {
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
      this.snackbar.open('Logged Out', null, {
        duration: 2000
      });
      this.router.navigate(['']);
    });
  }
}
