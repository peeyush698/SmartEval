import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { TestService } from '../../services/test';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-view-my-test-results',
  imports: [SharedModule,NzTableModule,CommonModule],
  templateUrl: './view-my-test-results.html',
  styleUrl: './view-my-test-results.scss',
})
export class ViewMyTestResults {
    dataset: any;

    constructor(private testService: TestService){}

ngOnInit(){
  this.getTestResults();
}

    getTestResults(){
      this.testService.getMyTestResults().subscribe(res=>{
        this.dataset = res;
        console.log(this.dataset);
      })
    }
}
