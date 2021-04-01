import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signUpForm: NgForm;
  defaultQuest = 'pet';
  answer = '';
  genders = ['Male', 'Female'];
  user ={
    username: '',
    email: '',
    secrsecretQuestion: '',
    answer: '',
    gender: ''
  }
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // Change whole form
    // this.signUpForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'Male'
    // });

    // Change part of form
    this.signUpForm.form.patchValue({
      userData: {
        username: 'Super User'
      }
    })
  }

  // onSubmit(form: NgForm) {
  //   console.log('Submitted', form);
  // }

  onSubmit() {
    this.submitted = true;
    this.user.username = this.signUpForm.value.userData.username;
    this.user.email = this.signUpForm.value.userData.email;
    this.user.secrsecretQuestion = this.signUpForm.value.secret;
    this.user.answer = this.signUpForm.value.questionAnswer;
    this.user.gender = this.signUpForm.value.gender;

    this.signUpForm.reset();
  }

}
