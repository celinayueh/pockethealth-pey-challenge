import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  nameError: boolean = false;
  emailError: boolean = false;
  colourError: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  onFormSubmit(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const colour = form.value.colour;

    // reset error checkers (in case of resubmission)
    this.nameError = false;
    this.emailError = false;
    this.colourError = false;

    // check if all inputs are valid
    this.sanitize(name, email, colour)

    if (!this.nameError && !this.emailError && !this.colourError){
      // all inputs are valid
      this.userService.postRegister(name, email, colour).subscribe(() => {
        // Once we've received a response, take the user to the home page
        this.router.navigateByUrl('/home');
      })
    }
  
  }

  // sanitize form inputs
  sanitize(name: string, email: string, colour: string){
    const correct_inputs = [true, true, true];

    if (name.trim() == ""){
      this.nameError = true;
    }
    
    const email_regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email_regex.test(email) == false){
      this.emailError = true;
    }

    if (colour == ""){
      this.colourError = true;
    }
    else{
      
    }
  }

}
