import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Students } from './students.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class StudentsService extends UnsubscribeOnDestroyAdapter {
  //private readonly API_URL = 'http://192.168.29.54:8081/api/v1/userlisting';
  isTblLoading = true;
  dataChange: BehaviorSubject<Students[]> = new BehaviorSubject<Students[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Students;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Students[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getAllStudentss(): void {
    this.subs.sink = this.httpClient.get<any>('http://192.168.29.54:8081/api/v1/userlisting').subscribe({
      next: (response) => {
        const data = response.message && Array.isArray(response.message)
          ? response.message
          : [];
  
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }
  
  addStudents(students: Students): void {
    this.dialogData = students;

    this.httpClient.post('http://192.168.29.54:8081/api/v1/user', students)
      .subscribe({
        next: (data) => {
          console.log("---------data added",data);
          this.dialogData = students;
        },
        error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
        },
      });
  }
  updateStudents(students: Students): void {
    this.dialogData = students;

    this.httpClient.put('http://192.168.29.54:8081/api/v1/user/' + students.id, students)
        .subscribe({
          next: (data) => {
            console.log("---------updated added",data);
            this.dialogData = students;

          },
          error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
          },
        });
  }
  deleteStudents(id: number): void {
    console.log(id);

    this.httpClient.delete('http://192.168.29.54:8081/api/v1/user/' + id)
        .subscribe({
          next: (data) => {
            console.log(id);
          },
          error: (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            console.log(error.name + ' ' + error.message);
          },
        });
  }
}
