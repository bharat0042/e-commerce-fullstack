import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private oktaAuthService : OktaAuthService) {
  }

  ngOnInit(): void {
    this.oktaAuthService.signInWithRedirect();
  }
}
