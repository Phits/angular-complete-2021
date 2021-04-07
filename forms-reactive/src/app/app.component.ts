import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['Male', 'Female'];
  signUpForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anne'];


  ngOnInit() {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('Male'),
      'hobbies': new FormArray([])
    });
    // this.signUpForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.signUpForm.statusChanges.subscribe(
      (value) => console.log(value)
    );
    this.signUpForm.setValue({
      'userData': {
        'username' : "John",
        'email': 'john.fitzpatrick@sendflex.com'
      },
      'gender': 'Male',
      'hobbies': []
    });
    this.signUpForm.patchValue({
      'userData': {
        'username' : "Peter",
        'email': 'john.fitzpatrick@sendflex.com'
      }
    });
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  get controls() {
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    } else {
      return null;
    }
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500)
    });
    return promise;
  }

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset({
      'userData': {
        'username' : "",
        'email': ''
      },
      'gender': 'Male',
      'hobbies': []
    });
  }

}
