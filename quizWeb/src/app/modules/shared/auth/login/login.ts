import { Component } from '@angular/core';
import { SharedModule } from '../../shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth';
import { NzMessageService } from 'ng-zorro-antd/message'; 
import { Router } from '@angular/router';
import { NzGridModule } from "ng-zorro-antd/grid";
import { UserStorage } from '../services/user-storage';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [SharedModule, NzGridModule,NzButtonModule, NzFormModule,NzIconModule,NzInputModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]], // Email validator bhi joda
      password: [null, Validators.required]
    });
  }

  // 2. Ye Function pura gayab tha, isliye button nahi chal raha tha
  submitForm() {
    this.authService.login(this.validateForm.value).subscribe(res=>{
      this.message.success(
        `Login Success.`,
        {nzDuration: 5000 }
      );
      const user = {
        id: res.id,
        role: res.role
      }
      UserStorage.saveUser(user);
      if(UserStorage.isAdminLoggedIn()){
        this.router.navigateByUrl('admin/dashboard')
      }
      else if(UserStorage.isUserLoggedIn()){
        this.router.navigateByUrl('user/dashboard')
      }
      console.log(res);
    }, error=>{
      this.message
      .error(
        `bad credentials`,
        {nzDuration:5000}
      )
    })
    };
}