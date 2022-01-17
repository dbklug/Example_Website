import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  url = "https://api.npoint.io/aa9f99459b31c03d97ec";
  credentialsArray: Array<any> = [];
  myUsername = environment.user;
  myPassword = environment.password;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  submitClicked() {
    const userField = document.getElementById('user') as HTMLInputElement; 
    const passField = document.getElementById('pass') as HTMLInputElement; 
    const user = userField.value;
    const password = passField.value;
    
    // login failed
    if (user != this.myUsername && password != this.myPassword) {
      alert("Incorrect username or password. Try again.");
      userField.value = "";
      passField.value = "";
    }
    // login success
    else {
      userField.value = "";
      passField.value = "";
      this.router.navigateByUrl('/admin-page');
    }
  }

}
