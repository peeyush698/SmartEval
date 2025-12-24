import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { AdminService } from '../../services/admin';
import { ActivatedRoute } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common'; // *ngFor iske bina nahi chalega
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-view-test',
  standalone: true,
  imports: [
    SharedModule,
    NzCardModule,
    CommonModule,
    NzGridModule
  ],
  templateUrl: './view-test.html',
  styleUrl: './view-test.scss',
})
export class ViewTest implements OnInit {

  questions: any[] = [];
  testId: any;

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.testId = params.get('id'); // Get ID from URL

      this.adminService.getTestQuestions(this.testId).subscribe(
        (res) => {
          console.log("Backend Full Response:", res); // Console mein check karein

          // Data Extraction Logic (Taaki blank page na aaye)
          if (res.question) {
            this.questions = res.question;
          } else if (res.questions) {
            this.questions = res.questions;
          } else if (Array.isArray(res)) {
            this.questions = res;
          } else {
            console.log("Data format match nahi hua, check console.");
          }
        },
        (error) => {
          console.error("Error fetching questions:", error);
        }
      );
    });
  }
}