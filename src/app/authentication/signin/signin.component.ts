import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService, Role } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    
  ) {
    super();
  }

  //private readonly API_URL = 'http://192.168.29.54:8081/api/v1/login';

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['admin11@gmail.com', Validators.required],
      password: ['admin', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  // adminSet() {
  //   this.authForm.get('username')?.setValue('admin@school.org');
  //   this.authForm.get('password')?.setValue('admin@123');
  // }
  // teacherSet() {
  //   this.authForm.get('username')?.setValue('teacher@school.org');
  //   this.authForm.get('password')?.setValue('teacher@123');
  // }
  // studentSet() {
  //   this.authForm.get('username')?.setValue('student@school.org');
  //   this.authForm.get('password')?.setValue('student@123');
  // }


  // onSubmit(event: Event) {
  //   event.preventDefault();
  //   this.submitted = true;
  //   this.loading = true;
  //   this.error = '';
  
  //   if (this.authForm.invalid) {
  //     this.error = 'Username and Password not valid!';
  //     this.loading = false;
  //     return;
  //   } else {
  //     const username = this.f['username'].value;
  //     const password = this.f['password'].value;
  
  //     // Assuming your API endpoint is '/api/login' and it expects a POST request with a JSON body
  //     const apiUrl = 'http://192.168.29.54:8081/api/v1/login';
  //     const requestBody = { username, password };
  
  //     this.subs.sink = this.http.post(apiUrl, requestBody).subscribe({
  //       next: (res: any) => {
  //         // Handle API response here
  //         console.log('API Response:', res);
  //       },
  //       error: (error) => {
  //         this.error = 'Invalid Login';
  //         console.error('API Error:', error);
  //         this.submitted = false;
  //         this.loading = false;
  //       },
  //       complete: () => {
  //         // Additional cleanup or finalization
  //         // This block will be executed regardless of success or failure
  //         this.loading = false;
  //       },
  //     });
  //   }
  // }
  

  // ... other imports ...

onSubmit(event: Event) {
  event.preventDefault();

  this.submitted = true;
  this.loading = true;
  this.error = '';

  if (this.authForm.invalid) {
    this.error = 'Email and Password not valid!';
    this.loading = false;
    return;
  } else {
    const email = this.f['username'].value; // Assuming the form control for email is named 'username'
    const password = this.f['password'].value;

     const apiUrl = 'http://192.168.29.54:8081/api/v1/login';
    const requestBody = { email, password };


    this.subs.sink = this.http.post(apiUrl, requestBody).subscribe({
      next: (response: any) => {

        console.log('API Response:', response.data.userEmail);

        if (response.status === true) {
          
          const token = response.data.token;
          const userEmail = response.data.userEmail;

          localStorage.setItem('token', token);
          

          // if (userEmail === 'admin11@gmail.com') {
          //   console.log('usermmmail');
          //   this.router.navigate(['/admin/dashboard/main']);
          // } else if (userEmail === 'teacher') {
          //   this.router.navigate(['/teacher/dashboard']);
          // } else if (userEmail === 'student') {
          //   this.router.navigate(['/student/dashboard']);
          // } else {
          //   // Handle other roles or scenarios
          //   this.router.navigate(['/authentication/signin']);
          // }

        } else {
        
          this.error = 'Invalid Login';
        }
      },
      error: (error) => {
        this.error = 'Invalid Login';
        console.error('API Error:', error);
        this.submitted = false;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}



  // onSubmit() {
  //   this.submitted = true;
  //   this.loading = true;
  //   this.error = '';
  //   if (this.authForm.invalid) {
  //     this.error = 'Username and Password not valid !';
  //     return;
  //   } else {
  //     this.subs.sink = this.authService
  //       .login(this.f['username'].value, this.f['password'].value)
  //       .subscribe({
  //         next: (res) => {
  //           if (res) {
  //             setTimeout(() => {
  //               const role = this.authService.currentUserValue.role;
  //               if (role === Role.All || role === Role.Admin) {
  //                 this.router.navigate(['/admin/dashboard/main']);
  //               } else if (role === Role.Teacher) {
  //                 this.router.navigate(['/teacher/dashboard']);
  //               } else if (role === Role.Student) {
  //                 this.router.navigate(['/student/dashboard']);
  //               } else {
  //                 this.router.navigate(['/authentication/signin']);
  //               }
  //               this.loading = false;
  //             }, 1000);
  //           } else {
  //             this.error = 'Invalid Login';
  //           }
  //         },
  //         error: (error) => {
  //           this.error = error;
  //           this.submitted = false;
  //           this.loading = false;
  //         },
  //       });
  //   }
  // }
}
