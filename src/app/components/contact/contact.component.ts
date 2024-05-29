import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^01[0|1|2|5][0-9]{8}$'),
  ]);

  form = new FormGroup({
    email: this.emailFormControl,
    name: this.nameFormControl,
    phone: this.phoneFormControl,
  });

  formSubmitted = false;

  onSubmit() {
    if (this.form.valid) {
      this.formSubmitted = true;
    } else {
      this.form.markAllAsTouched();
    }
  }
}
