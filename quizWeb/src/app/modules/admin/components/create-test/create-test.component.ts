import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzColDirective, NzRowDirective } from "ng-zorro-antd/grid";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [
    SharedModule, 
    NzColDirective, 
    NzRowDirective,
    ReactiveFormsModule
  ],
  templateUrl: './create-test.html',
  styleUrl: './create-test.scss',
})
export class CreateTestComponent {

  testForm! : FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService, 
    private notification : NzNotificationService,
    private router : Router
  ){}

  ngOnInit(){
    this.testForm = this.fb.group({
      title: [null, Validators.required],
      description : [null, [Validators.required]],
      time: [null, [Validators.required]],
    })
  }

  submitForm(){
    if(this.testForm.valid){
    
      this.adminService.createTest(this.testForm.value).subscribe(res=>{
        this.notification.success(
          'SUCCESS',
          `Test Created Successfully.`,
          {nzDuration : 5000}
        );
        this.router.navigateByUrl("/admin/dashboard");
      }, error=>{
        this.notification.error(
          'ERROR',
          `${error.error}`,
          {nzDuration : 5000}
        )
      })
    } else {
      Object.values(this.testForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}