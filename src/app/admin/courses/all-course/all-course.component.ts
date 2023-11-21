import { Component } from '@angular/core';

@Component({
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.scss'],
})
export class AllCourseComponent {
  breadscrums = [
    {
      title: 'All Countries',
      items: ['Countries'],
      active: '',
    },
  ];
  constructor() {
    // constructor
  }
}
