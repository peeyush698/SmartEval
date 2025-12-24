import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { TestService } from '../../services/test';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message'; // Sahi import
import { UserStorage } from '../../../shared/auth/services/user-storage';
import { interval } from 'rxjs';

@Component({
  selector: 'app-take-test',
  standalone: true, // Agar aap Angular 17+ use kar rahe hain
  imports: [SharedModule],
  templateUrl: './take-test.html',
  styleUrl: './take-test.scss',
})
export class TakeTest implements OnInit {
submitAnswers() {
throw new Error('Method not implemented.');
}
  questions: any[] = [];
  testId: any;
  selectedAnswer: { [key: number]: string } = {};

  timeRemaining: number=0;

  interval:any;


  constructor(
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService, // Notification ki jagah Message service
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      const id = param.get('id');
      this.testId = id ? +id : null;

      if (this.testId) {
        this.testService.getTestQuestions(this.testId).subscribe(res => {
          this.questions = res.questions;

          this.timeRemaining = res.testDTO.time || 0;
          this.startTimer();
        });
      }
    });

  }

  startTimer(){
    this.interval = setInterval(()=>{
      if(this.timeRemaining > 0){
        this.timeRemaining--;
      }else{
        clearInterval(this.interval);
        this.submitAnswer();
      }
    }, 1000);
  }

  getFormattedTime(): string{
    const minutes = Math.floor(this.timeRemaining/60);
    const seconds = this.timeRemaining % 60;
    return `${minutes}:${seconds < 10 ? '0': ''}${seconds}`;//5:02
  }

  onAnswerChange(questionId: number, selectedOption: string) {
    this.selectedAnswer[questionId] = selectedOption;
  }

  submitAnswer() {
    const answerList = Object.keys(this.selectedAnswer).map(questionId => {
      return {
        questionId: +questionId,
        selectedOption: this.selectedAnswer[+questionId]
      };
    });

    const data = {
      testId: this.testId,
      userId : UserStorage.getUserId(),
      responses: answerList
    };

    this.testService.submitTest(data).subscribe({
      next: (res) => {
        this.message.success('Test Submitted Successfully', { nzDuration: 5000 });
        this.router.navigateByUrl("/user/view-test-results");
      },
      error: (err: any) => {
        const errorMsg = err.error?.message || err.error || 'Something went wrong';
        this.message.error(`${errorMsg}`, { nzDuration: 5000 });
      }
    });
  }
}