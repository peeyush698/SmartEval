import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminService } from '../../../admin/services/admin';
import { NzFormModule } from "ng-zorro-antd/form";
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TestService } from '../../services/test';


@Component({
  selector: 'app-dashboard',
  imports: [SharedModule, NzFormModule, NzButtonModule,NzCardModule,NzGridModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  tests =[];

  constructor(private notification: NzNotificationService,
    private testService: TestService
  ){}

 ngOnInit() {
    this.getAllTests();
  }

  getAllTests() {
    this.testService.getAllTest().subscribe(
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

}
