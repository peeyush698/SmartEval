import { Component } from '@angular/core';
import { SharedModule } from '../../shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NzGridModule } from "ng-zorro-antd/grid";
import { AuthService } from '../services/auth';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-signup',
  standalone: true, 
  imports: [SharedModule, NzGridModule,NzFormModule,NzIconModule,NzInputModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]]
    });
  }

  submitForm() {
    console.log("Button Clicked!"); // 1. Check karein button chala ya nahi
    
    // Agar form invalid hai to request mat bhejo
    if (this.validateForm.invalid) {
      console.log("Form Invalid hai, details bhariye");
      // Form ke sare fields ko dirty mark kar do taaki error dikhe
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      return; 
    }

    console.log("Sending Data:", this.validateForm.value); // 2. Check karein kya data ja raha hai

    this.authService.register(this.validateForm.value).subscribe(
      (res) => {
        console.log("Success Response:", res);
        this.message.success(`Signup successful`, { nzDuration: 5000 });
        this.router.navigateByUrl("/login");
      },
      (error) => {
        console.error("Error Response:", error);
        // Yahan syntax sahi kiya gaya hai: ${...}
        this.message.error(`${error.error || 'Something went wrong'}`, { nzDuration: 5000 });
      }
    );
  }
}