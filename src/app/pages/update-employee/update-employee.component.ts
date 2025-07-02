import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/Employee';
import { EmployeeService } from '../../service/EmployeeService';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-employee',
  imports: [CommonModule],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css',
})
export class UpdateEmployeeComponent implements OnInit {
  listOfEmployees: Employee[] = [];
  selectedId: string = '';
  employee = <Employee | null>{};

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((res) => {
      this.listOfEmployees = res;
    });
  }

  onSelected(value: string) {
    this.selectedId = value;
    this.employeeService
      .searchById(parseInt(this.selectedId))
      .subscribe((res) => (this.employee = res));
  }

  submitForm(event: Event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const id = parseInt(this.selectedId);
    const name = (
      document.getElementById('name') as HTMLInputElement
    ).value.trim();
    const email = (
      document.getElementById('email') as HTMLInputElement
    ).value.trim();
    const department = (
      document.getElementById('department') as HTMLInputElement
    ).value.trim();

    if (this.selectedId === '' || !(name || email || department)) {
      Swal.fire('Error', 'Please fill in all fields', 'error');
      return;
    }

    const employeeData = { id, name, email, department };

    this.employeeService.update(employeeData).subscribe({
      next: () => {
        Swal.fire('Success', 'Employee updated successfully!', 'success');
      },
      error: (err) => {
        if (err.status === 400 && err.error) {
          let errorMessage = '';

          let errorObj;
          try {
            errorObj =
              typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
          } catch (e) {
            console.error('Error parsing JSON:', e);
            errorObj = {};
          }

          if (typeof errorObj === 'object' && errorObj !== null) {
            errorMessage = Object.values(errorObj).join('<br>');
          } else {
            errorMessage = 'An unexpected error occurred';
          }

          Swal.fire('Error', errorMessage.trim(), 'error');
        } else {
          Swal.fire(
            'Error',
            'Something went wrong. Please try again.',
            'error'
          );
        }
      },
    });
  }
}
