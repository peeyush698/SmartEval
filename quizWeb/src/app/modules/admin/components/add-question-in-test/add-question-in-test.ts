import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin'; 
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-add-question-in-test',
  standalone: true,
  imports: [
    SharedModule,
    NzGridModule,
    NzFormModule,   
    NzButtonModule, 
    NzInputModule, 
    ReactiveFormsModule
  ],
  templateUrl: './add-question-in-test.html',
  styleUrl: './add-question-in-test.scss', 
})
export class AddQuestionInTest implements OnInit {

  id: number | null = null; 
  questionForm!: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private notification: NzNotificationService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.questionForm = this.fb.group({
      questionText: [null, [Validators.required]],
      optionA: [null, [Validators.required]],
      optionB: [null, [Validators.required]],
      optionC: [null, [Validators.required]],
      optionD: [null, [Validators.required]],
      correctOption: [null, [Validators.required]],
    });

    this.id = this.activateRoute.snapshot.params["id"];
  }
  
  submitForm(){
    const questionDto = this.questionForm.value;
    questionDto.id = this.id;

    this.adminService.addQuestionInTest(questionDto).subscribe(res=>{
      this.notification
      .success(
        'SUCCESS',
        `Question Created Successfully.`,
        { nzDuration : 5000}
      );
      this.router.navigateByUrl("/admin/dashboard");
    },error => {
      this.notification
      .error(
        'ERROR',
        `${error.error}`,
        { nzDuration : 5000}
      );
    })
  }
}