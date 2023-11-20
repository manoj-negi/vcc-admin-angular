import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentsService } from '../../students.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Students } from '../../students.model';
import { RoleService } from './form-dialog.service';
import { Roles,Countries,Products } from './form-dialog.model';
import { HttpErrorResponse } from '@angular/common/http';

export interface DialogData {
  id: number;
  action: string;
  students: Students;
}

@Component({
  selector: 'app-form-dialog:not(f)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  stdForm: UntypedFormGroup;
  students: Students;
  roles: Roles[] = [];
  countries: Countries[] = [];
  products: Products[] = [];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public studentsService: StudentsService,
    public rolesService: RoleService,
    private fb: UntypedFormBuilder
  ) {
    this.countries = [];
    this.roles = [];
    this.products = [];
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.students.username;
      this.students = data.students;
    } else {
      this.dialogTitle = 'New Students';
      const blankObject = {} as Students;
      this.students = new Students(blankObject);
    }
    this.stdForm = this.createContactForm();
  }

  ngOnInit() {
        // Fetch roles when the component is initialized
        this.getRoles();
        this.getCountries();
        this.getProducts();
      }

  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getRoles() {
    this.rolesService.getRoles().subscribe(
      (response: Roles[]) => {
        console.log('API Response:', response);
        this.roles = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  getProducts() {
    this.rolesService.getProducts().subscribe(
      (response: Products[]) => {
        console.log('API Response:', response);
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  
  getCountries() {
    this.rolesService.getCountries().subscribe(
      (response: Countries[]) => {
        console.log('API Response:', response);
        this.countries = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching countries:', error);
      }
    );
  }
  
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.students.id],
      api_key: [this.students.api_key],
      username: [this.students.username],
      email: [
        this.students.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password:[ this.students.password],
      referral_code:[ this.students.referral_code],
      country_code:[this.students.country_code],
      client_id: [this.students.client_id],
      mobile: [this.students.mobile],
      role_id: [this.students.role_id],
      product_id:[ this.students.product_id],
      validation_token: [this.students.validation_token],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const formData = this.stdForm.getRawValue();
  
    if (this.dialogTitle === 'New Students') {
      this.studentsService.addStudents(this.stdForm.getRawValue());
    } else {
      this.studentsService.updateStudents(this.stdForm.getRawValue());
    }
  }
  
}
