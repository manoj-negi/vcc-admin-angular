import { Component } from '@angular/core';
@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss'],
})
export class BasicTableComponent {
  breadscrums = [
    {
      title: 'Basic',
      items: ['Tables'],
      active: 'Basic',
    },
  ];
  constructor() {
    //constructor
  }
}
