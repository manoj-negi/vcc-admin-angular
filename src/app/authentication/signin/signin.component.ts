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

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['admin11@gmail.com', Validators.required],
      password: ['admin', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }

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
    const email = this.f['username'].value; 
    const password = this.f['password'].value;

     const apiUrl = 'http://192.168.29.54:8081/api/v1/login';
    const requestBody = { email, password };


    this.subs.sink = this.http.post(apiUrl, requestBody).subscribe({
      next: (response: any) => {

        console.log('API Response:', response);

        const hardcodedUser = {
          id: 1,
          firstName: 'Sarah',
          lastName: 'Smith',
          username: 'admin@school.org',
          role: 'Admin',
          img: 'assets/images/user/admin.jpg',
          token: 'admin-token',
        };
    
        localStorage.setItem('currentUser', JSON.stringify(hardcodedUser));
        localStorage.setItem('token', hardcodedUser.token);


        if (response.status === true) {
          
          const token = response.data.token;
          const userEmail = response.data.userEmail;

          localStorage.setItem('token', token);
        
                        setTimeout(() => {
                          const role = this.authService.currentUserValue.role;
                          if (role === Role.All || role === Role.Admin) {
        
                            this.router.navigate(['/admin/dashboard/main']);
                          } else if (role === Role.Teacher) {
                            this.router.navigate(['/teacher/dashboard']);
        
                          } else if (role === Role.Student) {
                            this.router.navigate(['/student/dashboard']);
        
                          } else {
                            this.router.navigate(['/authentication/signin']);
        
                          }
                          this.loading = false;
                        }, 1000);
        
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

}
