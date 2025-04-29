import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./home/footer/footer.component";
import { HeaderComponent } from "./home/header/header.component";
import { BodyComponent } from "./home/body/body.component";
import { employee } from './model/employee';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
   employeeList : employee [] =[]

constructor(private http:HttpClient){
  this.loadEmployee();
}
loadEmployee(){
  this.http.get<employee>("http://localhost:8080/employee/get-all")
  .subscribe(response => {
    console.log(response);
  });
}
}
