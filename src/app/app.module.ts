import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatStepperModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatCardModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatDialogModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { RedirectGuard } from './guards/redirect.guard';
import { ResumeDialogComponent } from './components/resume-dialog/resume-dialog.component';
import { NewSubmissionComponent } from './components/new-submission/new-submission.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'home', canActivate: [RedirectGuard],
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: 'dashboard/new',
    component: NewSubmissionComponent,
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    ResumeDialogComponent,
    NewSubmissionComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    NotAuthGuard,
    UserGuard,
    AdminGuard,
    RedirectGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [ResumeDialogComponent]
})
export class AppModule { }
