import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-resume-dialog',
  templateUrl: './resume-dialog.component.html',
  styleUrls: ['./resume-dialog.component.css']
})
export class ResumeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResumeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
}
