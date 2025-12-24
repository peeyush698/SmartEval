import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { AdminService } from '../../services/admin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-view-test-results',
  standalone: true, 
  imports: [SharedModule, NzTableModule, CommonModule], 
  templateUrl: './view-test-results.html',
  styleUrl: './view-test-results.scss',
})
export class ViewTestResults implements OnInit {
  resultsData: any[] = []; 

  constructor(private testService: AdminService){}

  ngOnInit(){
    this.getTestResults();
  }

  getTestResults(){
    this.testService.getTestResults().subscribe(res => {
      this.resultsData = res; 
    });
  }
}