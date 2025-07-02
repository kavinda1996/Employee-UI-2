import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/EmployeeService';
import { Employee } from '../../models/Employee';

@Component({
  selector: 'app-get-all-employees',
  imports: [CommonModule],
  templateUrl: './get-all-employees.component.html',
  styleUrl: './get-all-employees.component.css'
})
export class GetAllEmployeesComponent implements OnInit{
  constructor(
    private employeeService:EmployeeService
  ){}

  ngOnInit(): void {
    this.getEmployeeData();
  }

  listOfEmployees:Employee[]=[];

  getEmployeeData() {
    this.employeeService.getAll().subscribe((res) => {
      this.listOfEmployees = res;
    });
  }
}
