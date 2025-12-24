import { Component, OnInit } from '@angular/core'; 
import { SharedModule } from '../../../shared/shared-module';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../services/admin';
import { NzColDirective } from "ng-zorro-antd/grid";
import { NzCardModule, NzCardComponent } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule, NzColDirective, NzCardComponent,RouterModule,NzButtonModule,NzGridModule,NzCardComponent,NzCardModule],
  templateUrl: './dashboard.html', 
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit { 

  tests = [];

  constructor(
    private notification: NzNotificationService,
    private testServices: AdminService
  ) {}

  ngOnInit() {
    this.getAllTests();
  }

  getAllTests() {
    this.testServices.getAllTest().subscribe(
      (res) => {
        this.tests = res;
        console.log(this.tests); 
      },
      (error) => {
        this.notification.error(
          `Error`,
          `Something went wrong. Try Again`,
          { nzDuration: 5000 }
        );
      }
    );
  } 

  getFormattedTime(time: number): string { 
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} minutes ${seconds} seconds`;
  }


 
deleteTest(id: number) {
  
  if (confirm("Do you want to delete test ?")) {
    this.testServices.deleteTest(id).subscribe(
      (res) => {
        this.notification.success(
          'Success',
          'Test successfully deleted',
          { nzDuration: 5000 }
        );
        this.getAllTests(); 
      },
      (error) => {
        this.notification.error(
          'Error',
          'do not delete test , something went wrong. Error: ' + error.message,
          { nzDuration: 5000 }
        );
      }
    );
  }
}
  

}