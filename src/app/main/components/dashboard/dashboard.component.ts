import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isEditModalOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onOpenEditModal() {
    this.isEditModalOpen = true;
  }

}
